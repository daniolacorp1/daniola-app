import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

<<<<<<< HEAD
interface DealsFilterProps {
  filterButtons: string[];
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

export const DealsFilter: React.FC<DealsFilterProps> = ({ 
  filterButtons, 
  onFilterChange, 
  activeFilter 
}) => {
  // Note: You're not using filterButtons prop but using statusOptions instead
  // Either remove filterButtons from props or use it instead of statusOptions
=======
// src/components/deals/DealsFilter.tsx
interface DealsFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const DealsFilter = ({
  activeFilter,
  onFilterChange,
}: DealsFilterProps) => {
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
  const statusOptions = ["All", "In Progress", "Ready for Review"];

  return (
    <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
      {statusOptions.map((option) => (
        <Button
          key={option}
          variant="ghost"
<<<<<<< HEAD
          className={`
            rounded-xl gap-0 flex items-center justify-center h-8 flex-shrink-0 
            self-start border-none px-5 py-1 mb-4 font-medium
            ${activeFilter === option ? "bg-primary text-white" : "bg-[#F2E2E2]"}
          `}
          onClick={() => onFilterChange(option)}
        >
          {option}
          <ChevronDown className="h-4 w-4" />
=======
          className={`  
              rounded-xl gap-0 flex items-center justify-center h-8 flex-shrink-0 self-start border-none  px-5 py-1 mb-4
              font-medium ${
               activeFilter === option
                 ? "bg-primary text-white"
                 : "bg-[#F2E2E2]"
             }`}
          onClick={() => onFilterChange(option)}
        >
          {option} <ChevronDown className="h-4 w-4" />
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
        </Button>
      ))}
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
