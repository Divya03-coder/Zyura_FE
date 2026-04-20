import React from "react";
import { Target, CheckCircle, TrendingUp, Flame } from "lucide-react";
import { ScoreboardProps, Metric } from "./types";
import { FaRobot } from "react-icons/fa";

const Scoreboard: React.FC<ScoreboardProps> = ({
  accuracy,
  completeTests,
  consistency,
  streakDays,
}) => {
  const metrics: Metric[] = [
    {
      title: "Accuracy",
      value: `${accuracy}%`,
      icon: Target,
      color: "bg-blue-50 text-blue-600",
      iconColor: "text-blue-700",
      bgColor: "bg-[#EFF6FF]",
    },
    {
      title: "Complete Test",
      value: completeTests,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Consistency",
      value: `${consistency}%`,
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Streak Tracking",
      value: `${streakDays} Days in a Row`,
      icon: Flame,
      color: "bg-orange-50 text-orange-600",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Scoreboard</h3>
        <span className="text-sm text-[#4B5563] font-medium flex gap-2 items-center">
          <FaRobot className="w-4 h-4 text-blue-700" />
          AI-Powered Analytics
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`${metric.bgColor} p-4 rounded-lg shadow-sm border border-gray-100 text-center`}
          >
            <div className="flex items-center justify-center mb-2">
              <div className={`p-1 rounded-lg ${metric.color}`}>
                <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
              </div>
            </div>
            <p className="text-sm text-[#4B5563] mb-1">{metric.title}</p>
            <p className={`text-xl font-semibold ${metric.color}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
