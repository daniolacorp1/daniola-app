import { create } from 'zustand';
import type { Deal } from '../types/deals';

interface DealStore {
    deals: Deal[];
    dealsCount: number;
    addDeal: (deal: Omit<Deal, 'id' | 'createdAt'>) => void;
    removeDeal: (id: string) => void;
    incrementDealsCount: () => void;
    decrementDealsCount: () => void;
    setDealCount: (count: number) => void;
}

export const useDealStore = create<DealStore>((set) => ({
    deals: [],
    dealsCount: 0,
    
    addDeal: (deal: Omit<Deal, 'id' | 'createdAt'>) => set((state) => ({
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
    
    removeDeal: (id: string) => set((state) => ({
        deals: state.deals.filter((d) => d.id !== id),
        dealsCount: state.dealsCount - 1
    })),
    
    incrementDealsCount: () => set((state) => ({
        dealsCount: state.dealsCount + 1
    })),
    
    decrementDealsCount: () => set((state) => ({
        dealsCount: state.dealsCount - 1
    })),

    setDealCount: (count: number) => set(() => ({ 
        dealsCount: count 
    })),
}));