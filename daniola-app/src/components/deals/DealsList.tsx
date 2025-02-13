import React from 'react';
import DefaultIcon from './DefaultIcon';
import { DealCard } from './DealCard';

interface Deal {
  id: number;
  title: string;
  status: string;
  description: string;
  image: string;
  category: string;
  price: number;
  discount: number;
  gradientColors?: string;
}

interface DealsListProps {
  deals: Deal[];
  onViewDeal: (id: number) => void;
}

export const DealsList: React.FC<DealsListProps> = ({ deals, onViewDeal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          {...deal}
          icon={DefaultIcon}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          onViewDeal={onViewDeal}
        />
      ))}
    </div>
  );
};