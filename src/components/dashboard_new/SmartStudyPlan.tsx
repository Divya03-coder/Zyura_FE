/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  BookOpen,
  Clock,
  RotateCcw,
  FileText,
  Briefcase,
  ClipboardCheck,
} from "lucide-react";
import { useGetStudyPlanQuery } from "@/store/features/studyPlan/studyPlan.api";
import { useNavigate } from "react-router-dom";
import GlobalLoader2 from "@/common/GlobalLoader2";
import { motion } from "framer-motion";

const taskTypeConfig: Record<
  string,
  {
    icon: React.ReactNode;
    color: string;
    buttonText: string;
    buttonBgColor: string;
  }
> = {
  mcqs: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "bg-lime-100 border border-lime-200",
    buttonText: "Start quiz",
    buttonBgColor: "bg-slate-700 hover:bg-slate-700",
  },
  mcq: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "bg-lime-100 border border-lime-200",
    buttonText: "Start quiz",
    buttonBgColor: "bg-slate-700 hover:bg-slate-700",
  },
  flashcards: {
    icon: <RotateCcw className="w-4 h-4" />,
    color: "bg-orange-100 border border-orange-200",
    buttonText: "Review",
    buttonBgColor: "bg-slate-700 hover:bg-slate-700",
  },
  flashcard: {
    icon: <RotateCcw className="w-4 h-4" />,
    color: "bg-orange-100 border border-orange-200",
    buttonText: "Review",
    buttonBgColor: "bg-slate-700 hover:bg-slate-700",
  },
  notes: {
    icon: <FileText className="w-4 h-4" />,
    color: "bg-green-100 border border-green-200",
    buttonText: "Read Notes",
    buttonBgColor: "bg-slate-700 hover:bg-slate-700",
  },
  "clinical cases": {
    icon: <Briefcase className="w-4 h-4" />,
    color: "bg-blue-100 border border-blue-200",
    buttonText: "View Case",
    buttonBgColor: "bg-slate-700 hover:bg-slate-700",
  },
  "clinical case": {
    icon: <Briefcase className="w-4 h-4" />,
    color: "bg-blue-100 border border-blue-200",
    buttonText: "View Case",
    buttonBgColor: "bg-slate-700 hover:bg-slate-700",
  },
  osce: {
    icon: <ClipboardCheck className="w-4 h-4" />,
    color: "bg-teal-100 border border-teal-200",
    buttonText: "Practice",
    buttonBgColor: "bg-slate-700 hover:bg-slate-700",
  },
};

const SmartStudyPlan: React.FC = () => {
  const { data, isLoading } = useGetStudyPlanQuery({});
  const navigate = useNavigate();

  const allStudyPlans = data?.data ?? [];
  console.log(data?.data);

  // Logic to find today's or nearest upcoming plan
  // const todayStr = new Date().toISOString().split("T")[0];

  let todayTasks: any[] = [];
  let currentPlanId = "";
  let currentDayNumber = 1;

  if (allStudyPlans.length > 0) {
    const firstPlan = allStudyPlans[0];
    currentPlanId = firstPlan._id;
    const todayStr = new Date().toISOString().split("T")[0];

    // Find the daily plan entry for today
    const todayPlanEntry = firstPlan.daily_plan?.find((day: any) => {
      if (!day.date) return false;
      return day.date.split("T")[0] === todayStr;
    });

    // If today is found, use its tasks; otherwise, fallback to the first day's tasks
    if (todayPlanEntry) {
      todayTasks = todayPlanEntry.hourly_breakdown || [];
      currentDayNumber = todayPlanEntry.day_number;
    } else {
      todayTasks = []; //firstPlan.daily_plan?.[0]?.hourly_breakdown || [];
      currentDayNumber = firstPlan.daily_plan?.[0]?.day_number || 1;
    }
  }

  const handleStartClick = (task: any) => {
    const contentId = task.suggest_content?.contentId;
    const taskType = task.task_type.toLowerCase();

    const navigationState = {
      planId: currentPlanId,
      day: currentDayNumber,
      suggest_content: contentId,
      from: "home",
    };

    if (taskType === "mcqs" || taskType === "mcq") {
      navigate(`/dashboard/practice-mcq/${contentId}`, {
        state: navigationState,
      });
    } else if (taskType === "flashcards" || taskType === "flashcard") {
      navigate(`/dashboard/solve-flash-card/${contentId}`, {
        state: navigationState,
      });
    } else if (
      taskType === "clinical case" ||
      taskType === "clinical_case" ||
      taskType === "clinical cases"
    ) {
      navigate(`/dashboard/clinical-case/${contentId}`, {
        state: navigationState,
      });
    } else if (taskType === "osce") {
      navigate(`/dashboard/practice-with-checklist/${contentId}`, {
        state: navigationState,
      });
    } else if (taskType === "notes" || taskType === "note") {
      navigate(`/dashboard/notes/${contentId}`, { state: navigationState });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (isLoading)
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow-sm">
        <GlobalLoader2 />
      </div>
    );

  return (
    <div className="bg-blue-50 rounded-lg shadow-sm p-6 h-full flex flex-col border border-slate-200 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Today's Preference
        </h3>
        {/* <span className="text-sm text-gray-500">Completed</span> */}
      </div>

      {/* <div className="mb-6">
        <div className="bg-gray-200 h-2 rounded-full mb-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: "0%" }} // Progress tracking could be added later
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-700">0%</span>
        </div>
      </div> */}

      <div className="flex justify-between items-center mb-4">
        <div>
          {/* <h4 className="font-medium text-gray-900">Today's Plan</h4> */}
          {/* <p
            className="text-xs text-gray-500 truncate max-w-[200px]"
            title={currentPlanSummary}
          >
            {currentPlanSummary}
          </p> */}
        </div>
        {/* {todayTasks.length > 0 && (
          <Link
            to={`/dashboard/weekly-plan/${currentPlanId}`}
            className="text-purple-600 text-sm hover:underline font-medium"
          >
            View All
          </Link>
        )} */}
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {todayTasks.length > 0 ? (
          todayTasks.map((task, i) => {
            const config = taskTypeConfig[task.task_type.toLowerCase()] || {
              icon: <BookOpen className="w-4 h-4" />,
              color: "bg-gray-100 text-gray-700",
              buttonText: "Start",
            };

            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`${config.color} rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`border border-gray-200 bg-white/40 text-nowrap px-2 py-1 rounded text-xs font-medium`}
                    >
                      {task.task_type}
                    </span>
                  </div>
                  <h5
                    className="font-semibold text-black/80 mb-3 line-clamp-2"
                    title={task.description || task.task_type}
                  >
                    {task.description || task.task_type}
                  </h5>
                  <div className="flex flex-wrap flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1 text-nowrap text-sm">
                      <Clock className="w-4 h-4" />
                      {task.duration_hours > 0 && `${task.duration_hours} h `}
                      {task.duration_minutes > 0 && `${task.duration_minutes} m`}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartClick(task)}
                  className={`mt-auto w-full ${
                    task.isCompleted
                      ? "bg-green-600 hover:bg-green-700"
                      : config.buttonBgColor
                  } text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer`}
                >
                  {config.icon}
                  <span className="text-sm">
                    {task.isCompleted ? "Completed" : config.buttonText}
                  </span>
                </motion.button>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-10 text-gray-500 col-span-full">
            No tasks scheduled for today.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SmartStudyPlan;
