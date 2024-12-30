import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface DealsTabsProps {
  children: React.ReactNode;
  defaultValue?: string;
}

export const DealsTabs: FC<DealsTabsProps> = ({ children, defaultValue = "active" }) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <div className="relative px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="bg-transparent flex gap-3 w-max">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="rounded-full px-6 py-2 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
                >
                  All <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <TabsTrigger 
                    value="active"
                    className="w-full text-left px-2 py-1.5 rounded-none"
                  >
                    All Deals
                  </TabsTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TabsTrigger 
                    value="closed"
                    className="w-full text-left px-2 py-1.5 rounded-none"
                  >
                    In Progress
                  </TabsTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TabsTrigger 
                    value="pending"
                    className="w-full text-left px-2 py-1.5 rounded-none"
                  >
                    Ready for Review
                  </TabsTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsList>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>
      {children}
    </Tabs>
  );
};