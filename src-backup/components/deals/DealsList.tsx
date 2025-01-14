import { DealCard } from "./DealCard";

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

export const DealsList = ({ deals, onViewDeal }: DealsListProps) => {
  return (
    <div className="space-y-4">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          {...deal}
          onViewDeal={onViewDeal}
        />
      ))}
    </div>
  );
};