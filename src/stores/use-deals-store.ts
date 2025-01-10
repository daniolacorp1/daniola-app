// src/stores/use-deals-store.ts
import { create } from 'zustand';
import { supabase } from '@/lib/supabase-client';

interface DealsStore {
  dealCount: number;
  updateDealCount: () => Promise<void>;
  incrementDealCount: () => void;
}

export const useDealsStore = create<DealsStore>((set, get) => ({
  dealCount: 0,
  updateDealCount: async () => {
    try {
      const { count, error } = await supabase
        .from('deals')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      set({ dealCount: count || 0 });
    } catch (error) {
      console.error('Error fetching deal count:', error);
    }
  },
  incrementDealCount: () => {
    set(state => ({ dealCount: state.dealCount + 1 }));
  },
}));