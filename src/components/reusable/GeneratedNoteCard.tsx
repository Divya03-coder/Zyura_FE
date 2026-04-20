import { Trash2, View, Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";

interface GeneratedNoteCardProps {
  title: string;
  description: string;
  date: string;
  onViewNodes: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

const GeneratedNoteCard: React.FC<GeneratedNoteCardProps> = ({
  title,
  description,
  date,
  onViewNodes,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <div className="flex flex-col justify-between p-6 border border-violet-300 rounded-2xl bg-violet-50 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-3">
          <p className="text-xs text-blue-700 font-medium bg-blue-50 px-3 py-1.5 rounded-full">
            Generated • {date}
          </p>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Title */}
        <div className="text-xl font-bold text-slate-900 line-clamp-2 mb-3 prose prose-sm max-w-none">
          <ReactMarkdown>{title}</ReactMarkdown>
        </div>

        {/* Description */}
        <div className="text-sm text-slate-600 line-clamp-4 mb-6 prose prose-sm prose-slate max-w-none">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>

      {/* View Button */}
      <div className="mt-auto">
        <Button
          onClick={onViewNodes}
          className="w-full bg-violet-700 hover:bg-violet-800 text-white rounded-lg cursor-pointer py-2.5 h-auto flex items-center justify-center gap-2 font-medium"
        >
          <View className="w-5 h-5" /> View Notes
        </Button>
      </div>
    </div>
  );
};

export default GeneratedNoteCard;
