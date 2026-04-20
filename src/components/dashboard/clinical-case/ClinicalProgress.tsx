import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { Clock, Star, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // Assuming ShadCN UI has a Progress component

interface ProgressProps {
  weeklyGoal: number;
  completedCases: number;
  timeSpent: number;
  badges: string[];
}

const ClinicalProgress = ({
  weeklyGoal,
  completedCases,
  timeSpent,
  badges,
}: ProgressProps) => {
  const progress = (completedCases / weeklyGoal) * 100;

  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow">
      {/* Header */}
      <PrimaryHeading
        title="Your Progress"
        icon={<Target size={20} />}
        iconColor="text-black"
      />

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between gap-3">
          <p>Weekly Goal Progress:</p>
          <p>
            {completedCases}/{weeklyGoal} cases
          </p>
        </div>
        <Progress value={progress} color="black" className="mt-2" />
      </div>

      {/* Time Spent */}
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div>
            <Clock className="w-5 h-5 text-slate-800"/>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Time Spent</p>
            <p className="text-sm font-medium text-gray-700">{timeSpent} minutes</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-zinc-500">Recent Badges</p>
          <div className="flex gap-2 mt-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs  rounded-lg text-gray-900 bg-slate-100 border border-gray-200 flex items-center gap-1"
              >
                <Star className="w-3 h-3" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalProgress;
