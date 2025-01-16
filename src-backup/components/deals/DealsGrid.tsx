import { TabsContent } from "@/components/ui/tabs";

interface DealsGridProps {
  children: React.ReactNode;
  value: string;
}

export const DealsGrid = ({ children, value }: DealsGridProps) => {
  return (
    <TabsContent value={value} className="p-4 space-y-4">
      {children}
    </TabsContent>
  );
};