import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VendorCard } from "@/components/ui/VendorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const mockVendors = [
  {
    id: 1,
    name: "Château de Vaux-le-Vicomte",
    category: "Lieu",
    image: "photo-1519225421980-715cb0215aed",
    description: "Un cadre exceptionnel pour votre mariage, à seulement 55km de Paris",
    price: "À partir de 15000€",
  },
  {
    id: 2,
    name: "Maison Lenôtre",
    category: "Traiteur",
    image: "photo-1464366400600-7168b8af9bc3",
    description: "Excellence gastronomique et service sur-mesure pour votre réception",
    price: "À partir de 180€/pers",
  },
  {
    id: 3,
    name: "Studio Cabrelli",
    category: "Photo & Vidéo",
    image: "photo-1502759683299-cdcd6974244f",
    description: "Capturez les moments magiques de votre journée avec notre équipe expérimentée",
    price: "À partir de 2500€",
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