import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";

type Vendor = Tables<"vendors">;

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard = ({ vendor }: VendorCardProps) => {
  const navigate = useNavigate();
  
  // Default image if none provided
  const imageUrl = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80";

  // Format price range for display
  const priceDisplay = vendor.price_range_min && vendor.price_range_max 
    ? `${vendor.price_range_min}€ - ${vendor.price_range_max}€`
    : "Prix sur demande";

  return (
    <Card className="overflow-hidden group">
      <CardHeader className="p-0 relative">
        <img
          src={imageUrl}
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
            <p className="text-sm text-muted-foreground capitalize">
              {vendor.category.replace('_', ' ')}
            </p>
          </div>
          <p className="text-sm font-medium">{priceDisplay}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {vendor.short_description || vendor.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full bg-gold hover:bg-gold-dark"
          onClick={() => navigate(`/vendors/${vendor.id}`)}
        >
          Voir le détail
        </Button>
      </CardFooter>
    </Card>
  );
};