import { useState } from "react";
import BulkExamModal from "./BulkExamModal";
import ManualExamModal from "./ManualExamModal";
import McqTableForExam from "./McqTableForExam";
import TableContentForExam from "./TableContentForExam";

const ExamMode = () => {
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] =
    useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [mode, setMode] = useState<"manual" | "bulk">("manual");
  return (
    <div>
      <div className=" w-full flex  gap-6">
        <TableContentForExam
          iconAction={() => setIsCreateQuestionModalOpen(true)}
          onSelectExam={(examId) => setSelectedExamId(examId)}
          selectedExamId={selectedExamId}
          mode={mode}
          setMode={setMode}
        />
        <McqTableForExam
          examId={selectedExamId}
          setSelectedExamId={setSelectedExamId}
        />
      </div>

      {isCreateQuestionModalOpen &&
        (mode === "manual" ? (
          <ManualExamModal
            onClose={() => setIsCreateQuestionModalOpen(false)}
          />
        ) : (
          <BulkExamModal onClose={() => setIsCreateQuestionModalOpen(false)} />
        ))}
    </div>
  );
};

export default ExamMode;
