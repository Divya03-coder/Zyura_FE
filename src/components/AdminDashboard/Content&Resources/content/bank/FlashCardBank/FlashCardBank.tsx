import { AllContentMCQList } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import McqBankCardForAdmin from "../../bank/MCQBank/McqBankCardForAdmin";
import SingleFlashCardCard from "./SingleFlashCardCard";

interface FlashCardBank {
  mcqBank: AllContentMCQList;
  bankId: string;
  setBankId: (id: string) => void;
}

const FlashCardBank: React.FC<FlashCardBank> = ({
  mcqBank,
  bankId,
  setBankId,
}) => {
  return (
    <div>
      {bankId === "" ? (
        <McqBankCardForAdmin
          data={mcqBank.data ?? []}
          setMcqBankId={setBankId}
        />
      ) : (
        <SingleFlashCardCard bankId={bankId} />
      )}
    </div>
  );
};

export default FlashCardBank;
