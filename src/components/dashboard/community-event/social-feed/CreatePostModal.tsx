import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type CreatePostModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreatePostModal = ({ open, onOpenChange }: CreatePostModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input placeholder="Post Title" />
          <Textarea placeholder="What's on your mind?" rows={4} />
          <Input type="file" />
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
