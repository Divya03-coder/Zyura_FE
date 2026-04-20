import { useGetGeneratedNoteByIdQuery } from "@/store/features/note/NoteAPI";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function GeneratedNoteDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const stateNoteData = location.state?.noteData;

  const { data: noteResponse, isLoading: isNoteLoading } = useGetGeneratedNoteByIdQuery(id, {
    skip: !!stateNoteData
  });

  // Handle both possible API response structures (array or object)
  const note = stateNoteData || (Array.isArray(noteResponse?.data)
    ? noteResponse.data[0]
    : noteResponse?.data);

  const isLoading = !stateNoteData && isNoteLoading;

  const fromAnalysis = location.state?.fromAnalysis;
  const quizId = location.state?.quizId;

  const handleBack = () => {
    if (fromAnalysis && quizId) {
      navigate(`/dashboard/quiz-analysis/${quizId}`);
    } else {
      navigate("/dashboard/download-notes");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!note) {
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
        <button
          onClick={handleBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">
            {note.title || "Generated Note"}
          </h1>
          <p className="text-slate-500 text-sm">AI Generated Study Content</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[60vh]">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 pb-4 border-b border-slate-100">
          <Calendar className="w-4 h-4" />
          <span>
            Created on{" "}
            {new Date(note.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </span>
          <span className="mx-2">•</span>
          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium">
            Generated
          </span>
        </div>

        <article className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.note}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
