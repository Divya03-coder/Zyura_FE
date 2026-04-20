/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BadgeHelp, CircleAlert } from "lucide-react";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  useGetSingleFlashCardQuery,
  useGetSingleGeneratedFlashCardQuery,
} from "@/store/features/flashCard/flashCard.api";
import { useSaveStudyPlanProgressMutation } from "@/store/features/studyPlan/studyPlan.api";
import { useUpdateProgressMcqFlashcardClinicalCaseMutation } from "@/store/features/goal/goal.api";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import GlobalLoader2 from "@/common/GlobalLoader2";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useBlocker, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Flashcard Generator", link: "/dashboard/flashcard-generator" },
];

const cardColors = [
  "bg-gradient-to-br from-[#7F56D9] to-[#6941C6]",
  "bg-gradient-to-br from-[#0086C9] to-[#026AA2]",
  "bg-gradient-to-br from-[#12B76A] to-[#039855]",
  "bg-gradient-to-br from-[#F79009] to-[#DC6803]",
  "bg-gradient-to-br from-[#F04438] to-[#D92D20]",
  "bg-gradient-to-br from-[#EE46BC] to-[#C11574]",
];

export default function SolveFlashCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(0);

  const [updateProgress] = useUpdateProgressMcqFlashcardClinicalCaseMutation();
  const [saveStudyPlanProgress] = useSaveStudyPlanProgressMutation();

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isCompleted &&
      currentQuestion > 0 &&
      !isSubmitting &&
      currentLocation.pathname !== nextLocation.pathname
  );

  const stateFlashcardData = location.state?.flashCardData;
  const source = location.state?.source || "all";
  const totalFlashCards = location.state?.totalFlashCards;

  const { data: standardData, isLoading: isStandardLoading } =
    useGetSingleFlashCardQuery(
      { id: id as string, limit: totalFlashCards },
      {
        skip: !!stateFlashcardData || source === "generated",
      }
    );

  const { data: generatedData, isLoading: isGeneratedLoading } =
    useGetSingleGeneratedFlashCardQuery(
      { id: id as string, limit: totalFlashCards },
      {
        skip: !!stateFlashcardData || source !== "generated",
      }
    );

  const isLoading = isStandardLoading || isGeneratedLoading;

  let flashCardData: any =
    stateFlashcardData ||
    (source === "generated" ? generatedData?.data : standardData?.data);

  if (Array.isArray(flashCardData)) {
    flashCardData = {
      flashCards: flashCardData,
      title: "Generated Session",
      subject: "AI Generated",
    };
  }

  if (!flashCardData && isLoading) return <GlobalLoader2 />;

  if (
    !flashCardData ||
    !flashCardData.flashCards ||
    flashCardData.flashCards.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <CircleAlert className="w-16 h-16 text-red-500" />
        <h2 className="text-xl font-semibold text-slate-700">
          No Flashcards Found
        </h2>
        <p className="text-slate-500">
          The flashcard set you are looking for does not exist or has been removed.
        </p>
        <Link to="/dashboard/flashcard-page">
          <Button className="bg-blue-main hover:bg-blue-main/90">
            Back to Flashcards
          </Button>
        </Link>
      </div>
    );
  }

  const questions = flashCardData.flashCards.map((fc: any) => ({
    id: fc?.flashCardId,
    tag: fc?.difficulty,
    text: fc?.frontText,
    answer: fc?.backText,
    explanation: fc?.explanation,
    image: fc?.image,
  }));

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const fromAnalysis = location.state?.fromAnalysis;
  const quizId = location.state?.quizId;

  const handleBack = () => {
    console.log("Navigating back. fromAnalysis:", fromAnalysis, "quizId:", quizId);

    // Using a timeout to ensure the navigation happens after any ongoing React state updates
    setTimeout(() => {
      if (fromAnalysis && quizId) {
        navigate(`/dashboard/quiz-analysis/${quizId}`, { replace: true });
      } else if (
        location.state?.from === "weekly-plan" ||
        location.state?.from === "home"
      ) {
        navigate(-1);
      } else {
        navigate("/dashboard/flashcard-page", { replace: true });
      }
    }, 100);
  };

  const handleSubmit = async () => {
    // If we're coming from analysis, we don't strictly need a bankId/flashCardData._id
    if (!flashCardData?._id && !fromAnalysis) return;

    setIsSubmitting(true);
    console.log("Submitting flashcard progress...");

    try {
      // Only call standard progress API if we have a real bank ID
      if (flashCardData?._id) {
        await updateProgress({
          totalAttempted: questions.length,
          totalCorrect: questions.length,
          totalIncorrect: 0,
          key: "flashcard",
          bankId: flashCardData._id,
        }).unwrap();
      }

      // Check for weekly plan progress
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

      console.log("Finished saving progress, calling handleBack");
      handleBack();
    } catch (error) {
      console.error("Failed to save progress:", error);
      toast.error("Failed to save progress");
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-[#F9FAFB]"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <motion.span
              animate={
                // { scale: [1, 1.2, 1] }
                { y: [0, 10, 0] }
              }
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl"
            >
              🎉
            </motion.span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Session Completed!
          </h1>
          <p className="text-slate-600 mb-8 max-w-md">
            Excellent work! You've reviewed all {questions?.length} flashcards in this set. Your progress is ready to be saved.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleSubmit}
              className="bg-[#7F56D9] hover:bg-[#6941C6] text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving Progress..." : fromAnalysis ? "Finish & Back to Analysis" : "Finish & Save Progress"}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
      transition: {
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen my-2 px-2 overflow-y-auto bg-[#F9FAFB]"
    >
      {/* Alert Dialogs remain unchanged logic-wise */}
      <AlertDialog open={blocker.state === "blocked"}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
            <AlertDialogDescription>
              You are in the middle of a session. If you leave now, your current progress will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => blocker.state === "blocked" && blocker.reset()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
              onClick={() => blocker.state === "blocked" && blocker.proceed()}
            >
              Leave Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="text-sm text-gray-600 mb-6">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-start gap-4 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.1, x: -5 }}
          onClick={handleBack}
          className="mt-1 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm cursor-pointer border border-slate-100"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
          <DashboardHeading
            title={flashCardData?.title}
            titleColor="text-slate-900"
            titleSize="text-2xl font-bold"
            description="Master your knowledge. Click the card to flip and reveal the answer."
            descColor="text-slate-500"
            descSize="text-base"
          />
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 pb-12">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 h-fit
            ${isSidebarOpen ? "w-full lg:w-72" : "w-16"}
          `}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <h2 className="font-semibold text-slate-800 truncate">{flashCardData?.title}</h2>
                <p className="text-xs text-slate-500 truncate">
                  {questions.length} Cards • {flashCardData?.subject}
                </p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-200 transition-colors text-slate-400"
            >
              {isSidebarOpen ? "❮" : "❯"}
            </button>
          </div>

          <div className={`overflow-y-auto thin-scrollbar ${isSidebarOpen ? "max-h-[500px] p-2" : "max-h-[500px] p-2 text-center"}`}>
            {questions.map((_: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setDirection(index > currentQuestion ? 1 : -1);
                  setIsFlipped(false);
                  setCurrentQuestion(index);
                }}
                className={`mb-1 p-2.5 rounded-xl cursor-pointer text-sm transition-all
                  ${index === currentQuestion
                    ? "bg-[#F4EBFF] text-[#7F56D9] font-bold border border-[#D6BBFB]"
                    : "text-slate-600 hover:bg-slate-50"
                  }`}
              >
                {isSidebarOpen ? (
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] ${index === currentQuestion ? "bg-[#7F56D9] text-white" : "bg-slate-100 text-slate-500"}`}>
                      {index + 1}
                    </span>
                    <span className="truncate">Card {index + 1}</span>
                  </div>
                ) : (
                  index + 1
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-3xl mb-8 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#7F56D9] uppercase tracking-widest mb-1">Current Progress</span>
              <p className="text-sm font-medium text-slate-500">
                Card <span className="text-slate-900">{currentQuestion + 1}</span> of <span className="text-slate-900">{questions.length}</span>
              </p>
            </div>
            <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                className="h-full bg-[#7F56D9]"
              />
            </div>
          </div>

          {/* Flashcard with Layout Transition */}
          <div className="relative w-full max-w-3xl h-112.5 perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentQuestion}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className="w-full h-full relative" style={{ perspective: "1000px" }}>
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                    className="w-full h-full relative border-none rounded-4xl shadow-xl shadow-slate-200/50"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front */}
                    <div
                      className={`absolute inset-0 backface-hidden rounded-4xl p-8 flex flex-col items-center justify-center text-white
                        ${cardColors[currentQuestion % cardColors.length]}`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                      >
                        {questions[currentQuestion]?.tag || "Medical Concept"}
                      </motion.span>

                      <div className="text-center">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="bg-white/20 p-4 rounded-3xl w-16 h-16 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
                        >
                          <BadgeHelp className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-sm font-bold text-white/60 uppercase tracking-[0.3em] mb-4">Question</h3>

                        {questions[currentQuestion]?.image && (
                          <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={questions[currentQuestion]?.image}
                            alt="Concept Illustration"
                            className="w-full max-w-sm h-48 mb-6 rounded-2xl object-cover shadow-lg border-2 border-white/20 mx-auto"
                          />
                        )}

                        <p className="text-2xl md:text-3xl font-bold leading-tight px-4 font-sans">
                          {questions[currentQuestion]?.text}
                        </p>
                      </div>

                      {/* <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-8 text-white/40 text-[10px] uppercase font-bold tracking-widest"
                      >
                        Click to Reveal Answer
                      </motion.div> */}
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 backface-hidden rounded-4xl p-8 flex flex-col items-center justify-center bg-white border border-slate-100"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      {/* <span className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-[#F4EBFF] text-[#7F56D9] rounded-full">
                        Expert Solution
                      </span> */}

                      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
                        {/* <h4 className="text-[#7F56D9] text-xs font-bold uppercase tracking-[0.3em] mb-4">CORRECT ANSWER</h4> */}
                        <p className="text-xl md:text-2xl font-bold text-slate-800 text-center mb-8 leading-snug">
                          {questions[currentQuestion]?.answer}
                        </p>

                        {questions[currentQuestion]?.explanation && (
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full bg-[#F9FAFB] rounded-2xl p-5 border border-slate-100 relative"
                          >
                            <div className="absolute -top-3 left-6 px-3 bg-[#7F56D9] text-white text-[9px] font-bold rounded-lg py-1 shadow-md">
                              EXPLANATION
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed italic text-center">
                              {questions[currentQuestion]?.explanation}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* <div className="mt-8 flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <div className="w-2 h-2 rounded-full bg-blue-400 opacity-20" />
                        <div className="w-2 h-2 rounded-full bg-purple-400 opacity-20" />
                      </div> */}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* New Premium Navigation Controls */}
          <div className="flex items-center justify-between w-full max-w-3xl mt-12 px-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 text-slate-500 font-bold hover:bg-slate-100 disabled:opacity-30 rounded-full px-6 py-6"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleNext}
                className="bg-[#7F56D9] hover:bg-[#6941C6] text-white font-bold rounded-full px-12 py-6 shadow-lg shadow-purple-200 flex items-center gap-2"
              >
                {currentQuestion < questions.length - 1 ? "Next Card" : "Complete Task"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}