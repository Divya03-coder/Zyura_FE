/* eslint-disable @typescript-eslint/no-explicit-any */
import GlobalLoader2 from "@/common/GlobalLoader2";
import NoteCard from "@/components/reusable/NoteCard";
import { useIncrementNoteDownloadCountMutation } from "@/store/features/note/NoteAPI";
// import { useIncrementNoteDownloadCountMutation } from "@/store/features/note/NoteAPI";
import { useState, useEffect } from "react";

// Utility function to get PDF page count
const getPdfPageCount = async (url: string): Promise<number> => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert to string to search for page count
    const text = new TextDecoder("latin1").decode(uint8Array);

    // Method 1: Look for /Type /Pages with /Count
    const countMatch = text.match(/\/Type\s*\/Pages[^]*?\/Count\s+(\d+)/);
    if (countMatch) {
      return parseInt(countMatch[1], 10);
    }

    // Method 2: Count /Page occurrences (less reliable)
    const pageMatches = text.match(/\/Type\s*\/Page[^s]/g);
    if (pageMatches) {
      return pageMatches.length;
    }

    return 0; // Unable to determine
  } catch (error) {
    console.error("Error counting PDF pages:", error);
    return 0;
  }
};

export default function AllNotesTab({ notes, loading }: any) {
  const [incrementDownloadCount] = useIncrementNoteDownloadCountMutation();
  const [pageCountCache, setPageCountCache] = useState<Record<string, number>>(
    {}
  );

  // Load page counts for all PDFs when notes load
  useEffect(() => {
    if (notes && notes.length > 0) {
      notes.forEach(async (note: any) => {
        if (note.notes[0]?.fileUrl && !pageCountCache[note._id]) {
          const pageCount = await getPdfPageCount(note.notes[0].fileUrl);
          setPageCountCache((prev) => ({
            ...prev,
            [note._id]: pageCount,
          }));
        }
      });
    }
  }, [notes]);

  if (loading) return <GlobalLoader2 />;

  // Open PDF in new tab
  const handleViewPdf = (url: string) => {
    window.open(url, "_blank");
  };

  // Download PDF file to device
  const handleDownloadPdf = async (
    noteId: string,
    fileName: string,
    url: string
  ) => {
    try {
      console.log(noteId)
      // Step 1: Increment download count via API
      await incrementDownloadCount(noteId).unwrap();

      // Step 2: Convert Cloudinary URL to download URL
      // Change '/upload/' to '/upload/fl_attachment/'
      const downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");

      // Step 3: Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName || "note.pdf";
      link.target = "_blank"; // Open in new tab if download fails
      link.rel = "noopener noreferrer";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);

      // Fallback: If API call fails, still try to download
      const downloadUrl = url.replace("/upload/", "/upload/fl_attachment/");
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName || "note.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      {/* Show empty state if no notes */}
      {!notes || notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white shadow rounded-lg">
          <p className="text-xl text-gray-500">No notes found</p>
          <p className="text-sm text-gray-400 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 :grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-4 p-4 bg-white shadow rounded-lg">
          {notes.map((note: any) => (
            <NoteCard
              key={note._id}
              tag={note.subject}
              title={note.title}
              description={note.description}
              chapter="—"
              pages={pageCountCache[note._id] || "—"}
              downloads={note.downloadCount || 0}
              pdfUrl={note.notes[0].fileUrl}
              pdfId={note.notes[0].fileId}
              onViewNotes={() => handleViewPdf(note.notes[0].fileUrl)}
              onDownload={() =>
                handleDownloadPdf(
                  note._id,
                  note.notes[0].fileName,
                  note.notes[0].fileUrl
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
