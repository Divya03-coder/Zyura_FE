/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  useGetGeneratedMCQQuery,
  useUpdateQuizTrackingMutation,
  useGenerateRecommendationMutation,
  useGetSingleExamForStudentQuery,
  useGetSingleExamForProfessionalQuery,
} from "@/store/features/MCQBank/MCQBank.api";
import { selectUser } from "@/store/features/auth/auth.slice";

// import { setQuizResults } from "@/store/features/MCQBank/quizSlice";
// import { useDispatch } from "react-redux";
import GlobalLoader from "@/common/GlobalLoader";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isReviewMode = queryParams.get("mode") === "review";
  const isExamMode = queryParams.get("source") === "exam";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  // const dispatch = useDispatch();
  const { currentQuiz: reduxQuiz } = useSelector(
    (state: RootState) => state.quiz
  );

  const user = useSelector(selectUser);
  const isProfessional = user?.account?.role === "PROFESSIONAL";
  const limit = queryParams.get("limit") ? Number(queryParams.get("limit")) : 10;

  const { data: apiQuizData, isLoading: isQuizLoading } = useGetGeneratedMCQQuery(
    { id: id as string, limit },
    {
      skip: !id || isExamMode, // Removed static ID "3"
    }
  );

  const { data: studentExamData, isLoading: isStudentExamLoading } = useGetSingleExamForStudentQuery(
    { id: id as string, limit },
    { skip: !id || !isExamMode || isProfessional }
  );

  const { data: professionalExamData, isLoading: isProfessionalExamLoading } = useGetSingleExamForProfessionalQuery(
    { id: id as string, limit },
    { skip: !id || !isExamMode || !isProfessional }
  );

  const examData = isProfessional ? professionalExamData : studentExamData;
  const isLoading = isQuizLoading || (isExamMode && (isStudentExamLoading || isProfessionalExamLoading));


  // Use API data, then redux quiz, then sample
  const fetchedQuiz = apiQuizData?.data || apiQuizData;

  // Normalize quiz data structure
  const normalizeQuizData = (data: any) => {
    if (!data) return null;

    // If it's an array, it's just questions
    if (Array.isArray(data)) {
      return {
        title: "Generated Quiz",
        description: "AI generated quiz based on your content.",
        questions: data,
      };
    }

    // If it doesn't have questions but looks like a session object
    if (data && !data.questions && data.mcqs) {
      return {
        ...data,
        questions: data.mcqs,
      };
    }

    return data;
  };

  const normalizeExamData = (data: any) => {
    if (!data) return null;
    // According to provided structure: response.data.data is the exam object
    const exam = data?.data?.data;
    if (!exam) return null;

    return {
      title: exam?.examName,
      description: exam?.subject,
      questions: exam?.mcqs?.map((q: any) => ({
        mcqId: q?.mcqId,
        question: q?.question,
        imageDescription: q?.imageDescription,
        options: q?.options?.map((opt: any) => ({
          option: opt?.option,
          optionText: opt?.optionText,
          explanation: opt?.explanation,
        })),
        correctOption: q?.correctOption,
      })) || [],
    };
  };

  const normalizedFetchedQuiz = isExamMode ? normalizeExamData(examData) : normalizeQuizData(fetchedQuiz);
  const quizData = normalizedFetchedQuiz || reduxQuiz; //|| sampleQuizData;


  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // Load answers from sessionStorage if in review mode and just submitted
  useEffect(() => {
    if (isReviewMode && id && location.state?.justSubmitted) {
      const savedAnswers = sessionStorage.getItem(`quiz_answers_${id}`);
      if (savedAnswers) {
        try {
          setAnswers(JSON.parse(savedAnswers));
        } catch (e) {
          console.error("Failed to parse saved answers", e);
        }
      }
    }
  }, [isReviewMode, id, location.state]);

  // Normalize questions format inside the data
  const rawQuestions = quizData?.questions || [];
  const questions = rawQuestions?.map((q: any, index: number) => ({
    id: q?.id || (index + 1).toString(),
    text: q?.question || q?.text || "Question " + (index + 1),
    options: (q?.options || []).map((opt: any, i: number) => {
      if (typeof opt === "string") {
        return { value: String.fromCharCode(65 + i), label: opt };
      }
      return {
        value: opt?.value || opt?.option || String.fromCharCode(65 + i),
        label: opt?.label || opt?.optionText || opt?.text || "",
        explanation: opt?.explanation || "",
      };
    }),
    imageDescription: q?.imageDescription || "",
    correctAnswer: q?.correctOption || q?.correctAnswer || q?.answer || "",
    explanation: q?.explanation || "",
  }));


  useEffect(() => {
    if (apiQuizData) {
      console.log("Quiz Data Loaded from API:", apiQuizData);
    }
  }, [apiQuizData]);

  // Timer effect
  useEffect(() => {
    if (isReviewMode) return;
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isReviewMode]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Handle answer selection
  const handleAnswerChange = (value: string) => {
    if (isReviewMode) return;

    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [currentQuestion]: value,
      };

      // Save to sessionStorage
      if (id) {
        sessionStorage.setItem(
          `quiz_answers_${id}`,
          JSON.stringify(newAnswers)
        );
      }

      return newAnswers;
    });
  };

  // Navigation
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isReviewMode && !answers[currentQuestion]) return;

    if (currentQuestion < (questions?.length || 0) - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      if (isReviewMode) {
        // Clear sessionStorage on finish review
        if (id) {
          sessionStorage.removeItem(`quiz_answers_${id}`);
        }
        navigate(`/dashboard/quiz-analysis/${id}${isExamMode ? "?source=exam" : ""}`, {
          // state: { activeTab: "myQuiz" },
        });
      } else {
        handleSubmit();
      }
    }
  };


  const [updateTracking] = useUpdateQuizTrackingMutation();
  const [generateRecommendation] = useGenerateRecommendationMutation();

  // Submit answers
  const handleSubmit = async () => {
    const totalQuestions = questions?.length || 0;
    const answeredCount = Object.keys(answers)?.length || 0;
    let correctCount = 0;

    questions?.forEach((q: any, index: number) => {
      if (answers[index] === q?.correctAnswer) {
        correctCount++;
      }
    });


    const trackingData = {
      totalMcqCount: totalQuestions,
      totalAttemptCount: answeredCount,
      correctMcqCount: correctCount,
      wrongMcqCount: answeredCount - correctCount,
      timeTaken: formatTime(timeElapsed),
    };

    const wrongAnswers = questions
      ?.map((q: any, index: number) => {
        if (answers[index] === q?.correctAnswer) return null;

        const originalQ = rawQuestions[index];

        return {
          mcqId: originalQ?.mcqId || q?.id,
          difficulty: originalQ?.difficulty || "Basic",
          question: q?.text,
          options: q?.options?.map((opt: any) => ({
            option: opt?.value,
            optionText: opt?.label,
            explanation: opt?.explanation,
          })),
          correctOption: q?.correctAnswer,
          userSelectedOption: answers[index],
        };
      })
      .filter(Boolean);


    try {
      if (isExamMode) {
        // For exam mode, skip tracking and recommendation APIs
        if (id) {
          sessionStorage.setItem(`quiz_answers_${id}`, JSON.stringify(answers));
        }

        navigate(`/dashboard/quiz-analysis/${id}?source=exam`, {
          state: {
            trackingData,
            isExamMode: true
          },
        });
        return;
      }

      if (id && id !== "generated") {
        await updateTracking({ id, data: trackingData }).unwrap();

        // Call recommendation API for wrong answers
        if (wrongAnswers.length > 0) {
          generateRecommendation({ contentId: id, wrongAnswers });
        }
      }

      // Save final answers to sessionStorage for review
      if (id) {
        sessionStorage.setItem(`quiz_answers_${id}`, JSON.stringify(answers));
      }

      navigate(`/dashboard/quiz-analysis/${id}`, {
        state: { isGeneratingRecommendation: wrongAnswers.length > 0 },
      });
    } catch (error) {
      console.error("Failed to update tracking:", error);
      navigate(`/dashboard/quiz-analysis/${id}`, {
        state: { isGeneratingRecommendation: wrongAnswers.length > 0 },
      });
    }

  };

  if (isLoading) return <GlobalLoader />;

  const currentQuestionData = questions?.[currentQuestion];


  const handleBack = () => {
    if (isReviewMode) {
      navigate(-1); // Go one step back
    } else if (isExamMode) {
      navigate("/dashboard/mcq-bank");
    } else {
      navigate("/dashboard/quiz-page");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      {/* Main Content */}
      {/* <Link
        to={
          isReviewMode
            ? `/dashboard/quiz-analysis/${id}${isExamMode ? "?source=exam" : ""}`
            : isExamMode
              ? "/dashboard/mcq-bank"
              : "/dashboard/quiz-page"
        }
        className="sm:mb-0"
      > */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1 border border-gray-300 px-3 py-2 rounded cursor-pointer">
        <ArrowLeft className="w-5 h-4" /> Back
      </button>
      {/* </Link> */}


      <div className="flex flex-col md:flex-row gap-6 my-5 items-start min-h-[calc(100vh-160px)]">
        {/* Sidebar */}
        <div
          className={`bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col transition-all duration-300 min-h-[calc(100vh-220px)] h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar  
    ${isSidebarOpen ? "w-full md:w-1/4 lg:w-1/5" : "w-16"}
    `}
        >
          {/* Sidebar Header */}
          <div className="flex flex-col p-5 border-b border-slate-100 bg-slate-50/30">
            {isSidebarOpen ? (
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-800 text-sm tracking-tight mb-0.5">
                    {isReviewMode ? "Review Mode" : "Quiz Progress"}
                  </h2>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    {questions?.length} Questions
                  </p>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
                  title="Collapse"
                >
                  ❮
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mx-auto p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
                title="Expand"
              >
                ❯
              </button>
            )}
          </div>

          {/* Scrollable Question List */}
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto thin-scrollbar border-t border-gray-200 custom-scrollbar p-3 space-y-2">
            {questions?.map((q: any, index: number) => {
              const isActive = index === currentQuestion;
              const isAnswered = answers[index] !== undefined;

              return (
                <div
                  key={q?.id}
                  className={`group p-2.5 rounded-xl cursor-pointer flex items-center justify-between text-xs font-medium transition-all duration-200 border
                    ${isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                      : isAnswered || isReviewMode
                        ? "bg-white text-slate-700 border-slate-100 hover:border-blue-300 hover:bg-blue-50"
                        : "text-slate-500 bg-slate-50/50 border-transparent hover:border-slate-200"
                    }`}
                  onClick={() => {
                    if (isReviewMode || index <= currentQuestion || answers[index - 1]) {
                      setCurrentQuestion(index);
                    }
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border 
                      ${isActive ? "bg-white/20 border-white/30" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
                      {index + 1}
                    </span>
                    {isSidebarOpen && <span>Question {q?.id}</span>}
                  </span>

                  {isSidebarOpen && isReviewMode && answers[index] && (
                    <span className="ml-2">
                      {answers[index] === q?.correctAnswer ? (
                        <CheckCircle className={`w-4 h-4 ${isActive ? "text-white" : "text-green-500"}`} />
                      ) : (
                        <XCircle className={`w-4 h-4 ${isActive ? "text-white" : "text-red-500"}`} />
                      )}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Question Area */}
        <div
          className={`flex flex-col gap-6 transition-all duration-300 p-1 rounded-2xl
    ${isSidebarOpen ? "w-full md:w-3/4 lg:w-4/5" : "w-full md:w-[calc(100%-4rem)]"}
    `}
          style={{ backgroundColor: "rgba(239, 246, 255, 0.5)" }} // Sublte blue background for the right section
        >
          {/* Timer / Header */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
              <Timer className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-bold text-slate-700 font-mono tracking-wider">
                {isReviewMode ? "Reviewing..." : formatTime(timeElapsed)}
              </span>
            </div>
            <Button
              className="cursor-pointer bg-slate-800 hover:bg-slate-900 text-white rounded-lg h-10 px-6 font-semibold shadow-sm transition-all active:scale-95"
              onClick={
                isReviewMode
                  ? () => {
                    if (id) sessionStorage.removeItem(`quiz_answers_${id}`);
                    navigate(`/dashboard/quiz-analysis/${id}${isExamMode ? "?source=exam" : ""}`);
                  }
                  : handleSubmit
              }
              disabled={!isReviewMode && Object.keys(answers).length === 0}
            >
              {isReviewMode ? "Finish Review" : "End Quiz"}
            </Button>
          </div>

          {currentQuestionData && (
            <div className="w-full bg-white p-6 md:px-10 rounded-2xl shadow-sm border border-slate-100 flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider border border-blue-100">
                  Question {currentQuestion + 1} of {questions?.length}
                </span>
                {/* {isReviewMode && (
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${answers[currentQuestion] === currentQuestionData?.correctAnswer
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-red-50 text-red-600 border-red-100"
                    }`}>
                    {answers[currentQuestion] === currentQuestionData?.correctAnswer ? "Correct" : "Incorrect"}
                  </span>
                )} */}
              </div>

              <h3 className="text-xl font-bold text-slate-800 leading-tight mb-8">
                {currentQuestionData?.text}
              </h3>

              {currentQuestionData?.imageDescription && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                  <img src={currentQuestionData?.imageDescription} alt="" className="w-full h-auto object-contain max-h-[400px]" />
                </div>
              )}

              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswerChange}
                disabled={isReviewMode}
                className="space-y-3 mb-8"
              >
                {currentQuestionData?.options?.map((option: any) => {
                  const isCorrect = option?.value === currentQuestionData?.correctAnswer;
                  const isUserSelection = answers[currentQuestion] === option?.value;
                  const showResult = isReviewMode;

                  let borderClass = "border-slate-200 hover:border-blue-300";
                  let bgClass = "bg-white";
                  let textClass = "text-slate-700";

                  if (showResult) {
                    if (isCorrect) {
                      borderClass = "border-green-500 shadow-sm shadow-green-50";
                      bgClass = "bg-green-50/50";
                      textClass = "text-green-800 font-bold";
                    } else if (isUserSelection) {
                      borderClass = "border-red-500 shadow-sm shadow-red-50";
                      bgClass = "bg-red-50/50";
                      textClass = "text-red-800 font-bold";
                    } else {
                      borderClass = "border-slate-100 opacity-60";
                    }
                  } else if (isUserSelection) {
                    borderClass = "border-blue-500 bg-blue-50/30";
                  }

                  return (
                    <div
                      key={option?.value}
                      onClick={() => !isReviewMode && handleAnswerChange(option?.value)}
                      className={`group flex items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${showResult ? borderClass : isUserSelection ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20" : "border-slate-200 hover:border-blue-300 bg-white"
                        } ${showResult ? bgClass : ""}`}
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-colors
                          ${isUserSelection && !showResult ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-400 border-slate-200'}
                          ${showResult && isCorrect ? 'bg-green-600 border-green-600' : ''}
                          ${showResult && isUserSelection && !isCorrect ? 'bg-red-600 border-red-600' : ''}
                        `}>
                          {option?.value}
                        </div>
                        <Label
                          htmlFor={option?.value}
                          className={`flex-grow cursor-pointer text-base ${textClass}`}
                          onClick={(e) => e.preventDefault()}
                        >
                          {option?.label}
                        </Label>
                        {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
                        {showResult && isUserSelection && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>

              {isReviewMode && (
                <div className="mt-4 p-8 bg-slate-50 rounded-2xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-[0.15em] mb-6 inline-block border-b-2 border-blue-500 pb-1">
                    Correct Solutions & Explanations
                  </h4>
                  <div className="space-y-6">
                    {currentQuestionData?.options?.map((option: any) => {
                      const isOptionCorrect = option?.value === currentQuestionData?.correctAnswer;
                      return (
                        <div key={option?.value} className={`p-4 rounded-xl border ${isOptionCorrect ? 'bg-green-50/30 border-green-100' : 'bg-white border-slate-100'}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${isOptionCorrect ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {option?.value}
                            </span>
                            <span className={`text-xs font-bold ${isOptionCorrect ? 'text-green-700' : 'text-slate-500'}`}>
                              Choice {option?.value} {isOptionCorrect ? "(Correct Solution)" : ""}
                            </span>
                          </div>
                          <p className={`text-sm leading-relaxed ${isOptionCorrect ? 'text-green-900 font-medium' : 'text-slate-600'}`}>
                            {option?.explanation || "No explanation provided for this option."}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-auto pt-4">
                {currentQuestion > 0 ? (
                  <Button
                    className="cursor-pointer h-12 px-8 rounded-xl border-2 border-blue-100 bg-blue-50/50 text-blue-600 hover:bg-blue-100 hover:border-blue-200 transition-all font-bold tracking-tight active:scale-95"
                    variant="outline"
                    onClick={handlePrevious}
                  >
                    Previous Question
                  </Button>
                ) : (
                  <div></div>
                )}
                <Button
                  className={`cursor-pointer px-12 h-12 rounded-xl text-white font-bold tracking-tight shadow-lg transition-all active:scale-95 flex items-center gap-2 ${!(!isReviewMode && !answers[currentQuestion]) ? 'hover:opacity-90' : 'opacity-40 cursor-not-allowed'
                    }`}
                  style={{
                    background: !(!isReviewMode && !answers[currentQuestion]) ? "linear-gradient(103deg, #0076F5 6.94%, #0058B8 99.01%)" : "#cbd5e1",
                    boxShadow: !(!isReviewMode && !answers[currentQuestion]) ? "0 4px 14px 0 rgba(0, 118, 245, 0.3)" : "none"
                  }}
                  onClick={handleNext}
                  disabled={!isReviewMode && !answers[currentQuestion]}
                >
                  {currentQuestion === (questions?.length || 0) - 1
                    ? isReviewMode
                      ? "Finish Review"
                      : "Submit Quiz"
                    : "Next Question"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
