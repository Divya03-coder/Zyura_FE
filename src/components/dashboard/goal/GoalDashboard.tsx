import React from "react";
import { CalendarRange, PencilLine, Target } from "lucide-react";
import { DashboardProps } from "./type";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";
import { useGetGoalOverviewQuery } from "@/store/features/goal/goal.api";

// Dashboard Component
export const GoalDashboard: React.FC<DashboardProps> = ({
  goal,
  onChangeGoal,
}) => {

  const { data: overviewData } = useGetGoalOverviewQuery();
  const accuracy = Number(overviewData?.data?.progress?.overall || 0);
  const completed = Number(goal?.progressPercentage || 0);
  const user = useSelector(selectUser);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  const hhmmToHours = (time: string | number | undefined): number => {
    if (!time) return 0;
    if (typeof time === "number") return time;

    const [hh, mm] = time.split(":").map(Number);
    return (hh || 0) + (mm || 0) / 60;
  };

  const todayHours = hhmmToHours(goal?.todayStudyHours);
  const dailyTarget = goal?.studyHoursPerDay ?? 1;

  return (
    <div className="rounded-lg shadow-sm p-6 bg-[#EFF6FF99] border border-[#93C5FD66]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-black">
          {getGreeting()}, {user?.profile?.firstName}
        </h1>
        <button
          onClick={onChangeGoal}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
        >
          <PencilLine className="w-4 h-4" />
          Change Smart Study Planner
          {/* Change Your Preference */}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"> */}
          <Target className="w-8 h-8 text-gray-500" />
          {/* </div> */}
          <div>
            <div className="font-medium text-gray-500">Your goal:</div>
            <div className="font-medium">{goal.goalName}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"> */}
          <CalendarRange className="w-8 h-8 text-gray-500" />
          {/* </div> */}
          <div>
            <div className="font-medium text-gray-500">Time Left</div>
            <div className="font-medium">
              {goal.daysLeft} {goal.daysLeft === 1 ? "day" : "days"} (
              {goal.remainingHours} hrs) remaining
            </div>
          </div>
        </div>

        {/* <div className="flex items-center gap-3">
          <CircularProgress
            value={goal?.todayStudyHours || 0}
            max={goal?.studyHoursPerDay || 1}
          />

          <div>
            <div className="font-medium text-gray-500">Daily Target</div>
            <div className="font-medium">
              {goal?.todayStudyHours || 0} hrs / {goal.studyHoursPerDay || 0} hrs
            </div>
          </div>
        </div> */}

        <div className="flex items-center gap-3">
          <CircularProgress
            value={todayHours}
            max={dailyTarget}
          />

          <div>
            <div className="font-medium text-gray-500">Daily Target</div>
            <div className="font-medium">
              {goal?.todayStudyHours || "00:00"} hrs / {dailyTarget} hrs
            </div>
          </div>
        </div>


        {/* <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Clock className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <div className="font-medium text-gray-500">Daily Target</div>
            <div className="font-medium">{goal?.todayStudyHours} hrs / {goal.studyHoursPerDay} hrs</div>
          </div>
        </div> */}
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-zinc-700">Progress %</span>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
              <span className="font-medium text-zinc-700">
                Accuracy {(accuracy || 0).toFixed(2)}%
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
              <span className="font-medium text-zinc-700">
                Completed {(completed || 0).toFixed(2)}%
              </span>
            </span>
          </div>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
          <div className="h-full flex transition-all duration-500">
            {/* Sequential Display: Smaller metric value first, then the extra portion of the larger metric. */}
            {(accuracy || 0) < (completed || 0) ? (
              <>
                {/* Accuracy is smaller; show it first (Blue-600) then extra completion (Blue-400) */}
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${accuracy || 0}%` }}
                  title={`Accuracy: ${(accuracy || 0).toFixed(2)}%`}
                ></div>
                <div
                  className="bg-blue-400 h-full transition-all duration-500"
                  style={{
                    width: `${(completed || 0) - (accuracy || 0)}%`,
                  }}
                  title={`Extra Completion: ${(
                    (completed || 0) - (accuracy || 0)
                  ).toFixed(2)}%`}
                ></div>
              </>
            ) : (
              <>
                {/* Completion is smaller; show it first (Blue-400) then extra accuracy (Blue-600) */}
                <div
                  className="bg-blue-400 h-full transition-all duration-500"
                  style={{ width: `${completed || 0}%` }}
                  title={`Completed: ${(completed || 0).toFixed(2)}%`}
                ></div>
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{
                    width: `${(accuracy || 0) - (completed || 0)}%`,
                  }}
                  title={`Extra Accuracy: ${(
                    (accuracy || 0) - (completed || 0)
                  ).toFixed(2)}%`}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max,
  size = 48,
  strokeWidth = 6,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference - progress * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="transparent"
      />

      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#22c55e"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
};
