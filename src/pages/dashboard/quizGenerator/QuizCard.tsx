import { Play, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizCardProps {
  id: string;
  title: string;
  questionCount?: number;
  sourceFile?: string;
  isCompleted?: boolean;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export default function QuizCard({
  id,
  title,
  questionCount,
  sourceFile,
  isCompleted,
  onDelete,
  isDeleting,
}: QuizCardProps) {
  const navigate = useNavigate();

  const handleQuiz = (id: string) => {
    if (isCompleted) {
      navigate(`/dashboard/quiz-analysis/${id}`, {
        state: { activeTab: "myQuiz" },
      });
    } else {
      navigate(`/dashboard/quiz/${id}`);
    }
  };

  return (
    <div>
      <div className="p-5 bg-lime-50 border border-lime-200 rounded-[12px] h-full flex flex-col justify-between">
        <div className="mb-10 flex justify-between items-start gap-2">
          <div>
            <div className="flex items-start gap-2">
              {/* <BrainCircuit className="text-zinc-950 shrink-0 mt-1" size={20} /> */}
              <h3 className="text-[#0A0A0A] font-semibold leading-tight">
                {title || "Untitled Quiz"}
              </h3>
            </div>
            {(questionCount !== undefined || sourceFile) && (
              <p className="text-sm text-slate-500 mt-3">
                {questionCount !== undefined && `${questionCount} questions`}
                {questionCount !== undefined && sourceFile && " • "}
                {sourceFile && `From ${sourceFile}`}
              </p>
            )}
          </div>
          {onDelete && (
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
          onClick={() => handleQuiz(id)}
          className={`w-full rounded-[4px] py-3 flex justify-center gap-1 items-center transition-colors text-white cursor-pointer mt-auto ${isCompleted
            ? "bg-emerald-800 hover:bg-emerald-800"
            : "bg-lime-600 hover:bg-lime-700"
            }`}
        >
          {isCompleted ? (
            <>View Analysis</>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Start Quiz
            </>
          )}
        </button>
      </div>
    </div>
  );
}
