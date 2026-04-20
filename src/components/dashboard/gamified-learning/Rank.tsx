import React from "react";
import { Trophy, Flame } from "lucide-react";
import { RankProps } from "./types";

const Rank: React.FC<RankProps> = ({ rank, streak }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-300 mb-6">
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        Level Up Your Medical Learning
      </h2>
      <p className="text-gray-600 mb-4">
        Earn points, unlock badges, and compete with peers while mastering
        medical concepts
      </p>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-yellow-500 rounded-lg">
            <Trophy className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-slate-800">
            Rank #{rank} This Week
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#F87171] rounded-lg">
            <Flame className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-slate-800">
            {streak} Day Streak
          </span>
        </div>
      </div>
    </div>
  );
};

export default Rank;
