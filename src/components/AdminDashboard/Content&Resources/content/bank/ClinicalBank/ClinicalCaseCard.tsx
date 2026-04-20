import CommonButton from "@/common/button/CommonButton";
import { ClinicalCase } from "@/store/features/adminDashboard/ContentResources/ClinicalCase/types/getClinicalCase";
import { FC } from "react";
import { MdEdit } from "react-icons/md";

interface ClinicalCardProps {
  clinicalBank: ClinicalCase;
  handleBack: () => void;
  setIsModalOpen: (value: boolean) => void;
}
const ClinicalCaseCard: FC<ClinicalCardProps> = ({
  clinicalBank,
  handleBack,
  setIsModalOpen,
}) => {
  return (
    <div>
      <div className="border border-border rounded-lg shadow-md p-4 bg-white transition-shadow duration-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">{clinicalBank.caseTitle}</h2>
          <CommonButton
            type="button"
            className="!px-3 !py-2"
            onClick={() => setIsModalOpen(true)}
          >
            <MdEdit />
          </CommonButton>
        </div>

        <p className="text-sm text-black mb-1">
          <strong>Patient Presentation:</strong>{" "}
          {clinicalBank.patientPresentation}
        </p>
        <p className="text-sm text-black mb-1">
          <strong>History:</strong> {clinicalBank.historyOfPresentIllness}
        </p>
        <p className="text-sm text-black mb-1">
          <strong>Examination:</strong> {clinicalBank.physicalExamination}
        </p>
        <p className="text-sm text-black mb-1">
          <strong>Imaging:</strong> {clinicalBank.imaging}
        </p>
        <div className="flex justify-end">
          <CommonButton
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleBack}
          >
            Back
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default ClinicalCaseCard;
