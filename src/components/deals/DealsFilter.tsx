// src/components/deals/DealsFilter.tsx
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface DealsFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  filterButtons: string[];
}

export const DealsFilter = ({
  activeFilter,
  onFilterChange,
  filterButtons,
}: DealsFilterProps) => {
  const statusOptions = ["All", ...filterButtons];
  
  return (
    <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
      {statusOptions.map((option) => (
        <Button
          key={option}
          variant="ghost"
          className={`
            rounded-xl gap-0 flex items-center justify-center h-8 flex-shrink-0 self-start border-none px-5 py-1 mb-4
            font-medium ${
              activeFilter === option
                ? "bg-primary text-white"
                : "bg-[#F2E2E2]"
            }`}
          onClick={() => onFilterChange(option)}
        >
          {option} <ChevronDown className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
};