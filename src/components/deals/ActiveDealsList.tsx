import { Handshake, Truck, Package, Building, ShoppingCart, Factory, Wrench, Briefcase, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { DealCard } from "./DealCard";

export const ActiveDealsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleView = () => {
    navigate("/deals/1");
    toast({
      title: "Opening Equipment Purchase Deal",
      description: "Loading deal details...",
    });
  };

  const handleTrack = () => {
    navigate("/deals");
    toast({
      title: "Tracking Material Delivery",
      description: "Current Status: In Transit - Expected arrival in 2 days",
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <>
      <DealCard
        icon={Handshake}
        iconBgColor="bg-secondary/5"
        iconColor="text-secondary"
        status="In Negotiation"
        title="Equipment Purchase"
        category="Industrial Machinery"
        value="$45,000"
        timeline="30 days"
        onClick={handleView}
      />
      <DealCard
        icon={Truck}
        iconBgColor="bg-green-50"
        iconColor="text-green-600"
        status="Processing"
        title="Material Delivery"
        category="Raw Materials"
        value="$12,350"
        timeline="2 days"
        onClick={handleTrack}
      />
      <DealCard
        icon={Package}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
        status="Under Review"
        title="Supply Chain Deal"
        category="Logistics & Distribution"
        value="$28,750"
        timeline="6 months"
        onClick={() => {
          navigate("/deals/3");
          toast({
            title: "Opening Supply Chain Deal",
            description: "Loading supply chain details...",
          });
        }}
      />
      <DealCard
        icon={Building}
        iconBgColor="bg-indigo-50"
        iconColor="text-indigo-600"
        status="Active"
        title="Warehouse Lease"
        category="Real Estate"
        value="$150,000"
        timeline="12 months"
        onClick={() => {
          navigate("/deals/6");
          toast({
            title: "Opening Warehouse Lease Deal",
            description: "Loading lease details...",
          });
        }}
      />
      <DealCard
        icon={ShoppingCart}
        iconBgColor="bg-pink-50"
        iconColor="text-pink-600"
        status="In Progress"
        title="Bulk Purchase"
        category="Retail Supplies"
        value="$75,000"
        timeline="45 days"
        onClick={() => {
          navigate("/deals/7");
          toast({
            title: "Opening Bulk Purchase Deal",
            description: "Loading purchase details...",
          });
        }}
      />
      <DealCard
        icon={Factory}
        iconBgColor="bg-amber-50"
        iconColor="text-amber-600"
        status="Active"
        title="Manufacturing Setup"
        category="Industrial Equipment"
        value="$320,000"
        timeline="90 days"
        onClick={() => {
          navigate("/deals/13");
          toast({
            title: "Opening Manufacturing Setup Deal",
            description: "Loading setup details...",
          });
        }}
      />
      <DealCard
        icon={Wrench}
        iconBgColor="bg-violet-50"
        iconColor="text-violet-600"
        status="In Progress"
        title="Equipment Upgrade"
        category="Machinery"
        value="$95,000"
        timeline="60 days"
        onClick={() => {
          navigate("/deals/14");
          toast({
            title: "Opening Equipment Upgrade Deal",
            description: "Loading upgrade details...",
          });
        }}
      />
      <DealCard
        icon={Briefcase}
        iconBgColor="bg-teal-50"
        iconColor="text-teal-600"
        status="Under Review"
        title="Service Contract"
        category="Professional Services"
        value="$48,000"
        timeline="12 months"
        onClick={() => {
          navigate("/deals/15");
          toast({
            title: "Opening Service Contract Deal",
            description: "Loading contract details...",
          });
        }}
      />
    </>
  );
};
