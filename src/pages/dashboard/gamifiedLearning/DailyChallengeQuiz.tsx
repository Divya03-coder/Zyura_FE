/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetDailyChallengeQuery, useUpdateDailyChallengeStatusMutation } from "@/store/features/tracking/tracking.api";
import { ArrowLeft, Copy } from "lucide-react";
import GlobalLoader from "@/common/GlobalLoader";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import StatsRow from "@/components/quizOverview/StatsRow";
import CircularProgress from "@/components/quizOverview/CircularProgress";
import { toast } from "sonner";
import { Stats } from "@/components/quizOverview/type";

export default function DailyChallengeQuiz() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: challengeResponse, isLoading: isChallengeLoading } = useGetDailyChallengeQuery(undefined, {
        skip: !!location.state?.challengeData
    });
    const [updateStatus] = useUpdateDailyChallengeStatusMutation();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
    const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState({ correct: 0, wrong: 0 });
    const [startTime] = useState(Date.now());
    const [totalTimeTaken, setTotalTimeTaken] = useState("");

    const challenge = location.state?.challengeData || challengeResponse?.data;
    const questions = challenge?.mcqs || [];
    const isLoading = !location.state?.challengeData && isChallengeLoading;

    const fromAnalysis = location.state?.fromAnalysis;
    const quizId = location.state?.quizId;

    const handleBack = () => {
        if (fromAnalysis && quizId) {
            navigate(`/dashboard/quiz-analysis/${quizId}`);
        } else {
            navigate("/dashboard");
        }
    };

    const breadcrumbs = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Daily Challenge Quiz", link: "/dashboard/gamified-learning/daily-challenge" },
    ];

    const handleOptionSelect = (option: string) => {
        if (selectedOptions[currentQuestionIndex]) return;
        setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option });
        setShowExplanation({ ...showExplanation, [currentQuestionIndex]: true });
    };

    const handleNext = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            let correct = 0;
            let wrong = 0;
            questions.forEach((q: any, index: number) => {
                if (selectedOptions[index] === q.correctOption) {
                    correct++;
                } else {
                    wrong++;
                }
            });

            const endTime = Date.now();
            const diff = Math.floor((endTime - startTime) / 1000);
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            setTotalTimeTaken(`${minutes}m ${seconds}s`);

            setResults({ correct, wrong });
            setIsFinished(true);

            try {
                if (!fromAnalysis) {
                    await updateStatus().unwrap();
                }
            } catch (err) {
                console.error("Failed to update challenge status:", err);
            }
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("ID copied to clipboard");
    };

    if (isLoading) return <GlobalLoader />;

    if (!challenge) return <div className="p-6 text-center">Challenge not found</div>;

    if (isFinished) {
        const totalQuestions = questions.length;
        const correctPercent = Math.round((results.correct / totalQuestions) * 100);
        const wrongPercent = 100 - correctPercent;

        const stats: Stats = {
            completed: `${totalQuestions}`,
            correct: `${results.correct}`,
            wrong: `${results.wrong}`,
            totalTime: totalTimeTaken,
        };

        return (
            <div className="p-6 max-w-6xl mx-auto space-y-8">
                <div className="flex items-start gap-1">
                    <button onClick={handleBack} className="sm:mb-0 cursor-pointer">
                        <ArrowLeft />
                    </button>
                    <DashboardHeading
                        title="Performance Analysis"
                        titleSize="text-xl"
                        titleColor="text-[#0A0A0A]"
                        description="Analyze challenge performance from detailed results"
                        descColor="text-[#4A5565]"
                        descFont="text-sm"
                        className=""
                    />
                </div>

                <StatsRow stats={stats} />

                <div className={`w-full mx-auto grid gap-6 ${fromAnalysis 
                    ? "grid-cols-1 place-items-center"
                    : "grid-cols-1 lg:grid-cols-[1fr_400px]"
                }`}>
                    {/* Performance Card */}
                    <div className="bg-blue-50 p-8 rounded-xl shadow-sm border border-blue-200 flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-8 text-blue-900 self-start">
                            {challenge.title}
                        </h2>

                        <CircularProgress
                            correctPercentage={correctPercent}
                            incorrectPercentage={wrongPercent}
                            label="Challenge Performance"
                        />

                        <div className="text-center mt-10 space-y-4">
                            <p className="text-lg text-blue-800">
                                You completed{" "}
                                <span className="font-bold">
                                    {totalQuestions}/{totalQuestions}
                                </span>{" "}
                                questions.
                            </p>

                            <div className="flex flex-col items-center space-y-2">
                                {/* Correct */}
                                <span className="flex items-center">
                                    <div className="w-4 h-4 rounded-sm bg-green-500 mr-2" />
                                    <span className="font-medium text-green-700">
                                        {correctPercent}% correctly ({results.correct} questions)
                                    </span>
                                </span>

                                {/* Incorrect */}
                                <span className="flex items-center">
                                    <div className="w-4 h-4 rounded-sm bg-red-500 mr-2" />
                                    <span className="font-medium text-red-700">
                                        {wrongPercent}% incorrectly ({results.wrong} questions)
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="mt-10">
                            <PrimaryButton
                                onClick={handleBack}
                                className="px-10 py-3 h-auto"
                            >
                                {fromAnalysis ? "Back to Analysis" : "Back to Dashboard"}
                            </PrimaryButton>
                        </div>
                    </div>

                    {/* Summary Card */}
                    {!fromAnalysis && (
                        <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200 h-fit">
                            <h3 className="text-lg font-bold text-blue-900 mb-4">Summary</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                                    <span className="text-blue-600">Subject</span>
                                    <span className="font-medium text-blue-800">
                                        {challenge.subject}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                    <span className="text-slate-600">System</span>
                                    <span className="font-medium text-slate-800">
                                        {challenge.system}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                                    <span className="text-slate-600">Topic</span>
                                    <span className="font-medium text-slate-800">
                                        {challenge.topic}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-slate-600">Reward</span>
                                    <span className="text-blue-600 font-semibold">+10 pts</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isSelected = !!selectedOptions[currentQuestionIndex];

    return (
        <div className="p-1 md:p-6 max-w-5xl mx-auto space-y-8 pb-32">
            <Breadcrumb breadcrumbs={breadcrumbs} />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <button onClick={handleBack} className="cursor-pointer">
                        <ArrowLeft className="mb-7" />
                    </button>
                    <DashboardHeading
                        title={challenge.title}
                        titleSize="text-xl"
                        description={`${questions.length} Questions`}
                        className="space-y-1"
                    />
                </div>

                {/* <div className="flex gap-3 w-full sm:w-auto">
                    <PrimaryButton
                        className="h-10 w-full sm:w-auto cursor-pointer bg-slate-600 hover:bg-slate-700"
                        onClick={() => navigate("/dashboard")}
                    >
                        Save & Exit
                    </PrimaryButton>
                </div> */}
            </div>

            <div className="border border-slate-300 rounded-lg p-5 md:p-8 space-y-6 bg-white shadow-sm">
                <div className="flex items-center justify-between">
                    <div
                        onClick={() => handleCopy(currentQuestion.mcqId)}
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                        <p className="text-slate-500 text-sm font-normal">{currentQuestion.mcqId}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-500 text-sm">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                        <span className="bg-[#D97706] text-[10px] font-bold px-3 py-1 text-white rounded-full uppercase tracking-wider">
                            {challenge.topic || challenge.subject}
                        </span>
                        <span className="text-[10px] font-bold px-3 py-1 bg-white rounded-full border border-slate-200 uppercase tracking-wider text-slate-500">
                            {currentQuestion.difficulty}
                        </span>
                    </div>
                </div>

                <p className="text-slate-900 text-lg font-medium leading-relaxed">
                    {currentQuestion.question}
                </p>

                <div className="space-y-3">
                    {currentQuestion.options.map((opt: any, idx: number) => {
                        const optChar = opt.option;
                        const isOptionSelected = selectedOptions[currentQuestionIndex] === optChar;
                        const isOptionCorrect = optChar === currentQuestion.correctOption;
                        const showResult = isSelected;

                        let borderClass = "border-slate-200 hover:border-blue-300";
                        let bgClass = "bg-white";
                        let textClass = "text-slate-800";

                        if (showResult) {
                            if (isOptionCorrect) {
                                borderClass = "border-green-500";
                                bgClass = "bg-green-50";
                                textClass = "text-green-700 font-semibold";
                            } else if (isOptionSelected) {
                                borderClass = "border-red-500";
                                bgClass = "bg-red-50";
                                textClass = "text-red-700 font-semibold";
                            } else {
                                borderClass = "border-slate-100 opacity-60";
                            }
                        } else if (isOptionSelected) {
                            borderClass = "border-blue-500";
                            bgClass = "bg-blue-50";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(optChar)}
                                disabled={showResult}
                                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${borderClass} ${bgClass}`}
                            >
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border 
                  ${isOptionSelected && !showResult ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-50 text-gray-500 border-gray-200'}
                  ${showResult && isOptionCorrect ? 'bg-green-500 text-white border-green-500' : ''}
                  ${showResult && isOptionSelected && !isOptionCorrect ? 'bg-red-500 text-white border-red-500' : ''}
                `}>
                                    {optChar}
                                </span>
                                <span className={textClass}>{opt.optionText}</span>
                            </button>
                        );
                    })}
                </div>

                {showExplanation[currentQuestionIndex] && (
                    <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Explanation</h4>
                        <div className="space-y-4">
                            {currentQuestion.options.map((option: any) => (
                                <div key={option.option} className="text-sm">
                                    <span className={`font-bold mr-2 ${option.option === currentQuestion.correctOption ? 'text-green-600' : 'text-red-600'}`}>
                                        {option.option}:
                                    </span>
                                    <span className="text-slate-700">{option.explanation}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-4">
                <PrimaryButton
                    disabled={!isSelected}
                    onClick={handleNext}
                    className={`px-10 py-3 h-auto shadow-lg transition-transform active:scale-95 ${!isSelected ? 'bg-slate-300' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {currentQuestionIndex === questions.length - 1 ? "Complete Challenge" : "Next Question"}
                </PrimaryButton>
            </div>
        </div>
    );
}
