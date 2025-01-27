import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VendorCard } from "@/components/ui/VendorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

// Mock data with the correct type structure
const mockVendors: Tables<"vendors">[] = [
  {
    id: "1",
    name: "Château de Vaux-le-Vicomte",
    category: "venue",
    description: "Un cadre exceptionnel pour votre mariage, à seulement 55km de Paris",
    short_description: "Un cadre exceptionnel pour votre mariage",
    location: "Maincy",
    address: "Château de Vaux-le-Vicomte, 77950 Maincy",
    latitude: 48.5667,
    longitude: 2.7167,
    rating: 4.8,
    review_count: 150,
    price_range_min: 15000,
    price_range_max: 50000,
    capacity_min: 50,
    capacity_max: 500,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Maison Lenôtre",
    category: "catering",
    description: "Excellence gastronomique et service sur-mesure pour votre réception",
    short_description: "Excellence gastronomique et service sur-mesure",
    location: "Paris",
    address: "44 Rue d'Auteuil, 75016 Paris",
    latitude: 48.8566,
    longitude: 2.3522,
    rating: 4.9,
    review_count: 200,
    price_range_min: 180,
    price_range_max: 350,
    capacity_min: 20,
    capacity_max: 1000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Studio Cabrelli",
    category: "photography",
    description: "Capturez les moments magiques de votre journée avec notre équipe expérimentée",
    short_description: "Capturez les moments magiques de votre journée",
    location: "Paris",
    address: "15 Rue de la Photographie, 75008 Paris",
    latitude: 48.8744,
    longitude: 2.3156,
    rating: 4.7,
    review_count: 75,
    price_range_min: 2500,
    price_range_max: 5000,
    capacity_min: null,
    capacity_max: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-cream-light">
        <div className="container mx-auto py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="font-serif text-4xl font-medium">Nos prestataires</h1>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Input
                  type="text"
                  placeholder="Rechercher un prestataire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 w-full md:w-[300px]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockVendors
              .filter((vendor) =>
                vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vendors;