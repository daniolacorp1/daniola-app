import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DealFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t">
      <div className="max-w-lg mx-auto">
        <Button 
          className="w-full bg-primary hover:bg-secondary transition-colors duration-300 py-6 flex items-center justify-center gap-2"
          onClick={() => window.location.href = '/chat'}
        >
          <MessageCircle className="h-5 w-5" />
          Chat with Supplier
        </Button>
      </div>
    </footer>
  );
};