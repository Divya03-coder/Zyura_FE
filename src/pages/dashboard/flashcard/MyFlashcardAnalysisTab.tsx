import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Session, Stats } from "@/components/quizOverview/type";
import StatsRow from "@/components/quizOverview/StatsRow";
import CircularProgress from "@/components/quizOverview/CircularProgress";
import ResultsSummary from "@/components/quizOverview/ResultsSummary";
import StudyRecommendations from "@/components/quizOverview/StudyRecommendations";

const sessionsData: Session[] = [
  {
    id: 1,
    name: "Custom session from Aug 1, 11AM",
    source: "AI",
    result: "7/10",
    progress: 70,
    details: {
      completed: 5,
      total: 5,
      correct: 2,
      incorrect: 3,
      recommendations: {
        post_quiz_recommendations: {
          weak_area_level: "Intermediate",
          weak_area_name: "Cardiovascular System",
          why_this_is_commonly_missed: "Lack of clarity in murmur types",
          what_to_review: "Aortic vs Mitral murmurs",
          how_to_practice: "Review clinical cases",
          suggested_references: "Robbins Pathologic Basis",
          mcqs: [],
        },
        flashcards: {
          flashcards: [],
        }
      },
    },
  },
  {
    id: 2,
    name: "Custom session from Aug 1, 12PM",
    source: "Question Bank",
    result: "8/10",
    progress: 80,
  },
];

const overviewStats: Stats = {
  completed: "2/5",
  correct: "40%",
  totalTime: "0h 01m",
};

const MyFlashCardAnalysisTab: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<Session>(
    sessionsData[0]
  );

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Side: Sessions List */}
          <div className="w-full md:w-1/4 space-y-4">
            <h3 className="text-lg text-gray-800 font-medium">All sessions</h3>
            {sessionsData.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-lg shadow cursor-pointer ${selectedSession.id === session.id
                    ? " bg-[#007BFF1F]"
                    : "bg-white"
                  }`}
                onClick={() => setSelectedSession(session)}
              >
                <p className="font-semibold">Quiz: {session.name}</p>
                <p className="text-sm text-gray-600">
                  Source: {session.source}
                </p>
                <p className="text-sm text-gray-600">
                  Result: {session.result}
                </p>
                <Progress
                  value={session.progress}
                  className="mt-2 [&>div]:bg-green-500"
                />
              </div>
            ))}
          </div>

          {/* Right Side: Session Details */}
          <div className="w-full md:w-3/4 space-y-6">
            <h3 className="text-gray-800 font-medium mb-4">
              sessions Analysis
            </h3>
            {selectedSession.details && <StatsRow stats={overviewStats} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSession.details && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-lg font-bold mb-4">
                    {selectedSession.name}
                  </h2>
                  <CircularProgress
                    correctPercentage={40}
                    incorrectPercentage={60}
                    label="Progress"
                  />
                  <ResultsSummary
                    completed={selectedSession.details.completed}
                    total={selectedSession.details.total}
                    correct={selectedSession.details.correct}
                    incorrect={selectedSession.details.incorrect}
                  />
                </div>
              )}

              {selectedSession.details && (
                <StudyRecommendations
                  recommendations={selectedSession.details.recommendations}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFlashCardAnalysisTab;
