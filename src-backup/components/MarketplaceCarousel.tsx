import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const highlights = [
  { 
    title: "New Lithium Listings", 
    count: 10, 
    trend: "up",
    filter: "lithium",
    description: "Latest lithium opportunities",
    change: "+15%",
    volume: "500 tons"
  },
  { 
    title: "Copper Opportunities", 
    count: 5, 
    trend: "down",
    filter: "copper",
    description: "Recent copper listings",
    change: "-8%",
    volume: "1,200 tons"
  },
  { 
    title: "Rare Earth Metals", 
    count: 8, 
    trend: "up",
    filter: "rare-earth",
    description: "Exclusive rare earth metals",
    change: "+12%",
    volume: "300 tons"
  },
];

export const MarketplaceCarousel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCardClick = (filter: string, title: string) => {
    toast({
      title: "Filtering marketplace",
      description: `Showing ${title.toLowerCase()}`,
    });
    navigate(`/marketplace?filter=${filter}`);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Marketplace Highlights</h2>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {highlights.map((item) => (
          <Card 
            key={item.title} 
            className="flex-shrink-0 w-72 p-4 bg-card border-border cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleCardClick(item.filter, item.title)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-foreground">{item.title}</h3>
              {item.trend === "up" ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </div>
            <p className="text-2xl font-bold mt-2 text-primary">{item.count}</p>
            <p className="text-sm text-muted-foreground mt-1">New listings today</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Change (24h)</span>
                <span className={`text-sm font-medium ${
                  item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Volume</span>
                <span className="text-sm font-medium">{item.volume}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 border-t pt-2">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};