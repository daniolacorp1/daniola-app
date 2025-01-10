// src/components/ActiveDeals.tsx
import { useNavigate } from "react-router-dom";
import { commodities } from "@/data/commodities";

export const ActiveDeals: React.FC<{ id?: string }> = ({ id }) => {
  const navigate = useNavigate();

  const deals = commodities
    .map((commodity) => ({
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
    <div>
      <h2 className="text-xl font-bold mb-4 text-left">Active Deals</h2>
      <div className="space-y-3">
        {deals.map((deal) => (
          <div
            key={deal.name}
            className="flex items-center justify-between py-2"
          >
            <p>{deal.name}</p>
            <button
              onClick={() => handleViewDetails(deal.id)}
              className="px-4 py-2 text-sm text-white bg-[#FF4042] rounded-xl"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};