import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BottomNav } from "@/components/BottomNav";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { SearchFilters } from "@/components/marketplace/SearchFilters";
import { ListingDetails } from "@/components/marketplace/ListingDetails";
import { commodities } from "@/data/commodities";
import { Commodity } from "@/types/marketplace";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MainHeader } from "@/components/MainHeader";
<<<<<<< HEAD
import React, { Component } from 'react';
=======
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedListing, setSelectedListing] = useState<Commodity | null>(
    null
  );
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredCommodities = commodities.filter((commodity) => {
<<<<<<< HEAD
    // Safely handle potentially undefined values using nullish coalescing
    const commodityName = commodity.name?.toLowerCase() ?? '';
    const commodityLocation = commodity.location?.toLowerCase() ?? '';
    const supplierName = commodity.supplier?.name?.toLowerCase() ?? '';
    const searchQueryLower = searchQuery.toLowerCase();
  
    const matchesSearch = 
      commodityName.includes(searchQueryLower) ||
      commodityLocation.includes(searchQueryLower) ||
      supplierName.includes(searchQueryLower);
  
    const matchesFilter = 
      selectedFilter === "All" || 
      commodityName.includes(selectedFilter.toLowerCase());
  
=======
    const matchesSearch =
      commodity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commodity.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commodity.supplier.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" || commodity.name.includes(selectedFilter);

>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (commodity: Commodity) => {
    setSelectedListing(commodity);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* <MainHeader /> */}
      <div className="top-[60px] bg-background z-20">
        <div className="flex justify-between items-start py-4">
          <h1 className="text-2xl font-bold text-foreground">Commodities</h1>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate("/saved")}
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              0
            </span>
          </Button>
        </div>
        <div className="pb-4 bg-background">
          <SearchFilters
            searchQuery={searchQuery}
            selectedFilter={selectedFilter}
            onSearchChange={setSearchQuery}
            onFilterChange={setSelectedFilter}
          />
        </div>
      </div>

      <div className="space-y-4 py-2">
        {filteredCommodities.map((commodity) => (
          <ListingCard
            key={commodity.id}
            commodity={commodity}
            onViewDetails={handleViewDetails}
            onSave={() => {}}
          />
        ))}
      </div>

      <ListingDetails
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        onSave={() => {}}
        onCreateDeal={() => {}}
        onContactSupplier={() => {}}
      />
      <BottomNav />
    </div>
  );
};

export default Marketplace;
<<<<<<< HEAD

interface MyComponentProps {
  initialCount: number;
}

interface MyComponentState {
  count: number;
}

class MyComponent extends Component<MyComponentProps, MyComponentState> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      count: props.initialCount,
    };
  }

  componentDidMount() {
    console.log('Component did mount');
  }

  componentDidUpdate(prevProps: MyComponentProps, prevState: MyComponentState) {
    if (prevState.count !== this.state.count) {
      console.log('Count updated');
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  handleIncrement = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleIncrement}>Increment</button>
      </div>
    );
  }
}

export { MyComponent };
=======
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
