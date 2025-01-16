import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  searchQuery: string;
  selectedFilter: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: string) => void;
}

export const SearchFilters = ({
  searchQuery,
  selectedFilter,
  onSearchChange,
  onFilterChange,
}: SearchFiltersProps) => {
  const filters = [
    "All",
    "Oil",
    "Gold",
    "Silver",
    "Copper",
    "Gas",
    "Lithium",
    "Nickel",
    "Platinum",
    "Palladium",
    "Zinc",
    "Iron Ore",
    "Aluminum",
    "Rare Earths",
    "Uranium",
  ];

  return (
    <div className="w-full space-y-4 scrollbar-hide ">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A14545] h-4 w-4" />
        <Input
          className="w-full pl-9 bg-[#F2E2E2] border-none focus-visible:ring-0 placeholder:text-[#A14545] rounded-xl"
          placeholder="Search"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className=" flex gap-2 overflow-x-auto no-scrollbar  hide-scrollbar">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            className={`rounded-xl px-4 py-1 h-8 flex-shrink-0 ${
              selectedFilter === filter
                ? "bg-primary text-white"
                : "bg-[#F5E5E5] border-none text-foreground hover:bg-[#F2E2E2]/80"
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
};
