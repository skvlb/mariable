import { useQuery } from "@tanstack/react-query";
import { BackButton } from "@/components/ui/BackButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VendorCard } from "@/components/ui/VendorCard";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

const Favorites = () => {
  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      console.log('Fetching favorites...');
      const { data: favoritesData, error } = await supabase
        .from('favorites')
        .select(`
          *,
          vendors (
            *,
            catering_details(*),
            venue_details(*),
            vendor_services(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }

      console.log('Fetched favorites:', favoritesData);
      return favoritesData;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <BackButton />
      <main className="flex-grow bg-cream-light">
        <div className="container mx-auto py-12">
          <h1 className="text-4xl font-serif mb-8">Mes Favoris</h1>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : favorites && favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((favorite) => (
                <VendorCard 
                  key={favorite.id} 
                  vendor={favorite.vendors as Tables<"vendors">}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Vous n'avez pas encore de favoris.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;