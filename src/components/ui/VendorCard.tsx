import { Heart, MapPin, Euro, Users } from "lucide-react";
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
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="capitalize">{vendor.location}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-sm">
              <Euro className="h-4 w-4" />
              <span>
                {vendor.price_range_min && vendor.price_range_max
                  ? `${vendor.price_range_min}€ - ${vendor.price_range_max}€`
                  : "Prix sur demande"}
              </span>
            </div>
            {vendor.capacity_min && vendor.capacity_max && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Users className="h-4 w-4" />
                <span>{vendor.capacity_min} - {vendor.capacity_max} pers.</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
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