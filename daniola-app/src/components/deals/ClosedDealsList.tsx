import { Wrench, Factory, Package, Building, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { DealCard } from "./DealCard";

export const ClosedDealsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewDeal = (id: number) => {
    navigate(`/deals/${id}`);
    toast({
      title: "Opening Deal",
      description: "Loading deal details...",
    });
  };

  return (
    <>
      <DealCard
        icon={Wrench}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-600"
        status="Completed"
        title="Equipment Maintenance"
        category="Service Contract"
        value="$8,500"
        timeline="Completed"
        id={4}
        description="Equipment maintenance service contract"
        image="/path/to/image"
        onViewDeal={handleViewDeal}
        onClick={() => handleViewDeal(4)}
      />
      {/* Repeat similar changes for other DealCard components */}
      <DealCard
        icon={Factory}
        iconBgColor="bg-slate-50"
        iconColor="text-slate-600"
        status="Completed"
        title="Factory Setup"
        category="Infrastructure"
        value="$250,000"
        timeline="Completed"
        id={8}
        description="Factory infrastructure setup"
        image="/path/to/image"
        onViewDeal={handleViewDeal}
        onClick={() => handleViewDeal(8)}
      />
      {/* ... other cards similarly updated */}
    </>
  );
};