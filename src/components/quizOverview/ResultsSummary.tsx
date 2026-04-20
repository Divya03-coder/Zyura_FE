import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface ResultsSummaryProps {
  completed: number;
  total: number;
  correct: number;
  incorrect: number;
  quizId?: string;
  justSubmitted?: boolean;
  isExamMode?: boolean;
}


const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  completed = 0,
  total = 0,
  correct = 0,
  incorrect = 0,
  quizId,
  justSubmitted,
  isExamMode,
}) => {

  const correctPercentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  // console.log(quizId);
  return (
    <div className="text-center mt-4">
      <p className="text-lg">
        You completed {completed}/{total} questions. You answered:
      </p>
      <div className="mt-4 flex flex-col items-center space-y-2">
        <span className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-green-500 mr-2"></div>
          <span className="font-medium text-green-700">
            {correctPercentage}% correctly ({correct} questions)
          </span>
        </span>
        <span className="flex items-center">
          <div className="w-4 h-4 rounded-sm bg-gray-300 mr-2"></div>
          <span className="font-medium text-gray-500">
            {100 - correctPercentage}% incorrectly ({incorrect} questions)
          </span>
        </span>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        {/* <Link to={`/dashboard/quiz/${quizId}`}>
          <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-6 cursor-pointer">
            Repeat Session
          </Button>
        </Link> */}
        <Link
          to={`/dashboard/quiz/${quizId}?mode=review&limit=${total}${isExamMode ? "&source=exam" : ""}`}
          state={{ justSubmitted }}
        >

          <Button
            variant="outline"
            className="h-11 px-6 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
          >
            Review Session
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ResultsSummary;
