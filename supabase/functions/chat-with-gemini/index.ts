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

    const systemPrompt = `Tu es un assistant spécialisé dans les mariages qui aide les utilisateurs à obtenir des informations sur ${vendorContext.name}, un prestataire de mariage. 
    Voici les informations dont tu disposes sur ce prestataire :
    - Catégorie : ${vendorContext.category}
    - Description : ${vendorContext.description || vendorContext.short_description}
    - Localisation : ${vendorContext.location}
    - Prix : entre ${vendorContext.price_range_min}€ et ${vendorContext.price_range_max}€
    - Capacité : entre ${vendorContext.capacity_min} et ${vendorContext.capacity_max} personnes
    
    Réponds de manière concise et professionnelle aux questions des utilisateurs concernant ce prestataire.
    Si tu ne connais pas la réponse, dis-le simplement et suggère de contacter directement le prestataire.`

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
            parts: [{ text: "D'accord, je vais aider les utilisateurs avec les informations sur ce prestataire." }]
          },
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    const data = await response.json()
    console.log('Gemini response:', data)

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return new Response(
        JSON.stringify({ response: data.candidates[0].content.parts[0].text }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      throw new Error('Invalid response from Gemini API')
    }
  } catch (error) {
    console.error('Error in chat-with-gemini function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})