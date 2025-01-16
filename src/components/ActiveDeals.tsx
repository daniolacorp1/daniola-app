import React from 'react';

interface Deal {
  id: number;
  name: string;
  isActive: boolean;
}

interface ActiveDealsProps {
  deals?: Deal[];
}

const ActiveDeals: React.FC<ActiveDealsProps> = ({ deals = [] }) => {
  const activeDeals = deals.filter(deal => deal.isActive);

  return (
    <div data-testid="active-deals" className="space-y-4">
      {activeDeals.length > 0 ? (
        <div className="grid gap-4">
          {activeDeals.map((deal) => (
            <div
              key={deal.id}
              data-testid="active-deal"
              className="p-4 border rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-medium">{deal.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No active deals</p>
      )}
    </div>
  );
};

export default ActiveDeals;