// src/components/deals/AcceptDealDialog.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// src/components/deals/AcceptDealDialog.tsx
interface AcceptDealDialogProps {
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  dealTitle: string;
  dealAmount: number;
}
export const AcceptDealDialog: React.FC<AcceptDealDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept Deal</DialogTitle>
          <DialogDescription>
            Are you sure you want to accept this deal? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};