import { useNavigate, useParams } from "react-router-dom";
import { Recommendations } from "./type";
import { BookOpen, Brain, GraduationCap, NotebookText, Sparkles } from "lucide-react";
import PrimaryButton from "../reusable/PrimaryButton";

interface StudyRecommendationsProps {
  recommendations: Recommendations;
  isLoading?: boolean;
}

const StudyRecommendations: React.FC<StudyRecommendationsProps> = ({
  recommendations,
  isLoading,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleStartPractice = (type: string) => {
    switch (type) {
      case "mcq":
        if (recommendations.post_quiz_recommendations) {
          navigate(`/dashboard/daily-challenge-quiz/recommended-${id}`, {
            state: {
              challengeData: {
                title: `Review: ${recommendations.post_quiz_recommendations.weak_area_name}`,
                mcqs: recommendations.post_quiz_recommendations.mcqs,
                subject: recommendations.post_quiz_recommendations.weak_area_name,
                system: recommendations.post_quiz_recommendations.weak_area_level,
                topic: recommendations.post_quiz_recommendations.weak_area_name,
              },
              fromAnalysis: true,
              quizId: id
            }
          });
        }
        break;
      case "flashcard":
        if (recommendations.flashcards) {
          navigate(`/dashboard/solve-flash-card/recommended-${id}`, {
            state: {
              flashCardData: {
                flashCards: recommendations.flashcards.flashcards,
                title: "Recommended Flashcards",
                subject: "AI Generated",
              },
              fromAnalysis: true,
              quizId: id
            }
          });
        }
        break;
      case "clinical_case":
        if (recommendations.clinical_case) {
          navigate(`/dashboard/clinical-case/recommended-${id}`, {
            state: {
              clinicalCaseData: recommendations.clinical_case,
              fromAnalysis: true,
              quizId: id
            }
          });
        }
        break;
      case "notes":
        if (recommendations.notes) {
          navigate(`/dashboard/generated-notes/recommended-${id}`, {
            state: {
              noteData: recommendations.notes,
              fromAnalysis: true,
              quizId: id
            }
          });
        }
        break;
    }
  };

  const hasContent = recommendations && (
    recommendations.post_quiz_recommendations ||
    recommendations.flashcards ||
    recommendations.clinical_case ||
    recommendations.notes
  );

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-6 mt-2">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <p className="text-[#1A1C1C] font-semibold text-lg">
          AI Study Recommendations
        </p>
      </div>

      {isLoading ? (
        <div className="py-10 text-center border rounded-lg bg-gray-50 border-dashed">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 font-inter font-medium">
              Recommendation is generating
            </p>
          </div>
        </div>
      ) : hasContent ? (
        <div className="space-y-4">
          {recommendations.post_quiz_recommendations && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100 group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900">Mock Exam Case</h4>
                  <p className="text-xs text-blue-700">Practice {recommendations.post_quiz_recommendations.mcqs.length} relevant MCQs</p>
                </div>
              </div>
              <PrimaryButton
                onClick={() => handleStartPractice("mcq")}
                className="h-9 px-6 text-sm bg-blue-600 hover:bg-blue-700 shadow-sm"
              >
                Start
              </PrimaryButton>
            </div>
          )}

          {recommendations.clinical_case && (
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100 group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-purple-900">Clinical Case Study</h4>
                  <p className="text-xs text-purple-700">Detailed case analysis</p>
                </div>
              </div>
              <PrimaryButton
                onClick={() => handleStartPractice("clinical_case")}
                className="h-9 px-6 text-sm bg-purple-600 hover:bg-purple-700 shadow-sm"
              >
                Start
              </PrimaryButton>
            </div>
          )}

          {recommendations.flashcards && (
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100 group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900">Review Flashcards</h4>
                  <p className="text-xs text-emerald-700">{recommendations.flashcards.flashcards.length} cards to master</p>
                </div>
              </div>
              <PrimaryButton
                onClick={() => handleStartPractice("flashcard")}
                className="h-9 px-6 text-sm bg-emerald-600 hover:bg-emerald-700 shadow-sm"
              >
                Start
              </PrimaryButton>
            </div>
          )}

          {recommendations.notes && (
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100 group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg text-amber-600 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <NotebookText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-900">Generated Notes</h4>
                  <p className="text-xs text-amber-700">Hand-crafted study guide</p>
                </div>
              </div>
              <PrimaryButton
                onClick={() => handleStartPractice("notes")}
                className="h-9 px-6 text-sm bg-amber-600 hover:bg-amber-700 shadow-sm"
              >
                View
              </PrimaryButton>
            </div>
          )}
        </div>
      ) : (
        <div className="py-10 text-center border rounded-lg bg-gray-50 border-dashed">
          <p className="text-gray-500 font-inter font-medium">
            No recommendation found
          </p>
        </div>
      )}
    </div>
  );
};

export default StudyRecommendations;
