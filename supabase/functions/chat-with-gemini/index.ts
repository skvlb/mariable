import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, vendorContext } = await req.json()
    const apiKey = Deno.env.get('GEMINI_API_KEY')

    if (!apiKey) {
      throw new Error('Missing Gemini API key')
    }

    console.log('Processing request with message:', message)
    console.log('Vendor context:', vendorContext)

    // Construire une description détaillée des services
    const servicesDescription = vendorContext.vendor_services?.length > 0
      ? `Services proposés:\n${vendorContext.vendor_services.map(service => 
          `- ${service.name}: ${service.description || 'Pas de description'} (${service.base_price}€)`
        ).join('\n')}`
      : 'Aucun service spécifique listé';

    // Construire une description des détails spécifiques selon la catégorie
    let specificDetails = '';
    if (vendorContext.category === 'catering' && vendorContext.catering_details) {
      const dietary = vendorContext.catering_details.catering_dietary_options?.map(
        opt => opt.option_type
      ).join(', ');
      
      specificDetails = `
      Détails traiteur:
      - Type de cuisine: ${vendorContext.catering_details.cuisine_type || 'Non spécifié'}
      - Personnel de service inclus: ${vendorContext.catering_details.includes_service_staff ? 'Oui' : 'Non'}
      - Équipement inclus: ${vendorContext.catering_details.includes_equipment ? 'Oui' : 'Non'}
      - Dégustation possible: ${vendorContext.catering_details.offers_tasting ? 'Oui' : 'Non'}
      - Options alimentaires: ${dietary || 'Non spécifié'}
      `;
    } else if (vendorContext.category === 'venue' && vendorContext.venue_details) {
      specificDetails = `
      Détails lieu:
      - Hébergement sur place: ${vendorContext.venue_details.has_accommodation ? 'Oui' : 'Non'}
      - Espace extérieur: ${vendorContext.venue_details.has_outdoor_space ? 'Oui' : 'Non'}
      - Capacité parking: ${vendorContext.venue_details.parking_capacity || 'Non spécifié'} places
      - Capacité intérieure: ${vendorContext.venue_details.indoor_capacity || 'Non spécifié'} personnes
      - Capacité extérieure: ${vendorContext.venue_details.outdoor_capacity || 'Non spécifié'} personnes
      - Type de lieu: ${vendorContext.venue_details.venue_type?.join(', ') || 'Non spécifié'}
      - Équipements: ${vendorContext.venue_details.amenities?.join(', ') || 'Non spécifié'}
      `;
    }

    // Construire une description des avis
    const reviewsDescription = vendorContext.reviews?.length > 0
      ? `Avis clients: ${vendorContext.review_count} avis, note moyenne de ${vendorContext.rating}/5`
      : 'Aucun avis client pour le moment';

    const systemPrompt = `Tu es un assistant spécialisé dans les mariages qui aide les utilisateurs à obtenir des informations sur ${vendorContext.name}, un prestataire de mariage. 
    Voici les informations détaillées dont tu disposes sur ce prestataire :
    
    Informations générales:
    - Catégorie : ${vendorContext.category}
    - Description : ${vendorContext.description || vendorContext.short_description}
    - Localisation : ${vendorContext.location}
    - Prix : entre ${vendorContext.price_range_min}€ et ${vendorContext.price_range_max}€
    - Capacité : ${vendorContext.capacity_min ? `entre ${vendorContext.capacity_min} et ${vendorContext.capacity_max} personnes` : 'Non spécifié'}
    
    ${specificDetails}
    
    ${servicesDescription}
    
    ${reviewsDescription}
    
    Réponds de manière concise et professionnelle aux questions des utilisateurs concernant ce prestataire.
    Si tu ne connais pas la réponse, dis-le simplement et suggère de contacter directement le prestataire.
    Utilise les informations ci-dessus pour fournir des réponses précises et pertinentes.`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          {
            role: 'model',
            parts: [{ text: "D'accord, je vais aider les utilisateurs avec les informations détaillées sur ce prestataire." }]
          },
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ]
      })
    })

    if (!response.ok) {
      console.error('Gemini API error:', await response.text())
      throw new Error(`Gemini API returned status ${response.status}`)
    }

    const data = await response.json()
    console.log('Gemini API response:', JSON.stringify(data))

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid Gemini API response structure:', data)
      throw new Error('Unexpected response structure from Gemini API')
    }

    return new Response(
      JSON.stringify({ response: data.candidates[0].content.parts[0].text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in chat-with-gemini function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})