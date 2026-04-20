import { BookOpen, Clock, Heart, Play, Target } from "lucide-react";
import { Link } from "react-router-dom";

export interface OSCECardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  scenario: string;
  steps: string; // "3 steps"
  videos: string; // "2 videos"
  duration: string; // "~15 min" or "8 minutes"
  isComplete?: boolean;
  onWatchTutorial: () => void;
  onPractice: () => void;
}

const OSCECard = ({
  id,
  title,
  subtitle,
  description,
  scenario,
  steps,
  videos,
  duration,
  isComplete,
  onWatchTutorial,
  onPractice,
}: OSCECardProps) => {
  return (
    <div className="w-full bg-white border-2 border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-slate-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-[#DBEAFE] p-3 rounded-xl flex-shrink-0">
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="uppercase tracking-wide text-[#0A0A0A] font-semibold text-sm md:text-base truncate">
                {title}
              </h2>
              <span className="inline-block mt-1 text-sm md:text-base font-medium text-black-2 bg-[#ECEEF2] px-2 py-1 rounded">
                {subtitle}
              </span>
            </div>
          </div>
          {isComplete && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-400">
              Completed
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 mb-4 text-[#717182] text-sm md:text-base">
          {description}
        </p>

        {/* Scenario */}
        <div className="mt-4 bg-[#ECECF0] px-3 py-2 rounded-lg">
          <h3 className="font-semibold text-[#0A0A0A] mb-1 text-sm md:text-base">
            Scenario:
          </h3>
          <p className="text-xs md:text-sm text-[#717182]">{scenario}</p>
        </div>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-3 md:gap-4">
          <div className="flex items-center gap-1 text-gray-500 text-xs md:text-sm">
            <Target className="w-3 h-3 md:w-4 md:h-4" />
            <span>{steps}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs md:text-sm">
            <Play className="w-3 h-3 md:w-4 md:h-4" />
            <span>{videos}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs md:text-sm">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-2">
          <button
            onClick={onWatchTutorial}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-slate-300 text-[#0A0A0A] text-xs md:text-sm font-medium rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            <span>Watch Tutorial</span>
          </button>

          <Link
            to={`/dashboard/practice-with-checklist/${id}`}
            className="w-full"
          >
            <button
              onClick={onPractice}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-700 text-white text-xs md:text-sm font-medium rounded-md hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              <Target className="w-4 h-4 md:w-5 md:h-5" />
              <span>Practice</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OSCECard;
