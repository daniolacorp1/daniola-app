// src/components/ActiveDeals.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { commodities } from "@/data/commodities";
import { Button } from "@/components/ui/button";

// Define proper types
interface Commodity {
  id: number;
  name: string;
  price: string;
  category: string;
  description?: string;
}

interface Deal extends Commodity {
  status: string;
}

export const ActiveDeals = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const deals: Deal[] = commodities
    .map((commodity: Commodity) => ({
      ...commodity,
      status: "Ready for Review",
    }))
    .filter((deal) => (id ? deal.id === Number(id) : true));

  const handleViewDetails = (dealId: number) => {
    navigate(`/deals/${dealId}`, {
      state: { from: location.pathname }
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Active Deals</h2>
      <div className="space-y-3">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div>
              <p className="font-medium">{deal.name}</p>
              <p className="text-sm text-gray-600">{deal.category}</p>
              {deal.description && (
                <p className="text-sm text-gray-500 mt-1">{deal.description}</p>
              )}
            </div>
            <Button
              onClick={() => handleViewDetails(deal.id)}
              className="bg-[#FF4042] hover:bg-[#E63A3C] text-white"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};