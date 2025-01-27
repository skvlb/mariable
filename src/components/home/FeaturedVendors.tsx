import { VendorCard } from "@/components/ui/VendorCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FeaturedVendors = () => {
  const { data: vendors, isLoading, error } = useQuery({
    queryKey: ['featuredVendors'],
    queryFn: async () => {
      console.log('Fetching featured vendors...');
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .limit(2)
        .order('rating', { ascending: false });
      
      if (error) {
        console.error('Error fetching vendors:', error);
        throw error;
      }
      
      console.log('Fetched vendors:', data);
      return data;
    }
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-cream-light">
        <div className="container">
          <h2 className="font-serif text-3xl text-center mb-12">Prestataires à la une</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error in FeaturedVendors:', error);
    return (
      <section className="py-16 bg-cream-light">
        <div className="container">
          <h2 className="font-serif text-3xl text-center mb-12">Prestataires à la une</h2>
          <p className="text-center text-gray-600">
            Impossible de charger les prestataires pour le moment.
          </p>
        </div>
      </section>
    );
  }

  // Fallback to empty array if no vendors
  const displayVendors = vendors || [];

  return (
    <section className="py-16 bg-cream-light">
      <div className="container">
        <h2 className="font-serif text-3xl text-center mb-12">Prestataires à la une</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </section>
  );
};