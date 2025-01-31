import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "./button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/AuthProvider";

interface VendorCardProps {
  vendor: Tables<"vendors">;
}

export const VendorCard = ({ vendor }: VendorCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch favorite status
  const { data: isFavorite } = useQuery({
    queryKey: ['favorite', vendor.id],
    queryFn: async () => {
      if (!user) return false;

      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('vendor_id', vendor.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking favorite status:', error);
        return false;
      }

      return !!data;
    },
    enabled: !!user,
  });

  // Add to favorites mutation
  const addToFavorites = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('favorites')
        .insert([{ 
          vendor_id: vendor.id,
          user_id: user.id 
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorite', vendor.id] });
      toast({
        title: "Ajouté aux favoris",
        description: `${vendor.name} a été ajouté à vos favoris.`
      });
    },
    onError: (error) => {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout aux favoris.",
        variant: "destructive"
      });
    }
  });

  // Remove from favorites mutation
  const removeFromFavorites = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('vendor_id', vendor.id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorite', vendor.id] });
      toast({
        title: "Retiré des favoris",
        description: `${vendor.name} a été retiré de vos favoris.`
      });
    },
    onError: (error) => {
      console.error('Error removing from favorites:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression des favoris.",
        variant: "destructive"
      });
    }
  });

  const toggleFavorite = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour ajouter des favoris.",
        variant: "destructive"
      });
      return;
    }

    if (isFavorite) {
      removeFromFavorites.mutate();
    } else {
      addToFavorites.mutate();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/vendors/${vendor.id}`}>
        <div className="h-48 bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/vendors/${vendor.id}`}>
            <h3 className="text-lg font-medium hover:text-primary transition-colors">
              {vendor.name}
            </h3>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite();
            }}
            className={`${
              isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-500"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mb-2">{vendor.location}</p>
        <p className="text-sm text-gray-500">{vendor.short_description}</p>
      </div>
    </div>
  );
};