import { AllContentMCQList } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import McqBankCardForAdmin from "../../bank/MCQBank/McqBankCardForAdmin";
import MedicalSharedTable from "../../bank/MCQBank/MedicalSharedTable";

interface MCQBankProps {
  mcqBank: AllContentMCQList;
  bankId: string;
  setBankId: (id: string) => void;
}

const MCQBank: React.FC<MCQBankProps> = ({ mcqBank, bankId, setBankId }) => {
  return (
    <div>
      {bankId === "" ? (
        <div>
          <McqBankCardForAdmin
            data={mcqBank.data ?? []}
            setMcqBankId={setBankId}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <MedicalSharedTable mcqBankId={bankId} />
        </div>
      )}
    </div>
  );
};

export default MCQBank;
