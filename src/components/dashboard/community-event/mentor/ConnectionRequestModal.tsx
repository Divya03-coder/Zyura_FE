// components/connection-request-modal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConnectionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConnectionRequestModal({
  isOpen,
  onClose,
  onConfirm,
}: ConnectionRequestModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-100 p-2">
              <AlertTriangle className="h-5 w-5 text-blue-main" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              Your connection request is Ready to send!
            </DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-base">
            This action cannot be undone. Are you sure to send connection
            request to the mentors?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-6 bg-blue-main hover:bg-blue-700 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
