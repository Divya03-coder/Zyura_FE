import { MCQQuestion } from "@/components/Test";
import { CheckCircle, Circle, CircleAlert } from "lucide-react";
import React from "react";

interface MCQCardProps {
  question: MCQQuestion;
  questionNumber: number;
  totalQuestions: number;
  subtopic: string;
  isRead: boolean;
  selectedIndex: number | undefined;
  showAnswer: boolean;
  onSelectAnswer: (optionIndex: number) => void;
  onToggleAnswer: () => void;
  onReport: () => void;
}

const MCQCard: React.FC<MCQCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  subtopic,
  isRead,
  selectedIndex,
  showAnswer,
  onSelectAnswer,
  onToggleAnswer,
  onReport,
}) => {
  const getOptionStyles = (optionIndex: number, isCorrect: boolean) => {
    const isSelected = selectedIndex === optionIndex;

    if (showAnswer) {
      if (isSelected && isCorrect) return "border-green-500 bg-green-50 text-green-700 font-medium";
      if (isSelected && !isCorrect) return "border-red-500 bg-red-50 text-red-700 font-medium";
      if (!isSelected && isCorrect) return "border-green-500 bg-green-50 text-green-700 font-medium";
    }

    if (isSelected) return "border-blue-500 bg-blue-50";

    return "border-slate-200";
  };

  return (
    <div className="border border-slate-300 rounded-lg p-5 space-y-4 bg-white">
      {/* Top Info Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">

          {isRead ? (
            <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
          ) : (
            <Circle size={20} className="text-orange-500 flex-shrink-0" />
          )}

          <p className="text-slate-700 text-sm font-normal">
            Question {questionNumber} of {totalQuestions}
          </p>

          <span className="bg-orange-500 text-xs font-normal px-3 py-1 text-white rounded-full">
            {subtopic ?? "N/A"}
          </span>

          <span className="text-xs font-normal px-3 py-1 bg-white rounded-full border border-slate-200">
            {question?.difficulty ?? "Unknown"}
          </span>
        </div>

        <button
          className="flex items-center gap-1.5 text-red-500 hover:text-red-700 self-start sm:self-center"
          onClick={onReport}
        >
          <p className="text-sm font-semibold">Report</p>
          <CircleAlert size={20} />
        </button>
      </div>

      {/* Question */}
      <p className="text-slate-900 font-medium">{question?.question ?? "No question available"}</p>

      {/* Options */}
      <div className="space-y-2">
        {question?.options?.map((opt, optionIdx) => {
          if (!opt) return null; // safety check

          const isCorrect = opt?.option === question?.correctOption;
          const styleClasses = getOptionStyles(optionIdx, isCorrect);

          return (
            <label
              key={optionIdx}
              className={`block p-3 border rounded cursor-pointer transition-colors ${styleClasses}`}
            >
              <input
                type="radio"
                name={`question-${question?.mcqId ?? "unknown"}`}
                className="mr-2"
                onChange={() => onSelectAnswer(optionIdx)}
                checked={selectedIndex === optionIdx}
                disabled={showAnswer}
              />
              <span>
                {opt?.option ?? ""}. {opt?.optionText ?? ""}
              </span>
            </label>
          );
        })}
      </div>

      {/* Show Answer Button */}
      {selectedIndex !== undefined && (
        <button
          onClick={onToggleAnswer}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      )}

      {/* Explanation Section */}
      {showAnswer && (
        <div className="mt-4 p-4 bg-slate-100 rounded-lg">
          <h4 className="text-lg font-medium mb-2">Explanation</h4>

          {question?.options?.map((option, idx) => {
            if (!option) return null;

            const isOptionCorrect = option?.option === question?.correctOption;

            return (
              <div key={idx} className="mb-3">
                <p
                  className={`font-medium ${
                    isOptionCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isOptionCorrect ? "[Correct - Choice " : "[Choice "}
                  {option?.option ?? "?"}]
                </p>
                <p className="text-gray-800">{option?.explanation ?? "No explanation provided."}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MCQCard;
