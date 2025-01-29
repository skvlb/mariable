import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin, Euro, Users, Phone, Mail, Star } from "lucide-react";
import { ChatBot } from "@/components/vendor/ChatBot";

// Define a type for the vendor with its relations
type VendorWithRelations = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  short_description: string | null;
  location: string;
  address: string | null;
  rating: number | null;
  review_count: number | null;
  price_range_min: number | null;
  price_range_max: number | null;
  capacity_min: number | null;
  capacity_max: number | null;
  catering_details?: {
    cuisine_type: string | null;
    includes_service_staff: boolean | null;
    includes_equipment: boolean | null;
    offers_tasting: boolean | null;
  } | null;
  venue_details?: {
    has_accommodation: boolean | null;
    has_outdoor_space: boolean | null;
    parking_capacity: number | null;
    indoor_capacity: number | null;
    outdoor_capacity: number | null;
  } | null;
  vendor_services?: Array<{
    id: string;
    name: string;
    description: string | null;
    base_price: number | null;
    is_optional: boolean | null;
  }>;
}

const VendorDetails = () => {
  const { id } = useParams();

  const { data: vendor, isLoading } = useQuery({
    queryKey: ['vendor', id],
    queryFn: async () => {
      console.log('Fetching vendor details for id:', id);
      const { data, error } = await supabase
        .from('vendors')
        .select(`
          *,
          catering_details(*),
          venue_details(*),
          vendor_services(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching vendor:', error);
        throw error;
      }

      console.log('Fetched vendor:', data);
      return data as VendorWithRelations;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Prestataire non trouvé</h1>
            <p>Désolé, nous n'avons pas trouvé le prestataire que vous cherchez.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="h-[400px] relative bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container">
              <h1 className="text-4xl font-serif mb-2">{vendor.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {vendor.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {vendor.rating} ({vendor.review_count} avis)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-serif mb-4">À propos</h2>
                <p className="text-gray-600">{vendor.description || vendor.short_description}</p>
              </section>

              {/* Services */}
              {vendor.vendor_services && vendor.vendor_services.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif mb-4">Services proposés</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vendor.vendor_services.map((service) => (
                      <div key={service.id} className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <p className="text-sm font-medium">
                          À partir de {service.base_price}€
                          {service.is_optional && " (optionnel)"}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Chat Bot */}
              <section>
                <h2 className="text-2xl font-serif mb-4">Questions & Réponses</h2>
                <ChatBot vendor={vendor} />
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="p-6 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Prix indicatif</span>
                  <div className="flex items-center gap-1">
                    <Euro className="h-4 w-4" />
                    <span>{vendor.price_range_min}€ - {vendor.price_range_max}€</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Capacité</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{vendor.capacity_min} - {vendor.capacity_max} personnes</span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="pt-4 space-y-3">
                  <Button className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Vérifier la disponibilité
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="mr-2 h-4 w-4" />
                    Ajouter aux favoris
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Contacter
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer un message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorDetails;
