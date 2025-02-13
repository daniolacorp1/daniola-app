import React from 'react';
import { Button } from "@/components/ui/button";

// src/components/deals/DealsFilter.tsx
interface DealsFilterProps {
  filterButtons: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const DealsFilter: React.FC<DealsFilterProps> = ({
  filterButtons,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex gap-2 p-4">
      <Button
        variant={activeFilter === "All" ? "default" : "outline"}
        onClick={() => onFilterChange("All")}
      >
        All
      </Button>
      {filterButtons.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "default" : "outline"}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};
