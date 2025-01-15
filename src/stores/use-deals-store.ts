// src/stores/use-deals-store.ts
import { create } from 'zustand';
import type { Deal } from '../types/deal';

interface DealsStore {
  deals: Deal[];
  setDeals: (deals: Deal[]) => void;
  addDeal: (deal: Deal) => void;
  updateDeal: (id: number, updates: Partial<Deal>) => void;
}

export const useDealsStore = create<DealsStore>((set) => ({
  deals: [],
  setDeals: (deals) => set({ deals }),
  addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
  updateDeal: (id, updates) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id ? { ...deal, ...updates } : deal
      ),
    })),
}));