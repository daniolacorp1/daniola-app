// src/components/deals/DealsList.tsx
import DefaultIcon from './DefaultIcon';
import { DealCard } from './DealCard';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          id={deal.id}
          title={deal.title}
          status={deal.status}
          description={deal.description}
          image={deal.image}
          icon={DefaultIcon}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          category="Technology"
          price={100}
          discount={10}
          gradientColors={deal.gradientColors || "bg-gradient-to-r from-blue-500 to-blue-700"}
          onViewDeal={onViewDeal}
        />
      ))}
    </div>
  );
};