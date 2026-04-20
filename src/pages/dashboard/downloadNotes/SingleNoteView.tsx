import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  useGetSingleNoteByIdQuery,
  useIncrementNoteDownloadCountMutation,
} from "@/store/features/note/NoteAPI";
import { useSaveStudyPlanProgressMutation } from "@/store/features/studyPlan/studyPlan.api";
// import { toast } from "sonner"; // If not installed, I might need to check, but assumed available based on other files.
import { useState, useEffect } from "react";
import NoteCard from "@/components/reusable/NoteCard";

// Utility function to get PDF page count
const getPdfPageCount = async (url: string): Promise<number> => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const text = new TextDecoder("latin1").decode(uint8Array);

    const countMatch = text.match(/\/Type\s*\/Pages[^]*?\/Count\s+(\d+)/);
    if (countMatch) {
      return parseInt(countMatch[1], 10);
    }

    const pageMatches = text.match(/\/Type\s*\/Page[^s]/g);
    if (pageMatches) {
      return pageMatches.length;
    }

    return 0;
  } catch (error) {
    console.error("Error counting PDF pages:", error);
    return 0;
  }
};

export default function SingleNoteView() {
  const { id } = useParams();
  const {
    data: noteResponse,
    isLoading,
    error,
  } = useGetSingleNoteByIdQuery(id);
  const [incrementDownloadCount] = useIncrementNoteDownloadCountMutation();
  const [saveStudyPlanProgress] = useSaveStudyPlanProgressMutation();
  const [pageCount, setPageCount] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  const note = noteResponse?.data;

  // Load PDF page count when note loads
  useEffect(() => {
    if (note?.notes?.[0]?.fileUrl) {
      getPdfPageCount(note.notes[0].fileUrl).then(setPageCount);
    }
  }, [note]);

  // Open PDF in new tab
  const handleViewPdf = async () => {
    if (note?.notes?.[0]?.fileUrl) {
      // Check if we came from WeeklyPlan or Home and update study plan progress
      if (
        (location.state?.from === "weekly-plan" ||
          location.state?.from === "home") &&
        location.state?.planId
      ) {
        try {
          await saveStudyPlanProgress({
            planId: location.state.planId,
            day: location.state.day,
            suggest_content: location.state.suggest_content,
          }).unwrap();
          // toast.success("Study plan progress saved!");
        } catch (error) {
          console.error("Failed to save study plan progress:", error);
        }
      }
      window.open(note.notes[0].fileUrl, "_blank");
    }
  };

  // Download PDF file to device
  const handleDownloadPdf = async () => {
    if (!note?.notes?.[0]) return;

    try {
      // Increment download count via API
      await incrementDownloadCount(note._id).unwrap();

      // Check if we came from WeeklyPlan or Home and update study plan progress
      if (
        (location.state?.from === "weekly-plan" ||
          location.state?.from === "home") &&
        location.state?.planId
      ) {
        try {
          await saveStudyPlanProgress({
            planId: location.state.planId,
            day: location.state.day,
            suggest_content: location.state.suggest_content,
          }).unwrap();
          // toast.success("Study plan progress saved!");
        } catch (error) {
          console.error("Failed to save study plan progress:", error);
        }
      }

      // Convert Cloudinary URL to download URL
      const downloadUrl = note.notes[0].fileUrl.replace(
        "/upload/",
        "/upload/fl_attachment/"
      );

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = note.notes[0].fileName || "note.pdf";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);

      // Fallback: If API call fails, still try to download
      const downloadUrl = note.notes[0].fileUrl.replace(
        "/upload/",
        "/upload/fl_attachment/"
      );
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = note.notes[0].fileName || "note.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="p-10 text-center text-gray-500">
        <h3 className="text-xl font-semibold">Note not found</h3>
        <p>The requested note could not be retrieved.</p>
        <Link
          to="/dashboard/download-notes"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mb-3">
      <div className="flex items-center gap-3 mb-8 mt-4">
        <div
          onClick={() => {
            if (
              location.state?.from === "weekly-plan" ||
              location.state?.from === "home"
            ) {
              navigate(-1);
            } else {
              navigate("/dashboard/download-notes");
            }
          }}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">
            {note.title || "Note"}
          </h1>
          <p className="text-slate-500 text-sm">
            High-Yield Medical Study Note
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <NoteCard
          tag={note.subject}
          title={note.title}
          description={note.description}
          chapter="—"
          pages={pageCount || "—"}
          downloads={note.downloadCount || 0}
          pdfUrl={note.notes[0].fileUrl}
          pdfId={note.notes[0].fileId}
          onViewNotes={handleViewPdf}
          onDownload={handleDownloadPdf}
        />
      </div>
    </div>
  );
}
