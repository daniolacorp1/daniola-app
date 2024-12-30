import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AcceptDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dealTitle: string;
  dealAmount: string;
}

export const AcceptDealDialog = ({
  isOpen,
  onClose,
  dealTitle,
  dealAmount,
}: AcceptDealDialogProps) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const { toast } = useToast();

  const handleAccept = async () => {
    setIsAccepting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Deal Accepted",
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>You have successfully accepted the deal: {dealTitle}</span>
        </div>
      ),
    });
    
    setIsAccepting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accept Deal</DialogTitle>
          <DialogDescription>
            You are about to accept the following deal:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">{dealTitle}</h3>
            <p className="text-2xl font-bold text-primary mt-2">{dealAmount}</p>
          </div>
          <div className="flex items-start gap-2 text-sm text-amber-600">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            <p>
              This action cannot be undone. Please review all terms and conditions
              before accepting.
            </p>
          </div>
        </div>
        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAccept} 
            disabled={isAccepting}
            className="min-w-[100px]"
          >
            {isAccepting ? "Accepting..." : "Accept Deal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};