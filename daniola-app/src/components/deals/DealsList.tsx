<<<<<<< HEAD
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
=======
import DefaultIcon from './DefaultIcon';
import { DealCard } from './DealCard';

export const DealsList = () => {
  const handleViewDeal = (id: number) => {
    console.log(`Viewing deal with id: ${id}`);
    // Your view deal logic
  };

  return (
    <div>
      <DealCard
        id={1}
        title="Example Deal"
        status="Active"
        description="Deal description"
        image="/path/to/image.jpg"
        icon={DefaultIcon}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        category="Technology"
        price={100}       // Now TypeScript knows about this prop
        discount={10}     // And this one
        gradientColors="bg-gradient-to-r from-blue-500 to-blue-700"
        onViewDeal={handleViewDeal}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
    </div>
  );
};