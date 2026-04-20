// components/WeeklyPlan.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  MinusCircle,
} from "lucide-react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import DashboardHeading from "@/components/reusable/DashboardHeading";
// import image1 from "@/assets/dashboard/planImage.png";
import { useGetStudyPlanQuery } from "@/store/features/studyPlan/studyPlan.api";
import GlobalLoader2 from "@/common/GlobalLoader2";
import { toast } from "sonner";



interface HourlyBreakdown {
  task_type: string;
  duration_hours: number;
  duration_minutes: number;
  suggest_content: { // Updated to object
    contentId: string;
    limit: number;
  };
  isCompleted: boolean;
  description: string; // Added description
}

interface DailyPlan {
  day_number: number;
  date: string;
  total_hours: number;
  topics: string[];
  hourly_breakdown: HourlyBreakdown[];
  isCompleted?: boolean;
}

interface StudyPlanData {
  _id: string;
  plan_summary: string;
  total_days: number;
  daily_plan: DailyPlan[];
  createdAt: string;
  updatedAt: string;
}

export default function WeeklyPlan() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get plan from route state first, otherwise fetch all and filter
  // Always fetch latest data to ensure status updates are reflected
  const { data, isLoading } = useGetStudyPlanQuery({});

  // Use state plan only as initial placeholder, preferring fresh data
  const planFromState = location.state?.plan as StudyPlanData | undefined;

  const studyPlan: StudyPlanData | undefined =
    data?.data?.find((p: StudyPlanData) => p._id === id) || planFromState;

  // Refetch on mount/focus to ensure sync
  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  const getDayName = (dayNumber: number) => {
    return `Day ${dayNumber}`;
  };

  const getDayAbbrev = (dayNumber: number) => {
    return `D${dayNumber}`;
  };



  const handleStartWithContent = (taskTypeStr: string, contentId: string, dayNumber: number) => {
    const taskType = taskTypeStr.toLowerCase();

    if (!contentId) {
      toast.warning("Content ID is not available");
      return;
    }

    const navigationState = {
      planId: studyPlan?._id,
      day: dayNumber,
      suggest_content: contentId,
      from: "weekly-plan",
    };

    console.log("Navigating with state:", navigationState);

    if (taskType === "mcqs" || taskType === "mcq") {
      navigate(`/dashboard/practice-mcq/${contentId}`, {
        state: navigationState,
      });
    } else if (taskType === "flashcards" || taskType === "flashcard") {
      navigate(`/dashboard/solve-flash-card/${contentId}`, {
        state: navigationState,
      });
    } else if (taskType === "clinical case" || taskType === "clinical_case") {
      navigate(`/dashboard/clinical-case/${contentId}`, {
        state: navigationState,
      });
    } else if (taskType === "osce") {
      navigate(`/dashboard/practice-with-checklist/${contentId}`, {
        state: navigationState,
      });
    } else if (taskType === "notes" || taskType === "note") {
      navigate(`/dashboard/notes/${contentId}`, {
        state: navigationState,
      });
    } else {
      // Default fallback - you can adjust this based on your needs
      console.log("Unknown task type:", taskType);
    }
  };

  if (isLoading && !planFromState) {
    return <GlobalLoader2 />;
  }

  if (!studyPlan) {
    return (
      <div className="mb-10 bg-slate-50">
        <div className="flex items-center gap-3">
          <Link to={"/dashboard/smart-study"} className="mb-7">
            <ArrowLeft />
          </Link>
          {/* <Link to={"/dashboard/my-plan"} className="mb-7">
            <ArrowLeft />
          </Link> */}
          <DashboardHeading
            title="Study Plan Not Found"
            titleSize="text-xl"
            description="The requested study plan could not be found."
            className="mt-12 mb-12 space-y-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 bg-slate-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* <Link to={"/dashboard/my-plan"} className="mb-7">
            <ArrowLeft />
          </Link> */}
          <Link to={"/dashboard/smart-study"} className="mb-7">
            <ArrowLeft />
          </Link>
          <DashboardHeading
            title={studyPlan.plan_summary}
            // title={studyPlan.plan_summary.length > 50 ? studyPlan.plan_summary.substring(0, 50) + "..." : studyPlan.plan_summary}
            titleSize="text-xl"
            description={`Total Days: ${studyPlan.total_days}`}
            className="mt-12 mb-12 space-y-1"
          />
        </div>
        {/* <p className="text-lg text-white font-semibold bg-green-700 rounded-full pt-0.5 px-2.5">
          Active
        </p> */}
      </div>

      {/* <div className="flex items-center gap-3 px-7 py-3 border border-blue-500 bg-blue-50 rounded-[8px] my-12">
        <Target className="text-blue-600 bg-blue-200 p-2 rounded-full w-10 h-10" />
        <div>
          <h3 className="text-[#1C398E] mb-2">
            Plan Updated Based on Performance
          </h3>
          <p className="text-sm text-[#1447E6]">
            Your recent quiz performance indicated weakness in PUD and GERD
            management. I've added a focused review session for tomorrow
            morning.
          </p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-3">
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="flex items-center justify-between mb-5">
              <h2 className="text-xl text-[#0A0A0A] font-semibold">
                Your Preference
              </h2>
              {/* <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                                        <Filter className="w-4 h-4 mr-1" /> Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>This Week</DropdownMenuItem>
                                    <DropdownMenuItem>Next Week</DropdownMenuItem>
                                    <DropdownMenuItem>Completed</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu> */}
            </CardHeader>
            <CardContent>
              {/* Day Status Summary */}
              <div className="grid grid-cols-7 gap-2 mb-10">
                {studyPlan.daily_plan.map((dayPlan) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  // Ensure date is treated as local time by appending T00:00:00 if it's just a date string
                  const dateStr = dayPlan.date.includes('T') ? dayPlan.date : `${dayPlan.date}T00:00:00`;
                  const planDate = new Date(dateStr);
                  planDate.setHours(0, 0, 0, 0);

                  const isToday = planDate.getTime() === today.getTime();
                  const isPast = planDate.getTime() < today.getTime();

                  let statusIcon;
                  let colorClass = "";

                  if (dayPlan.isCompleted) {
                    statusIcon = <CheckCircle className="w-4 h-4" />;
                    colorClass = "text-green-600 border-green-500 bg-green-50";
                  } else if (isToday) {
                    statusIcon = <Clock className="w-4 h-4" />;
                    colorClass = "text-yellow-500 border-yellow-400 bg-yellow-50";
                  } else if (isPast) {
                    statusIcon = <XCircle className="w-4 h-4" />;
                    colorClass = "text-red-500 border-red-400 bg-red-50";
                  } else {
                    statusIcon = <MinusCircle className="w-4 h-4" />;
                    colorClass = "text-gray-400 border-gray-300 bg-gray-50";
                  }

                  return (
                    <div
                      key={dayPlan.day_number}
                      className="flex flex-col items-center text-sm font-medium"
                    >
                      <span className="text-xs mb-1">
                        {getDayAbbrev(dayPlan.day_number)}
                      </span>
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full border ${colorClass}`}
                      >
                        {statusIcon}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border border-slate-300 p-7 rounded-[8px] bg-white shadow">
                <div className="flex justify-between items-center mb-7">
                  <p>Preference Overview</p>
                  <p className="text-white bg-green-600 px-1.5 sm:px-3 py-1 text-sm sm:text-base rounded">
                    Active
                  </p>
                </div>
                {/* Detailed Plan */}
                <div className="space-y-6">
                  {studyPlan.daily_plan.map((dayPlan) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    // Ensure date is treated as local time
                    const dateStr = dayPlan.date.includes('T') ? dayPlan.date : `${dayPlan.date}T00:00:00`;
                    const planDate = new Date(dateStr);
                    planDate.setHours(0, 0, 0, 0);

                    const isToday = planDate.getTime() === today.getTime();
                    const isPast = planDate.getTime() < today.getTime();
                    const isFuture = planDate.getTime() > today.getTime();

                    let sectionBgClass = "bg-white border-slate-300";

                    if (dayPlan.isCompleted) {
                      sectionBgClass = "bg-green-50 border-green-200";
                    } else if (isToday) {
                      sectionBgClass = "bg-yellow-50 border-yellow-200";
                    } else if (isPast && !dayPlan.isCompleted) {
                      sectionBgClass = "bg-red-50 border-red-200";
                    }

                    return (
                      <div
                        key={dayPlan.day_number}
                        className={`space-y-3 border p-4 rounded-[8px] ${sectionBgClass}`}
                      >
                        <h3 className="text-lg font-semibold">
                          {getDayName(dayPlan.day_number)} –{" "}
                          {new Date(dayPlan.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </h3>
                        {/* <p className="text-sm text-gray-500">
                          Topics: {dayPlan.topics.join(", ")} | Total Hours:{" "}
                          {dayPlan.total_hours}
                        </p> */}
                        {dayPlan.hourly_breakdown.length > 0 ? (
                          <div className="space-y-3">
                            {dayPlan.hourly_breakdown.map((session, idx) => {
                              const isSessionCompleted = session.isCompleted;

                              // Use the day's Topic as the title, fallback to description or task type
                              // Trying to match the "clean" title from the image
                              // const rowTitle = dayPlan.topics.length > 0 ? dayPlan.topics[0] : session.description;
                              const rowTitle = session.description;

                              return (
                                <div
                                  key={idx}
                                  className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-md border border-slate-300 ${isSessionCompleted ? "bg-green-100 border border-green-200" : "bg-white"
                                    }`}
                                >
                                  <div className="mb-2 sm:mb-0">
                                    <h4 className="font-semibold text-gray-900 text-base">
                                      {rowTitle}
                                    </h4>
                                    {/* <p className="text-sm text-gray-500 mt-0.5">
                                      {session.task_type} • {session.duration_hours}h
                                    </p> */}
                                    <p className="text-sm text-gray-500 mt-0.5">
                                      {[
                                        session.task_type,
                                        session.duration_hours && `${session.duration_hours}h`,
                                        session.duration_minutes && `${session.duration_minutes}m`,
                                      ]
                                        .filter(Boolean)
                                        .join(" • ")}
                                    </p>

                                  </div>

                                  <Button
                                    size="sm"
                                    disabled={!isSessionCompleted && isFuture}
                                    onClick={() => handleStartWithContent(session.task_type, session.suggest_content.contentId, dayPlan.day_number)}
                                    className={`cursor-pointer ${isSessionCompleted
                                      ? "bg-green-600 text-white hover:bg-green-700 border border-green-200"
                                      : isFuture
                                        ? "bg-white text-gray-400 border border-gray-200 cursor-not-allowed"
                                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                      } min-w-[80px] font-medium shadow-none transition-colors`}
                                  >
                                    {isSessionCompleted ? "complete" : isFuture ? "Locked" : "Start"}
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No tasks for this day
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        {/* <div className=" col-span-2">
          <div className="border border-slate-300 p-6 rounded-[8px]">
            <h3 className="flex items-center gap-2 mb-7 text-xl text-[#111827]">
              <img src={image1} alt="" className="w-5" /> AI Recommendations
            </h3>
            <div className="space-y-4">
              <Card className="border-yellow-300 bg-[#FEF08A]">
                <CardHeader>
                  <CardTitle className="text-yellow-900">
                    Targeted MCQs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#CA8A04] mb-2">
                    Focus quiz on Gastric & Duodenal Pathology MCQs
                  </p>
                  <Button
                    size="sm"
                    className="text-yellow-600 bg-white cursor-pointer"
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-blue-300 bg-[#BFDBFE]">
                <CardHeader>
                  <CardTitle className="text-blue-700">Clinical Case</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#1D4ED8] mb-2">
                    Patient with Chronic Dyspepsia case study
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#2563EB] cursor-pointer"
                  >
                    View Case
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-green-300 bg-[#BBF7D0]">
                <CardHeader>
                  <CardTitle className="text-green-700">
                    Download Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#15803D] mb-2">
                    Pharmacological Management of Acid-Peptic Disorders
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#16A34A] cursor-pointer"
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-purple-300 bg-[#E9D5FF]">
                <CardHeader>
                  <CardTitle className="text-purple-700">AI Tutor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#7E22CE] mb-2">
                    Quick clarification on PPI mechanisms?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#9333EA] cursor-pointer"
                  >
                    Chat Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
