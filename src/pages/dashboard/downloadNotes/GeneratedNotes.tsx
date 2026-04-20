import Pagination from "@/common/custom/Pagination";
import GeneratedNoteCard from "@/components/reusable/GeneratedNoteCard";
import { useGetAllGeneratedNotesQuery } from "@/store/features/note/NoteAPI";
import { useDeleteMyContentMutation } from "@/store/features/content/content.api";
import { Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GeneratedNotesProps {
  searchTerm?: string;
  subject?: string;
  system?: string;
  topic?: string;
}

export default function GeneratedNotes({
  searchTerm,
  subject,
  system,
  topic,
}: GeneratedNotesProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: notesResponse, isLoading } = useGetAllGeneratedNotesQuery({
    page,
    limit,
    searchTerm,
    subject,
    system,
    topic,
  });

  const [deleteContent, { isLoading: isDeleting }] =
    useDeleteMyContentMutation();

  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const notes = notesResponse?.data || [];
  const meta = notesResponse?.meta;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return;
    try {
      await deleteContent({ id: noteToDelete, key: "notes" }).unwrap();
      setNoteToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No generated notes found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {notes.map((note: any) => (
            <GeneratedNoteCard
              key={note._id}
              title={note.title || "Untitled Note"}
              description={
                note.note
                  ? note.note.substring(0, 300) + "..."
                  : "No content available"
              }
              date={new Date(note.createdAt).toLocaleDateString()}
              onViewNodes={() =>
                navigate(`/dashboard/generated-notes/${note._id}`)
              }
              onDelete={() => setNoteToDelete(note._id)}
              isDeleting={isDeleting && noteToDelete === note._id}
            />
          ))}
        </div>

        {meta && meta.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!noteToDelete}
        onOpenChange={(open) => !open && setNoteToDelete(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertCircle className="w-6 h-6" />
              <DialogTitle>Delete Note</DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to delete this study note? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setNoteToDelete(null)}
              disabled={isDeleting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="cursor-pointer flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Note"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
