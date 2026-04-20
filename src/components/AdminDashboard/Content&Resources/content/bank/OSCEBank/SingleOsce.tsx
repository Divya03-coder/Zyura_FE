import CommonButton from "@/common/button/CommonButton";
import { SingleOsceResponse } from "@/store/features/adminDashboard/ContentResources/Osce/types/singleOsce";

interface osceData {
  data: SingleOsceResponse;
  setBankId: (id: string) => void;
}
const SingleOsce: React.FC<osceData> = ({ data, setBankId }) => {
  const content = data?.data ?? [];

  const handleBack = () => {
    setBankId("");
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <h2 className="text-xl font-bold mb-2">{content.name}</h2>
      <p className="text-gray-600 mb-2">{content.description}</p>

      {/* Scenario and Time */}
      <div className="flex justify-between mb-4 text-sm text-gray-500">
        <span>Scenario: {content.scenario}</span>
        <span>Time Limit: {content.timeLimit}</span>
      </div>

      {/* Candidate Instruction */}
      <div className="mb-4">
        <h3 className="font-semibold">Candidate Instruction:</h3>
        <p className="text-gray-700">{content.candidateInstruction}</p>
      </div>

      {/* Patient Instruction */}
      <div className="mb-4">
        <h3 className="font-semibold">Patient Instruction:</h3>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html: content.patientInstruction,
          }}
        />
      </div>

      {/* Tasks */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Tasks:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {content.tasks.map((task, index) => (
            <li key={index}>
              <strong>{task.taskName}:</strong> {task.checklistItem.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      {/* Learning Resource */}
      {content.learningResource && (
        <div className="mt-4">
          <a
            href={content.learningResource.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {content.learningResource.resourceTitle}
          </a>
        </div>
      )}
      <div className="flex justify-end">
        <CommonButton
          type="button"
          className=" bg-blue-500 hover:bg-blue-600 text-white "
          onClick={handleBack}
        >
          Back
        </CommonButton>
      </div>
    </div>
  );
};

export default SingleOsce;
