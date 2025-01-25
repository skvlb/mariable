import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Lieux", image: "photo-1506744038136-46273834b3fb" },
  { name: "Traiteurs", image: "photo-1469474968028-56623f02e42e" },
  { name: "Photo & Vidéo", image: "photo-1470071459604-3b5ec3a7fe05" },
];

export const Categories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="font-serif text-3xl text-center mb-12">Nos catégories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.name} className="overflow-hidden group cursor-pointer">
              <CardContent className="p-0 relative">
                <img
                  src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white font-serif text-2xl">{category.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};