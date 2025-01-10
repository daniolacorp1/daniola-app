import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/useAuthStore';

export const ActiveListings = () => {
  const user = useAuthStore(state => state.user);
  
  const { data: listings, isLoading } = useQuery({
    queryKey: ['active-listings', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          supplier:profiles(*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Active Listings</h2>
      {listings?.map((listing) => (
        <Card key={listing.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{listing.title}</h3>
              <p className="text-sm text-gray-600">
                Supplier: {listing.supplier.full_name}
              </p>
            </div>
            <span className="text-xs text-green-600 px-2 py-1 bg-green-50 rounded-full">
              Active
            </span>
          </div>
          <p className="mt-2 text-sm">{listing.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm font-medium">
              ${listing.price} per {listing.unit}
            </span>
            <span className="text-xs text-gray-500">
              Listed: {new Date(listing.created_at).toLocaleDateString()}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}; 