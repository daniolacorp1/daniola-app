// src/stores/use-deals-store.ts
import { create } from 'zustand';

interface Deal {
  id: number;
  title: string;
  description: string;
  status: string;
  category: string;
  value: string;
  timeline: string;
}

interface DealStore {
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id'>) => void;
  removeDeal: (id: number) => void;
  updateDeal: (id: number, deal: Partial<Deal>) => void;
}

export const useDealsStore = create<DealStore>((set) => ({
  deals: [],
  addDeal: (newDeal) =>
    set((state) => ({
      deals: [
        ...state.deals,
        { ...newDeal, id: state.deals.length + 1 }
      ],
    })),
  removeDeal: (id) =>
    set((state) => ({
      deals: state.deals.filter((deal) => deal.id !== id),
    })),
  updateDeal: (id, updatedDeal) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id ? { ...deal, ...updatedDeal } : deal
      ),
    })),
}));