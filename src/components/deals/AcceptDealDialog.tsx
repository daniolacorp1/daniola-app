import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AcceptDealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  dealTitle: string;
  dealAmount: string;
}

export function AcceptDealDialog({
  isOpen,
  onClose,
  onConfirm,
  dealTitle,
  dealAmount,
}: AcceptDealDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept Deal</DialogTitle>
          <DialogDescription>
            Are you sure you want to accept this deal?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">Deal: {dealTitle}</p>
          <p className="text-sm text-gray-500">Amount: {dealAmount}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}