// src/lib/profile-stats.ts
import { supabase } from './supabase-client';

export interface ProfileStats {
  totalDeals: number;
  averageValue: number;
  responseRate: number;
  rating: number;
  responseTime?: number; // for suppliers
  totalPurchases?: number; // for buyers
}

export const fetchProfileStats = async (userId: string, role: 'buyer' | 'supplier'): Promise<ProfileStats> => {
  try {
    // Fetch deals/transactions
    const { data: deals, error: dealsError } = await supabase
      .from('deals')
      .select('*')
      .or(`buyer_id.eq.${userId},supplier_id.eq.${userId}`);

    if (dealsError) throw dealsError;

    // Fetch ratings
    const { data: ratings, error: ratingsError } = await supabase
      .from('ratings')
      .select('rating')
      .eq('user_id', userId);

    if (ratingsError) throw ratingsError;

    // Calculate stats
    const totalDeals = deals?.length || 0;
    const averageValue = deals?.reduce((acc, deal) => acc + (deal.value || 0), 0) / totalDeals || 0;
    const rating = ratings?.reduce((acc, r) => acc + r.rating, 0) / (ratings?.length || 1) || 0;

    if (role === 'buyer') {
      return {
        totalDeals,
        totalPurchases: deals?.filter(d => d.status === 'completed').length || 0,
        averageValue,
        responseRate: 98, // You might want to calculate this based on actual response data
        rating,
      };
    } else {
      // Supplier specific calculations
      const responseTime = deals?.reduce((acc, deal) => acc + (deal.response_time || 0), 0) / totalDeals || 0;
      
      return {
        totalDeals,
        averageValue,
        responseRate: 98,
        rating,
        responseTime,
      };
    }
  } catch (error) {
    console.error('Error fetching profile stats:', error);
    throw error;
  }
};