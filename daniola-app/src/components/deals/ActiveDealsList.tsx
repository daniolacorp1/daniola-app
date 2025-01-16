import { LucideIcon, Handshake, Truck, Package, Building, ShoppingCart, Factory, Wrench, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { DealCard } from "./DealCard";

interface Deal {
  id: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  status: string;
  title: string;
  category: string;
  value: string;
  timeline: string;
}

const ACTIVE_DEALS: Deal[] = [
  {
    id: "1",
    icon: Handshake,
    iconBgColor: "bg-secondary/5",
    iconColor: "text-secondary",
    status: "In Negotiation",
    title: "Equipment Purchase",
    category: "Industrial Machinery",
    value: "$45,000",
    timeline: "30 days"
  },
  {
    id: "2",
    icon: Truck,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600",
    status: "Processing",
    title: "Material Delivery",
    category: "Raw Materials",
    value: "$12,350",
    timeline: "2 days"
  },
  {
    id: "3",
    icon: Package,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    status: "Under Review",
    title: "Supply Chain Deal",
    category: "Logistics & Distribution",
    value: "$28,750",
    timeline: "6 months"
  },
  {
    id: "6",
    icon: Building,
    iconBgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    status: "Active",
    title: "Warehouse Lease",
    category: "Real Estate",
    value: "$150,000",
    timeline: "12 months"
  },
  {
    id: "7",
    icon: ShoppingCart,
    iconBgColor: "bg-pink-50",
    iconColor: "text-pink-600",
    status: "In Progress",
    title: "Bulk Purchase",
    category: "Retail Supplies",
    value: "$75,000",
    timeline: "45 days"
  },
  {
    id: "13",
    icon: Factory,
    iconBgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    status: "Active",
    title: "Manufacturing Setup",
    category: "Industrial Equipment",
    value: "$320,000",
    timeline: "90 days"
  },
  {
    id: "14",
    icon: Wrench,
    iconBgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    status: "In Progress",
    title: "Equipment Upgrade",
    category: "Machinery",
    value: "$95,000",
    timeline: "60 days"
  },
  {
    id: "15",
    icon: Briefcase,
    iconBgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    status: "Under Review",
    title: "Service Contract",
    category: "Professional Services",
    value: "$48,000",
    timeline: "12 months"
  }
];

export const ActiveDealsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDealClick = (deal: Deal) => {
    navigate(`/deals/${deal.id}`);
    toast({
      title: `Opening ${deal.title}`,
      description: "Loading deal details...",
      duration: 5000,
    });
  };

  return (
    <>
      {ACTIVE_DEALS.map((deal) => (
        <DealCard
          key={deal.id}
          icon={deal.icon}
          iconBgColor={deal.iconBgColor}
          iconColor={deal.iconColor}
          status={deal.status}
          title={deal.title}
          category={deal.category}
          value={deal.value}
          timeline={deal.timeline}
          onClick={() => handleDealClick(deal)}
        />
      ))}
    </>
  );
};
