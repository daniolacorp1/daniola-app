import { MainHeader } from "@/components/MainHeader";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon } from "lucide-react";

const SavedListings = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <main className="p-4 mx-auto space-y-4 pt-16 max-w-7xl">
        <Card className="bg-white/50 backdrop-blur-sm border-primary/10 mx-auto max-w-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <h3 className="font-medium mb-1">Organization Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Use tags to organize your saved listings for easier access
                </p>
              </div>
              <BookmarkIcon className="h-6 w-6 text-primary hidden sm:block" />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2 flex-wrap justify-center sm:justify-start max-w-lg mx-auto">
          <Badge variant="secondary" className="text-sm py-1 px-3">High Priority</Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3">Verified</Badge>
          <Badge variant="secondary" className="text-sm py-1 px-3">Following</Badge>
        </div>

        <div className="text-center text-muted-foreground pt-8 max-w-lg mx-auto">
          <BookmarkIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-lg">Your saved listings will appear here</p>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default SavedListings;