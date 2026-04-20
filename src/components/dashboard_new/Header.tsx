import React from "react";
import { Target } from "lucide-react";
import PrimaryButton from "../reusable/PrimaryButton";

interface HeaderProps {
  userName: string;
  goal: string;
  dailyTarget: string;
}

const Header: React.FC<HeaderProps> = ({ userName, goal, dailyTarget }) => {
  return (
    <div className="bg-[#EFF6FF99]/60 border border-[#93C5FD66]/40 rounded-lg shadow-sm p-6 space-y-6 mb-6">
      {/* Row 1: Greeting */}
      <div className="flex justify-between items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold text-gray-900 ">
            Good Morning, {userName}!
          </h1>

          <div className="flex items-center gap-3 mt-2 flex-wrap sm:flex-nowrap">
            <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-white">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm text-gray-600 truncate">Your goal:</div>
              <div className="font-medium text-gray-900 truncate">{goal}</div>
            </div>
          </div>
        </div>

        {/* Daily Target */}
        <div className="flex items-center gap-3 mt-4 sm:mt-0 flex-shrink-0">
          <div className="text-right hidden sm:block min-w-[80px]">
            <div className="text-sm text-gray-500 truncate">Daily Target:</div>
            <div className="text-sm font-medium text-zinc-700 truncate">
              {dailyTarget}
            </div>
          </div>
          <div className="w-16 h-16 relative flex-shrink-0">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#e5e7eb"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
                strokeDasharray="176"
                strokeDashoffset="44"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Personalize Learning & Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            Personalize Your Learning
          </h2>
          <p className="text-gray-600 text-sm ">
            Choose your subjects, systems, and style to get tailored quizzes and
            notes.
          </p>
        </div>
        <PrimaryButton className="shrink-0">Set Preference</PrimaryButton>
      </div>
    </div>
  );
};

export default Header;
