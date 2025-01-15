import { type FC, type ReactElement } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const DealsTabs: FC = (): ReactElement => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="all" className="text-zinc-700">
            <Button
              className="text-sm font-medium"
              variant="ghost"
            >
              All Deals
              <div className="ml-2 rounded-sm bg-zinc-100 px-2 py-0.5 text-xs">
                100
              </div>
            </Button>
          </TabsTrigger>
          
          <TabsTrigger value="active" className="text-zinc-700">
            <Button
              className="text-sm font-medium"
              variant="ghost"
            >
              Active
              <div className="ml-2 rounded-sm bg-zinc-100 px-2 py-0.5 text-xs">
                12
              </div>
            </Button>
          </TabsTrigger>
          
          <TabsTrigger value="closed" className="text-zinc-700">
            <Button
              className="text-sm font-medium"
              variant="ghost"
            >
              Closed
              <div className="ml-2 rounded-sm bg-zinc-100 px-2 py-0.5 text-xs">
                88
              </div>
            </Button>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
};

export default DealsTabs;