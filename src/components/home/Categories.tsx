import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const categories = [
  { 
    name: "Lieux", 
    image: "photo-1649972904349-6e44c42644a7",
    fallbackImage: "photo-1488590528505-98d2b5aba04b"
  },
  { 
    name: "Traiteurs", 
    image: "photo-1486312338219-ce68d2c6f44d",
    fallbackImage: "photo-1581091226825-a6a2a5aee158"
  },
  { 
    name: "Photo & Vidéo", 
    image: "photo-1486312338219-ce68d2c6f44d",
    fallbackImage: "photo-1581091226825-a6a2a5aee158"
  },
];

export const Categories = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (categoryName: string) => {
    console.error(`Error loading image for category: ${categoryName}`);
    setImageErrors(prev => ({
      ...prev,
      [categoryName]: true
    }));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="font-serif text-3xl text-center mb-12">Nos catégories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.name} className="overflow-hidden group cursor-pointer">
              <CardContent className="p-0 relative">
                <img
                  src={`https://images.unsplash.com/${imageErrors[category.name] ? category.fallbackImage : category.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => handleImageError(category.name)}
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