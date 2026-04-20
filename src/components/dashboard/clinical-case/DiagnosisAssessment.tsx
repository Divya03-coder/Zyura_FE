// import { Question } from "../types/case";

import { BookOpen, CircleCheckBig, CircleX, Lightbulb } from "lucide-react";
import { Question } from "./type/case";

type Props = {
  question: Question;
  selectedOptionId: string;
};

const DiagnosisAssessment: React.FC<Props> = ({
  question,
  selectedOptionId,
}) => {
  const isCorrect = selectedOptionId === question.correctOptionId;
  const selectedOption = question.options.find(
    (opt) => opt.id === selectedOptionId
  );
  const correctOption = question.options.find(
    (opt) => opt.id === question.correctOptionId
  );

  return (
    <div>
      <div className="p-6 bg-white rounded-xl shadow border border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-3 text-lg font-semibold">
            {isCorrect ? (
              <CircleCheckBig className="text-green-500" />
            ) : (
              <CircleX className="text-red-500" />
            )}{" "}
            Diagnosis Assessment
          </h3>
          <p
            className={`mt-2 font-semibold ${
              isCorrect
                ? "bg-green-600 text-white px-2.5 py-1 rounded-full"
                : "bg-red-600 text-white px-2.5 py-1 rounded-full"
            }`}
          >
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm">Your Diagnosis: </p>
              <p className="text-gray-700 text-sm font-medium">
                {selectedOption?.text}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-sm">Correct Diagnosis: </p>
              <p className="text-green-500 text-sm font-medium">
                {correctOption?.text}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 bg-yellow-50 p-3 rounded-[8px] my-3">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <p className="max-w-2xl text-sm">
            Don't worry! Diagnostic reasoning is a skill that improves with
            practice. Review the explanation below to understand the key
            clinical clues.
          </p>
        </div>
      </div>

      {/* Detailed Explanation */}
      <div className="p-6 bg-white rounded-xl shadow border border-gray-300 mt-10">
        <h4 className="flex items-center gap-2 font-medium mb-2">
          <BookOpen /> Detailed Explanation
        </h4>
        <div className=" bg-slate-100 p-3 rounded-[8px] my-3">
          <p className="max-w-3xl text-sm text-gray-700">
            {question.explanation}
          </p>
        </div>

        <div>
          <p>Key Learning Points:</p>
          <div className="ml-1">
            <p>
              • Sudden onset neurological symptoms require immediate stroke
              workup
            </p>
            <p> • CT head is first-line imaging for acute stroke evaluation</p>
            <p>
              • Time is brain - early recognition and intervention are crucial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisAssessment;
