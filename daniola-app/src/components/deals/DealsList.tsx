import React from 'react';

interface Deal {
  id: number;
  title: string;
  status: string;
  description: string;
  image: string;
  gradientColors?: string;
}

interface DealsListProps {
  deals: Deal[];
  onViewDeal: (id: number) => void;
}

export const DealsList: React.FC<DealsListProps> = ({ deals, onViewDeal }) => {
  return (
    <div>
      {deals.map((deal) => (
        <button key={deal.id} onClick={() => onViewDeal(deal.id)}>
          <h2>{deal.title}</h2>
        </button>
      ))}
    </div>
  );
};