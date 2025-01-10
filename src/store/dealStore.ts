import { create } from 'zustand';
import { supabase } from '@/lib/supabase-client';

interface DealStore {
  activeDealsCount: number;
  fetchActiveDeals: () => Promise<void>;
  incrementDealsCount: () => void;
  decrementDealsCount: () => void;
}

export const useDealStore = create<DealStore>((set) => ({
  activeDealsCount: 0,
  fetchActiveDeals: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: deals, error } = await supabase
        .from('deals')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'pending');

      if (error) throw error;
      
      set({ activeDealsCount: deals?.length || 0 });
    } catch (error) {
      console.error('Error fetching active deals:', error);
    }
  },
  incrementDealsCount: () => set((state) => ({ 
    activeDealsCount: state.activeDealsCount + 1 
  })),
  decrementDealsCount: () => set((state) => ({ 
    activeDealsCount: Math.max(0, state.activeDealsCount - 1) 
  })),
})); 