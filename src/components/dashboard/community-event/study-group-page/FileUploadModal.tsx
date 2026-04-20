/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/reusable/FileUploader";
import { useState } from "react";

export function FileUploadModal({ open, setOpen }: any) {
  const [files, setFiles] = useState<File[]>([]);
  const handleSubmit = () => {
    setOpen(false);
  };
  console.log(files);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Media Upload</DialogTitle>
          <DialogDescription>
            Add your documents here, and you can upload up to 5 files max
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <FileUploader
            // onFilesChange={(newFiles) => setFiles(newFiles)}
            onFilesChange={(newFiles) => setFiles([...files, ...newFiles])}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-main text-white cursor-pointer"
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
