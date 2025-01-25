import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Vendor {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  price: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0 relative">
        <img
          src={`https://images.unsplash.com/${vendor.image}?auto=format&fit=crop&w=800&q=80`}
          alt={vendor.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-serif text-xl">{vendor.name}</h3>
            <p className="text-sm text-muted-foreground">{vendor.category}</p>
          </div>
          <p className="text-sm font-medium">{vendor.price}</p>
        </div>
        <p className="text-sm text-muted-foreground">{vendor.description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-gold hover:bg-gold-dark">
          Voir le détail
        </Button>
      </CardFooter>
    </Card>
  );
};