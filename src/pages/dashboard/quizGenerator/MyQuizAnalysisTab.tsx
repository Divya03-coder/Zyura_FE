import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Stats, Recommendations } from "@/components/quizOverview/type";
import StatsRow from "@/components/quizOverview/StatsRow";
import CircularProgress from "@/components/quizOverview/CircularProgress";
import ResultsSummary from "@/components/quizOverview/ResultsSummary";
import StudyRecommendations from "@/components/quizOverview/StudyRecommendations";
import { useGetGeneratedMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import { useGetSingleExamQuery } from "@/store/features/adminDashboard/examMode/studentApi/StudentApi";
import { ArrowLeft, Sparkles } from "lucide-react";
import DashboardHeading from "@/components/reusable/DashboardHeading";


const MyQuizAnalysisTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isExamMode = queryParams.get("source") === "exam" || location.state?.isExamMode;
  const justSubmitted = location.state?.justSubmitted;
  const trackingDataFromState = location.state?.trackingData;

  const { data: response, isLoading: quizLoading, isFetching, refetch } = useGetGeneratedMCQQuery({ id: id || "" }, {
    skip: !id || isExamMode,
  });

  const { data: examResponse, isLoading: examLoading } = useGetSingleExamQuery({ id: id || "" }, {
    skip: !id || !isExamMode,
  });

  const isLoading = isExamMode ? examLoading : quizLoading;
  const quizData = isExamMode ? examResponse?.data?.data : response?.data;
  const [isAILoading, setIsAILoading] = useState(!!location.state?.isGeneratingRecommendation && !isExamMode);


  // Stop loading if we have content OR if we finished a fetch and gpt might have returned nothing
  useEffect(() => {
    if (!isFetching && response) {
      const recommendations = quizData?.tracking?.recommendedContent as Recommendations;
      if (recommendations && (
        recommendations.post_quiz_recommendations ||
        recommendations.flashcards ||
        recommendations.clinical_case ||
        recommendations.notes
      )) {
        setIsAILoading(false);
      }
    }
  }, [isFetching, response, quizData]);

  // If still loading AI, refetch every 3 seconds to check for updates
  useEffect(() => {
    let interval: any;
    if (isAILoading) {
      interval = setInterval(() => {
        refetch();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAILoading, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!quizData && !trackingDataFromState) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No quiz analysis found.</p>
      </div>
    );
  }


  const { tracking, title, examName, subject } = quizData || {};
  const currentTitle = isExamMode ? examName : title;

  const actualTracking = isExamMode ? trackingDataFromState : tracking;

  const stats: Stats = {
    completed: `${actualTracking?.totalAttemptCount ?? 0}`,
    correct: `${actualTracking?.correctMcqCount ?? 0}`,
    wrong: `${actualTracking?.wrongMcqCount ?? 0}`,
    totalTime: actualTracking?.timeTaken || "0",
  };

  const correctPercentage = isExamMode
    ? (actualTracking?.totalAttemptCount > 0 ? Math.round((actualTracking?.correctMcqCount / actualTracking?.totalAttemptCount) * 100) : 0)
    : (tracking?.correctPercentage ?? 0);

  const wrongPercentage = isExamMode
    ? (actualTracking?.totalAttemptCount > 0 ? (100 - correctPercentage) : 0)
    : (tracking?.wrongPercentage ?? 0);


  return (
    <div className="">
      <div className="py-6">
        <div className="w-full space-y-6">
          {/* <div className="flex justify-between items-center">
            <h3 className="text-gray-800 font-medium font-inter text-xl">
              Performance Analysis
            </h3>
          </div> */}
          <div className="flex items-start gap-1">
            <Link to={isExamMode ? "/dashboard/mcq-bank" : "/dashboard/quiz-page"} className="sm:mb-0">
              <ArrowLeft className="mt-0.5" />
            </Link>


            <DashboardHeading
              title="Performance Analysis"
              titleSize="text-xl"
              titleColor="text-[#0A0A0A]"
              description="Analyze quiz performance, track user progress from detailed results"
              descColor="text-[#4A5565]"
              descFont="text-sm"
              className="mb-5"
            />
          </div>

          {isAILoading && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-pulse">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900">AI is crafting your study plan</p>
                <p className="text-xs text-blue-700">Analyzing your weak areas to generate personalized recommendations...</p>
              </div>
            </div>
          )}

          <StatsRow stats={stats} />

          <div className={isExamMode ? "flex justify-center" : "grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6"}>
            <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${isExamMode ? "w-full max-w-2xl mx-auto" : ""}`}>
              <h2 className="text-xl font-bold mb-8 text-[#1A1C1E] font-inter">
                {currentTitle} {isExamMode && subject && `(${subject})`}
              </h2>

              <div className="mb-10">
                <CircularProgress
                  correctPercentage={correctPercentage}
                  incorrectPercentage={wrongPercentage}
                  label="Session Performance"
                />
              </div>

              <ResultsSummary
                completed={actualTracking?.totalAttemptCount ?? 0}
                total={actualTracking?.totalMcqCount ?? 0}
                correct={actualTracking?.correctMcqCount ?? 0}
                incorrect={actualTracking?.wrongMcqCount ?? 0}
                quizId={id}
                justSubmitted={justSubmitted}
                isExamMode={isExamMode}
              />
            </div>

            {!isExamMode && (
              <StudyRecommendations
                isLoading={isAILoading}
                recommendations={tracking?.recommendedContent || {}}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyQuizAnalysisTab;
