import { ClinicalCaseData } from "@/types/clinicalCase";
import { Lightbulb } from "lucide-react";
// import { ClinicalCaseData } from "@/types/clinicalCase.types";

type Props = {
  clinicalCase: ClinicalCaseData;
  selectedOptionName: string | null;
  setSelectedOptionName: (name: string) => void;
  onConfirm: () => void;
};

const DecisionPoint: React.FC<Props> = ({
  clinicalCase,
  selectedOptionName,
  setSelectedOptionName,
  onConfirm,
}) => {
  const diagnosisQuestion = clinicalCase?.diagnosisQuestion;
  const caseTips = clinicalCase?.caseTips || [];

  return (
    <div>
      <div className="bg-white border border-gray-300 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Decision Point</h2>
        <h3 className="mb-4">{diagnosisQuestion?.question}</h3>
        <div className="space-y-3">
          {diagnosisQuestion?.diagnosisOptions?.map((opt) => (
            <label
              key={opt.optionName}
              className={`block p-4 border rounded-lg cursor-pointer ${
                selectedOptionName === opt.optionName
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="diagnosis-option"
                value={opt.optionName}
                checked={selectedOptionName === opt.optionName}
                onChange={() => setSelectedOptionName(opt.optionName)}
                className="mr-3"
              />
              <span className="font-medium">{opt.optionName}.</span>{" "}
              {opt.optionValue}
            </label>
          ))}
        </div>

        {selectedOptionName && (
          <div className="mt-6">
            <button
              onClick={onConfirm}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Confirm Diagnosis
            </button>
          </div>
        )}
      </div>

      {caseTips && caseTips.length > 0 && (
        <div className="bg-indigo-50 border border-gray-300 p-6 rounded-2xl mt-12">
          <h3 className="flex items-center gap-2 text-slate-950 text-xl font-semibold mb-3">
            <Lightbulb />
            Case Tips
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {caseTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-indigo-300 mt-1 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionPoint;