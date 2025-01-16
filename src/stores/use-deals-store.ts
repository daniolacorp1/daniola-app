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
}));