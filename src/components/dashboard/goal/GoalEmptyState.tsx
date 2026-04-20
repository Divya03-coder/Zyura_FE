import React from "react";
import { Target } from "lucide-react";
import { EmptyStateProps } from "./type";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";

export const GoalEmptyState: React.FC<EmptyStateProps> = ({ onSetGoal }) => {
  const user = useSelector(selectUser);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 pb-5">
      <h1 className="text-2xl font-semibold mb-">
        {getGreeting()}, {user?.profile?.firstName}
      </h1>

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Target className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#171717] mb-1 text-center">
            {/* No Goal Set */} {/*No Preference set yet! */} No Plan Set Yet!
          </h2>
          <p className="text-gray-600 text-center">
            {/* Create your first study goal to start tracking your */}
            {/* Create your first preference to start tracking your */}
            Create your first study plan to start tracking your
            <br />
            {/* medical studies progress */} studies progress.
          </p>
        </div>
        <button
          onClick={onSetGoal}
          className="px-10 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          {/* Set your goal */}
          {/* Set your preference */}
          Set your plan
        </button>
      </div>
    </div>
  );
};
