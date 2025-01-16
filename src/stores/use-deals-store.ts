// src/stores/use-deals-store.ts
import { create } from 'zustand';
import type { Deal } from '@/types';

interface DealsState {
  deals: Deal[];
  dealCount: number;
  addDeal: (deal: Deal) => void;
  removeDeal: (id: number) => void;
}

export const useDealsStore = create<DealsState>((set) => ({
  deals: [],
  dealCount: 0,
  addDeal: (deal) => set((state) => ({ 
    deals: [...state.deals, deal],
    dealCount: state.dealCount + 1 
  })),
  removeDeal: (id) => set((state) => ({ 
    deals: state.deals.filter(d => d.id !== id),
    dealCount: state.dealCount - 1
  })),
}));