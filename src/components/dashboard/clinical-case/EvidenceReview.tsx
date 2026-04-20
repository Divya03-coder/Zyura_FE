// import { ClinicalCaseData } from "@/types/clinicalCase.types";

import { ClinicalCaseData } from "@/types/clinicalCase";

type Props = {
  clinicalCase: ClinicalCaseData;
  selectedOptionName: string;
};

const EvidenceReview: React.FC<Props> = ({
  clinicalCase,
  selectedOptionName,
}) => {
  const diagnosisQuestion = clinicalCase?.diagnosisQuestion;
  const correctOptionName = clinicalCase?.correctOption?.optionName;

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-300">
      <h3 className="text-2xl font-semibold mb-2">
        Your Differential Diagnosis Table
      </h3>
      <p className="mb-4">
        Here's how the evidence supports or refutes each potential diagnosis:
      </p>
      <div className="space-y-4">
        {diagnosisQuestion?.diagnosisOptions?.map((opt) => {
          const isUserChoice = selectedOptionName === opt.optionName;
          const isCorrect = correctOptionName === opt.optionName;
          const userChosenAndCorrect = isUserChoice && isCorrect;
          const userChosenAndIncorrect = isUserChoice && !isCorrect;

          // Determine background and border
          let containerClass = "border-gray-300";
          let bgClass = "";

          if (userChosenAndCorrect) {
            // User chose correct answer
            containerClass = "border-green-500";
            bgClass = "bg-green-100";
          } else if (isCorrect && !isUserChoice) {
            // This is correct but user didn't choose it
            containerClass = "border-green-500";
            bgClass = "bg-green-100";
          } else if (userChosenAndIncorrect) {
            // User chose wrong answer
            containerClass = "border-red-500";
            bgClass = "bg-red-100";
          }

          return (
            <div
              key={opt.optionName}
              className={`p-4 border-2 rounded-lg ${containerClass} ${bgClass}`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-900">
                  {opt.optionName}. {opt.optionValue}
                </span>
                <div className="flex gap-2">
                  {userChosenAndCorrect && (
                    <span className="text-xs px-2.5 py-1.5 bg-green-600 text-white rounded-full font-medium">
                      Correct
                    </span>
                  )}
                  {userChosenAndIncorrect && (
                    <span className="text-xs px-2.5 py-1.5 bg-red-600 text-white rounded-full font-medium">
                      Your Choice
                    </span>
                  )}
                  {isCorrect && !isUserChoice && (
                    <span className="text-xs px-2.5 py-1.5 bg-green-600 text-white rounded-full font-medium">
                      Correct Answer
                    </span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-green-600 font-medium mb-2">
                    Supporting Evidence:
                  </p>
                  {opt.supportingEvidence && opt.supportingEvidence.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {opt.supportingEvidence.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">None</p>
                  )}
                </div>

                <div>
                  <p className="text-red-600 font-medium mb-2">
                    Refuting Evidence:
                  </p>
                  {opt.refutingEvidence && opt.refutingEvidence.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {opt.refutingEvidence.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">None</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation section */}
      {clinicalCase?.correctOption?.explanation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
          <p className="text-gray-700 text-sm">
            {clinicalCase.correctOption.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default EvidenceReview;