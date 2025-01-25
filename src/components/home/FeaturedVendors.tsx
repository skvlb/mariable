import { VendorCard } from "@/components/ui/VendorCard";

const featuredVendors = [
  {
    id: 1,
    name: "Château de Vaux-le-Vicomte",
    category: "Lieu",
    image: "photo-1506744038136-46273834b3fb",
    description: "Un cadre exceptionnel pour votre mariage, à seulement 55km de Paris",
    price: "À partir de 15000€",
  },
  {
    id: 2,
    name: "Maison Lenôtre",
    category: "Traiteur",
    image: "photo-1469474968028-56623f02e42e",
    description: "Excellence gastronomique et service sur-mesure pour votre réception",
    price: "À partir de 180€/pers",
  },
];

export const FeaturedVendors = () => {
  return (
    <section className="py-16 bg-cream-light">
      <div className="container">
        <h2 className="font-serif text-3xl text-center mb-12">Prestataires à la une</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </section>
  );
};