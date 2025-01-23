import { Deal } from '@/types/deals';
import { create } from 'zustand';

interface DealStore {
  deals: Deal[];
  dealCount: number;
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  removeDeal: (id: string) => void;
  incrementDealsCount: () => void;
  decrementDealsCount: () => void;
}

export const useDealStore = create<DealStore>((set) => ({
  deals: [],
  dealCount: 0,
  addDeal: (deal) => set((state) => ({
    deals: [...state.deals, { ...deal, id: String(state.deals.length + 1) }],
    dealCount: state.deals.length + 1,
  })),
  removeDeal: (id) => set((state) => ({
    deals: state.deals.filter(d => d.id !== id),
    dealCount: state.deals.length - 1,
  })),
  incrementDealsCount: () => set((state) => ({ 
    dealCount: state.dealCount + 1 
  })),
  decrementDealsCount: () => set((state) => ({ 
    dealCount: state.dealCount - 1 
  })),
}));
