// src/stores/use-deals-store.ts
import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Deal } from '@/types';

interface DealsState {
  deals: Deal[];
  dealCount: number;
  activeDeals: number;
  isLoading: boolean;
  error: string | null;
  decrementActiveDeals: () => void;
  decrementDealCount: () => void;
  fetchDeals: () => Promise<void>;
  updateDealCount: () => Promise<void>;
  incrementDealCount: () => void;
}

export const useDealsStore = create<DealsState>((set) => ({
  deals: [],
  dealCount: 0,
  isLoading: false,
  error: null,
  activeDeals: 0,
  decrementActiveDeals: () => set(state => ({ activeDeals: state.activeDeals - 1 })),
  decrementDealCount: () => set(state => ({ dealCount: state.dealCount - 1 })),
  fetchDeals: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      set({ deals: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
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