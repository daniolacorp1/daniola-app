import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DealsSidebar } from "@/components/deals/DealsSidebar";
import { DealsNavigation } from "@/components/deals/DealsNavigation";
import { BottomNav } from "@/components/BottomNav";
import { DealsFilter } from "@/components/deals/DealsFilter";
import { DealsList } from "@/components/deals/DealsList";
import { useToast } from "@/components/ui/use-toast";

const Deals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("All");
  const filterButtons = ["Pending", "Closed"];

  const deals = [
    {
      id: 1,
      title: "Copper Futures",
      status: "Ready for Review",
      description: "Copper 1000 lbs",
      image: "/lovable-uploads/446ff33f-5bb5-4d34-b518-fa3221b18987.png",
      gradientColors: "from-gray-900 to-orange-600",
    },
    {
      id: 2,
      title: "Gold Futures",
      status: "In Progress",
      description: "Gold 1000 oz",
      image: "/lovable-uploads/c338740b-f911-431c-8cdc-9447a84e7d6d.png",
      gradientColors: "from-gray-800 via-yellow-500 to-gray-900",
    },
    {
      id: 3,
      title: "Oil Futures",
      status: "Accepted",
      description: "Oil 1000 barrels",
      image: "/lovable-uploads/a3674f5d-5e86-46b8-8cd8-8a34cdbe1fd7.png",
    },
  ];

  const handleViewDeal = (id: number) => {
    navigate(`/deals/${id}`);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: `Filter Changed`,
      description: `Showing ${filter} deals`,
    });
  };

  const filteredDeals = deals.filter((deal) => {
    if (activeFilter === "All") return true;
    return deal.status === activeFilter;
  });

  return (
    <SidebarProvider defaultOpen={window.innerWidth >= 768}>
      <div className="min-h-screen flex w-full">
        <DealsSidebar />
        <div className="flex-1 pb-24 overflow-x-hidden">
          <DealsNavigation />
          <div className="flex flex-col min-h-screen">
            <header className="p-2">
              <h1 className="text-2xl font-bold text-center">Active Deals</h1>
            </header>
            <DealsFilter
              filterButtons={filterButtons}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
            <DealsList deals={filteredDeals} onViewDeal={handleViewDeal} />
            <div className="py-4 mt-auto">
              <Button className="w-full bg-primary rounded-xl text-white flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Chat with Supplier
              </Button>
            </div>
          </div>
          <BottomNav />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Deals;
