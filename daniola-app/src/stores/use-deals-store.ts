<<<<<<< HEAD
<<<<<<< HEAD
// src/stores/use-deals-store.ts
import { create } from 'zustand';
import type { Deal } from '@/types';

interface DealsState {
  deals: Deal[];
  dealCount: number;
  addDeal: (deal: Deal) => void;
  removeDeal: (id: number) => void;
=======
// src/stores/use-deals-store.ts (note: stores not store)
import { Deal } from '@/types/deals';
import { set } from 'react-hook-form';
import { create } from 'zustand';


interface DealStore {
  deals: Deal[];
  dealsCount: number;
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  removeDeal: (id: string) => void;
  incrementDealsCount: () => void;
  decrementDealsCount: () => void;
<<<<<<< HEAD
  setDealCount: (count: number) => void;
=======
>>>>>>> 719c7b49ba048f75b95de8609ca220e3d2c3b06c
>>>>>>> bdb3750565fa285f7c03f052e9d83739133d26f1
}

export const useDealStore = create<DealStore>((set) => ({
  deals: [],
<<<<<<< HEAD
  dealCount: 0,
  addDeal: (deal) => set((state) => ({ 
    deals: [...state.deals, deal],
    dealCount: state.dealCount + 1 
  })),
  removeDeal: (id) => set((state) => ({ 
    deals: state.deals.filter(d => d.id !== id),
    dealCount: state.dealCount - 1
=======
  dealsCount: 0,
  addDeal: (deal: Omit<Deal, 'id'>) => set((state) => ({
    deals: [...state.deals, { ...deal, id: String(state.deals.length + 1) }]
  })),
  removeDeal: (id: string) => set((state) => ({
    deals: state.deals.filter(d => d.id !== id)
  })),
  incrementDealsCount: () => set((state) => ({ 
    dealsCount: state.dealsCount + 1 
  })),
  decrementDealsCount: () => set((state) => ({ 
    dealsCount: state.dealsCount - 1 
>>>>>>> 719c7b49ba048f75b95de8609ca220e3d2c3b06c
  })),
  setDealCount: (count: number) => set(() => ({ 
    dealsCount: count 
  })),
=======
// src/stores/use-deals-store.ts
import { create } from 'zustand';
import type { Deal } from '../types/auth';

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
        deals: [
            ...state.deals,
            {
                ...deal,
                id: String(state.deals.length + 1),
                createdAt: new Date()
            }
        ],
        dealsCount: state.dealsCount + 1
    })),
    
    removeDeal: (id) => set((state) => ({
        deals: state.deals.filter(d => d.id !== id),
        dealsCount: state.dealsCount - 1
    })),
    
    incrementDealsCount: () => set((state) => ({
        dealsCount: state.dealsCount + 1
    })),
    
    decrementDealsCount: () => set((state) => ({
        dealsCount: state.dealsCount - 1
    })),
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
}));