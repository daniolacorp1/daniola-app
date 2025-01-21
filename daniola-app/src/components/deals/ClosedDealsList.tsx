import { Wrench, Factory, Package, Building, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useToast } from "@/hooks/use-toast";
=======
import { useToast } from "@/components/ui/use-toast";
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
import { DealCard } from "./DealCard";

export const ClosedDealsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

<<<<<<< HEAD
  const handleViewDeal = (id: number) => {
    navigate(`/deals/${id}`);
    toast({
      title: "Opening Deal",
      description: "Loading deal details...",
    });
  };

=======
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
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
<<<<<<< HEAD
        id={4}
        description="Equipment maintenance service contract"
        image="/path/to/image"
        onViewDeal={handleViewDeal}
        onClick={() => handleViewDeal(4)}
      />
      {/* Repeat similar changes for other DealCard components */}
=======
        onClick={() => {
          navigate("/deals/4");
          toast({
            title: "Opening Completed Deal",
            description: "Loading deal details...",
          });
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
      <DealCard
        icon={Factory}
        iconBgColor="bg-slate-50"
        iconColor="text-slate-600"
        status="Completed"
        title="Factory Setup"
        category="Infrastructure"
        value="$250,000"
        timeline="Completed"
<<<<<<< HEAD
        id={8}
        description="Factory infrastructure setup"
        image="/path/to/image"
        onViewDeal={handleViewDeal}
        onClick={() => handleViewDeal(8)}
      />
      {/* ... other cards similarly updated */}
=======
        onClick={() => {
          navigate("/deals/8");
          toast({
            title: "Opening Factory Setup Deal",
            description: "Loading setup details...",
          });
        }}
      />
      <DealCard
        icon={Wrench}
        iconBgColor="bg-emerald-50"
        iconColor="text-emerald-600"
        status="Completed"
        title="Tool Procurement"
        category="Equipment"
        value="$15,000"
        timeline="Completed"
        onClick={() => {
          navigate("/deals/9");
          toast({
            title: "Opening Tool Procurement Deal",
            description: "Loading procurement details...",
          });
        }}
      />
      <DealCard
        icon={Package}
        iconBgColor="bg-rose-50"
        iconColor="text-rose-600"
        status="Completed"
        title="Supply Chain Optimization"
        category="Logistics"
        value="$180,000"
        timeline="Completed"
        onClick={() => {
          navigate("/deals/16");
          toast({
            title: "Opening Supply Chain Deal",
            description: "Loading optimization details...",
          });
        }}
      />
      <DealCard
        icon={Building}
        iconBgColor="bg-cyan-50"
        iconColor="text-cyan-600"
        status="Completed"
        title="Office Space Lease"
        category="Real Estate"
        value="$95,000"
        timeline="Completed"
        onClick={() => {
          navigate("/deals/17");
          toast({
            title: "Opening Office Lease Deal",
            description: "Loading lease details...",
          });
        }}
      />
      <DealCard
        icon={ShoppingCart}
        iconBgColor="bg-amber-50"
        iconColor="text-amber-600"
        status="Completed"
        title="Inventory Purchase"
        category="Retail"
        value="$42,000"
        timeline="Completed"
        onClick={() => {
          navigate("/deals/18");
          toast({
            title: "Opening Inventory Deal",
            description: "Loading purchase details...",
          });
        }}
      />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
    </>
  );
};