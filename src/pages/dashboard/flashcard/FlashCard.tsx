import { IFlashcardBank } from "@/types";
import { Play, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FlashCard({
  source,
  onDelete,
  isDeleting,
  ...flashcard
}: IFlashcardBank & {
  source?: "all" | "generated";
  onDelete?: () => void;
  isDeleting?: boolean;
}) {
  const navigate = useNavigate();
  const handleQuiz = (id: string) => {
    navigate(`/dashboard/solve-flash-card/${id}`, {
      state: { source: source, totalFlashCards: flashcard?.totalFlashCards },
    });
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-orange-50 border border-orange-200 rounded-[12px] h-full">
      <div className="mb-10 flex justify-between items-start gap-2">
        <div>
          <div className="flex items-center gap-1">
            {/* <BrainCircuit className="text-zinc-950" /> */}
            <h3 className="text-[#0A0A0A] font-medium leading-tight">
              {flashcard?.title}{" "}
              {flashcard?.subject && `- ${flashcard?.subject}`}
            </h3>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            {flashcard?.totalFlashCards} flashcard{" "}
            {flashcard?.topic && `• ${flashcard?.topic}`}
          </p>
          {flashcard?.isComplete && (
            <p className="mt-2 inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
              Completed
            </p>
          )}
        </div>
        {source === "generated" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      <button
        onClick={() => handleQuiz(flashcard?._id)}
        className={`w-full rounded-[4px] py-3 flex justify-center gap-1 items-center text-white cursor-pointer mt-auto ${flashcard?.isComplete ? "bg-green-800 hover:bg-green-900" : "bg-orange-800/90 hover:bg-orange-900/80"}`}
      >
        <Play className="w-4 h-4" /> View Card
      </button>
    </div>
  );
}
