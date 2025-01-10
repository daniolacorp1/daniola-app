import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useAuthStore } from '@/stores/use-auth-store';
import type { Listing } from '@/types';

export const ActiveListings: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  
  const { data: listings, isLoading } = useQuery<Listing[]>({
    queryKey: ['active-listings', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          supplier:profiles(full_name)
        `)
        .eq('status', 'active');

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Active Listings</h2>
      {listings?.map((listing) => (
        <Card key={listing.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{listing.title}</CardTitle>
              <span className="text-xs text-green-600 px-2 py-1 bg-green-50 rounded-full">
                Active
              </span>
            </div>
            <CardDescription>
              Supplier: {listing.supplier.full_name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{listing.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span className="text-sm font-medium">
              ${listing.price} per {listing.unit}
            </span>
            <span className="text-xs text-gray-500">
              Listed: {new Date(listing.created_at).toLocaleDateString()}
            </span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}; 