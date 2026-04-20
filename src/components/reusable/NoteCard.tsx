import { Download, View, Loader2 } from "lucide-react";
import { FaFilePdf } from "react-icons/fa6";
import React, { useState } from "react";
import { Button } from "../ui/button";

interface NoteCardProps {
  tag: string;
  title: string;
  description: string;
  chapter: number | string;
  pages: number | string;
  downloads?: number | string;
  pdfUrl: string;
  pdfId: string;
  showDownload?: boolean;
  onViewNotes?: () => void;
  onDownload?: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  tag,
  title,
  description,
  // chapter,
  // pages,
  downloads,
  pdfUrl,
  showDownload = true,
  onViewNotes,
  onDownload,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleViewClick = () => {
    if (onViewNotes) {
      onViewNotes();
    } else if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  const handleDownloadClick = async () => {
    if (onDownload) {
      onDownload();
      return;
    }

    if (!pdfUrl) return;

    // Detect file extension
    const extension = pdfUrl.split(".").pop()?.toLowerCase() || "pdf";
    const fileName = `${title.replace(/\s+/g, "_")}.${extension}`;

    try {
      setIsDownloading(true);
      // Try fetching as blob (works if CORS is allowed)
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Blob download failed, falling back to direct link:",
        error
      );

      // Fallback: Use Cloudinary's attachment flag or direct link
      // For cross-origin, the 'download' attribute is often ignored,
      // but fl_attachment on Cloudinary forces the header on their side.
      const downloadUrl = pdfUrl.includes("cloudinary.com")
        ? pdfUrl.replace("/upload/", "/upload/fl_attachment/")
        : pdfUrl;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      link.target = "_self"; // Same tab to avoid blank page
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between p-5 bg-emerald-50 border border-emerald-300 rounded-2xl">
      {/* Tag + PDF Icon */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-yellow-800 font-medium bg-yellow-100 border border-yellow-300 px-3 py-2 rounded-full">
            {tag}
          </p>
          <FaFilePdf className="text-[var(--color-blue-btn-1)] w-6 h-6" />
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-base text-slate-700 mt-2 mb-9">{description.slice(0, 200).concat("...")}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-14">
          {/* <div>
          <h3 className="text-base font-medium">Chapter</h3>
          <p className="text-base mt-1">{chapter}</p>
        </div> */}
          {/* <div>
            <h3 className="text-base font-medium">Pages</h3>
            <p className="text-base mt-1">{pages}</p>
          </div> */}
          {showDownload && (
            <div>
              <h3 className="text-base font-medium">Downloads</h3>
              <p className="text-base mt-1">{downloads}</p>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid md:grid-cols-2 mt-8 gap-4">
        <Button
          onClick={handleViewClick}
          className="bg-yellow-900 hover:bg-yellow-800 text-white rounded-[6px] cursor-pointer py-2 h-auto flex items-center justify-center gap-2"
        >
          <View className="w-5 h-5" /> View Notes
        </Button>

        {showDownload && (
          <Button
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className="bg-emerald-900 hover:bg-emerald-800 text-white rounded-[6px] cursor-pointer py-2 h-auto flex items-center justify-center gap-2"
          >
            {isDownloading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
