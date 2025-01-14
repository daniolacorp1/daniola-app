import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DealHeaderProps {
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}

export const DealHeader = ({ onFilterChange, currentFilter }: DealHeaderProps) => {
  const navigate = useNavigate();
  const filters = [
    { label: "Active Deals", value: "active" },
    { label: "Closed Deals", value: "closed" },
    { label: "Pending Deals", value: "pending" },
  ];

  const navigationItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Deals", path: "/deals" },
    { label: "Active Deals", path: "/deals" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Saved History", path: "/saved-listings" },
  ];

  return (
    <header className="px-6 py-6 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Active Deals</h1>
      </div>
      
      <div className="flex gap-4 mt-4 overflow-x-auto scrollbar-hide pb-2">
        {filters.map((filter) => (
          <DropdownMenu key={filter.value}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={currentFilter === filter.value ? "default" : "outline"}
                className={`px-6 py-2 text-sm rounded-full flex items-center whitespace-nowrap
                  ${currentFilter === filter.value 
                    ? 'bg-primary text-white hover:bg-secondary' 
                    : 'bg-white hover:bg-gray-50'
                  }`}
              >
                {filter.label} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={() => onFilterChange(filter.value)}
                className="cursor-pointer"
              >
                Show {filter.label}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </header>
  );
};