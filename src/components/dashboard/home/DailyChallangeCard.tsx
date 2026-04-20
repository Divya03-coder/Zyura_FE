import PrimaryButton from "@/components/reusable/PrimaryButton";
import React from "react";
import { PiSealQuestion } from "react-icons/pi";
import { Link } from "react-router-dom";
type DailyChallengeCardProps = {
  mission: string;
  description: string;
  flashcards: string;
  caseCount: string;
  reward: string;
  timeLeft: string;
};

const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  mission,
  description,
  flashcards,
  // caseCount,
  reward,
  timeLeft,
}) => {
  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Daily Challenge</h3>
        <span className="text-blue-500 text-sm">{timeLeft}</span>
      </div>
      <div className="p-4 rounded-lg border border-blue-btn-1/30 mt-4 bg-blue-btn-1/10">
        <div>
          <h4 className="text-base font-semibold text-gray-800">{mission}</h4>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
        <div className="mt-4 flex justify-between space-x-6">
          <div className="flex items-center text-slate-800">
            <span>
              <PiSealQuestion className="w-5 h-5" />
            </span>
            <span className="ml-1">{flashcards} Flashcards</span>
          </div>
          {/* <div className="flex items-center text-gray-600">
            <span>
              <PiSealQuestion className="w-5 h-5" />
            </span>
            <span className="ml-1">Case: {caseCount}</span>
          </div> */}

          <div className="flex md:block items-center gap-2">
            <p className="text-blue-btn-1 text-sm">Rewards</p>
            <span className="text-sm">{reward}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
        <Link to={"/dashboard/gamified-learning/daily-challenges"}>
          <PrimaryButton className="px-4 py-2">Continue Challenge</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default DailyChallengeCard;
