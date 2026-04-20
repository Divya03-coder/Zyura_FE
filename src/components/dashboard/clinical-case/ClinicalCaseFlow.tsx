import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DecisionPoint from "./DecisionPoint";
import EvidenceReview from "./EvidenceReview";
import { Progress } from "@/components/ui/progress";
import { ClinicalCaseData } from "@/types/clinicalCase";
import ClinicalCaseMCQ from "./ClinicalCaseMCQ";
import { useUpdateProgressMcqFlashcardClinicalCaseMutation } from "@/store/features/goal/goal.api";
import { useSaveStudyPlanProgressMutation } from "@/store/features/studyPlan/studyPlan.api";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import PrimaryButton from "@/components/reusable/PrimaryButton";

type Props = {
  clinicalCase: ClinicalCaseData;
};

const ClinicalCaseFlow: React.FC<Props> = ({ clinicalCase }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedOptionName, setSelectedOptionName] = useState<string | null>(
    null
  );
  const [isConfirmed, setIsConfirmed] = useState(false);
  console.log(isConfirmed)
  // MCQ State
  const [mcqIndex, setMcqIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // API
  const [updateProgress, { isLoading: isUpdating }] =
    useUpdateProgressMcqFlashcardClinicalCaseMutation();
  const [saveStudyPlanProgress] = useSaveStudyPlanProgressMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const mcqs = clinicalCase?.mcqs || [];
  const totalMCQs = mcqs.length;

  const handleConfirmDiagnosis = () => {
    setIsConfirmed(true);
    setCurrentStep(2);
  };

  const handleStartQuiz = () => {
    setCurrentStep(3);
  };

  const handleAnswerShown = (isShown: boolean, isCorrect: boolean) => {
    setIsAnswerShown(isShown);
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextMCQ = () => {
    if (mcqIndex < totalMCQs - 1) {
      setMcqIndex((prev) => prev + 1);
      setIsAnswerShown(false);
    }
  };

  const fromAnalysis = location.state?.fromAnalysis;
  const quizId = location.state?.quizId;

  const handleBack = () => {
    if (fromAnalysis && quizId) {
      navigate(`/dashboard/quiz-analysis/${quizId}`);
    } else if (
      location.state?.from === "weekly-plan" ||
      location.state?.from === "home"
    ) {
      navigate(-1);
    } else {
      navigate("/dashboard/clinical-case-generator");
    }
  };

  const handleFinishQuiz = async () => {
    // API Call
    try {
      if (!fromAnalysis && clinicalCase._id) {
        await updateProgress({
          totalCorrect: correctAnswers,
          totalIncorrect: totalMCQs - correctAnswers,
          totalAttempted: totalMCQs,
          key: "clinicalcase",
          bankId: clinicalCase._id,
        }).unwrap();
      }

      // Check if we came from WeeklyPlan or Home and update study plan progress
      if (
        (location.state?.from === "weekly-plan" ||
          location.state?.from === "home") &&
        location.state?.planId
      ) {
        try {
          await saveStudyPlanProgress({
            planId: location.state.planId,
            day: location.state.day,
            suggest_content: location.state.suggest_content,
          }).unwrap();
        } catch (error) {
          console.error("Failed to save study plan progress:", error);
        }
      }

      setShowSuccessModal(true);
    } catch (err) {
      console.error("Failed to update progress", err);
      toast.error("Failed to save progress");
      setShowSuccessModal(true);
    }
  };

  const getButtonConfig = () => {
    if (currentStep === 1) {
      return {
        label: "Next",
        disabled: true,
        onClick: () => { },
      };
    }
    if (currentStep === 2) {
      // If there are no MCQs, we finish the case directly from here
      if (totalMCQs === 0) {
        return {
          label: isUpdating ? "Finishing..." : "Finish Case",
          disabled: isUpdating,
          onClick: handleFinishQuiz,
        };
      }
      return {
        label: "Start Quiz",
        disabled: false,
        onClick: handleStartQuiz,
      };
    }
    // Step 3: MCQ
    const isLastQuestion = mcqIndex === totalMCQs - 1;
    return {
      label: isLastQuestion
        ? isUpdating
          ? "Finishing..."
          : "Finish Quiz"
        : "Next Question",
      disabled: !isAnswerShown || isUpdating,
      onClick: isLastQuestion ? handleFinishQuiz : handleNextMCQ,
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-8 my-9">
      <div className="col-span-3">
        {currentStep === 1 && (
          <DecisionPoint
            clinicalCase={clinicalCase}
            selectedOptionName={selectedOptionName}
            setSelectedOptionName={setSelectedOptionName}
            onConfirm={handleConfirmDiagnosis}
          />
        )}

        {currentStep === 2 && selectedOptionName && (
          <EvidenceReview
            clinicalCase={clinicalCase}
            selectedOptionName={selectedOptionName}
          />
        )}

        {currentStep === 3 && (
          <ClinicalCaseMCQ
            clinicalCase={clinicalCase}
            currentQuestionIndex={mcqIndex}
            onAnswerShown={handleAnswerShown}
          />
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="border border-gray-300 rounded-2xl p-6 space-y-4 bg-white">
          <p className="text-xl font-semibold">Decision Point</p>
          <Progress value={(currentStep * 100) / 3} />
          <p className="">
            {currentStep === 1
              ? "Select a diagnosis to continue"
              : currentStep === 2
                ? "Review evidence to unlock quiz"
                : "Complete the practice questions"}
          </p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={buttonConfig.onClick}
              disabled={buttonConfig.disabled}
              className="w-full px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-700"
            >
              {buttonConfig.label}
            </button>
          </div>
        </div>

        {/* <div className="border border-gray-300 rounded-2xl p-6 space-y-4 bg-white">
          <p className="text-xl font-semibold">Quick Actions</p>
          <Button className="w-full bg-[#F9FAFB] text-slate-900 hover:text-white px-6 py-2 border border-gray-300 items-center rounded disabled:opacity-50 cursor-pointer">
            <Bookmark />
            Bookmark Case
          </Button>
          <Button className="w-full bg-[#F9FAFB] text-slate-900 hover:text-white px-6 py-2 border border-gray-300 items-center rounded disabled:opacity-50 cursor-pointer">
            <Printer />
            Print Case
          </Button>
          <Button className="w-full bg-[#F9FAFB] text-slate-900 hover:text-white px-6 py-2 border border-gray-300 items-center rounded disabled:opacity-50 cursor-pointer">
            <Share />
            Share Case
          </Button>
        </div> */}
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-600">
              Case Completed!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              You have successfully completed this clinical case.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            {totalMCQs > 0 ? (
              <>
                <p className="text-lg font-medium">Your Score</p>
                <div className="text-4xl font-bold text-blue-600">
                  {correctAnswers} / {totalMCQs}
                </div>
              </>
            ) : (
              <p className="text-lg text-slate-600">
                You have reviewed the case successfully.
              </p>
            )}
          </div>
          <DialogFooter className="sm:justify-center">
            <PrimaryButton
              onClick={handleBack}
              className="w-full sm:w-auto"
            >
              {fromAnalysis ? "Back to Analysis" : "Back to Cases"}
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClinicalCaseFlow;
