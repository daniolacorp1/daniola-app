import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
// src/components/ui/calendar.tsx

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  seller_id: string;
  created_at: string;
}

interface MarketplaceState {
  items: MarketplaceItem[];
  isLoading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  addItem: (item: Omit<MarketplaceItem, 'id' | 'created_at'>) => Promise<void>;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchItems: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('marketplace_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ items: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (item) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase
        .from('marketplace_items')
        .insert([item]);

      if (error) throw error;
      set((state) => ({
        items: [{ ...item, id: Date.now().toString(), created_at: new Date().toISOString() }, ...state.items],
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
})); 