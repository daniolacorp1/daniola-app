// src/stores/use-deals-store.ts (note: stores not store)
import { Deal } from '@/types/deals';
import { create } from 'zustand';
// import { useDealStore } from '@/stores/use-deals-store';


interface DealStore {
  deals: Deal[];
  dealsCount: number;
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  removeDeal: (id: string) => void;
  incrementDealsCount: () => void;
  decrementDealsCount: () => void;
}

export const useDealStore = create<DealStore>((set) => ({
  deals: [],
  dealsCount: 0,
  addDeal: (deal) => set((state) => ({
    deals: [...state.deals, { ...deal, id: String(state.deals.length + 1) }]
  })),
  removeDeal: (id) => set((state) => ({
    deals: state.deals.filter(d => d.id !== id)
  })),
  incrementDealsCount: () => set((state) => ({ 
    dealsCount: state.dealsCount + 1 
  })),
  decrementDealsCount: () => set((state) => ({ 
    dealsCount: state.dealsCount - 1 
  })),
}));