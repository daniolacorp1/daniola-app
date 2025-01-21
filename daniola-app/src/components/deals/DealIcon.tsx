<<<<<<< HEAD
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
=======
import React from 'react';
import { useDealsStore } from '@/stores/use-dealstore';
import type { DealIconProps } from '@/types';

export const DealIcon: React.FC<DealIconProps> = ({ icon: Icon, color }) => {
  const { dealCount } = useDealsStore();

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className={`h-12 w-12 ${color}`} />
      </div>
      {dealCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-[#FF4B4B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {dealCount}
        </div>
      )}
    </div>
  );
};
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
