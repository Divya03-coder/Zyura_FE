import React from "react";
import {
  LucideIcon, // type for all lucide-react icons
} from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
}

interface CommunityEventHomeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stats?: Stat[];
  buttonText: string;
  buttonIcon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  buttonColor?: string;
  onClick?: () => void;
}

const CommunityEventHomeCard: React.FC<CommunityEventHomeCardProps> = ({
  icon: Icon,
  title,
  description,
  stats = [],
  buttonText,
  buttonIcon: ButtonIcon,
  iconColor = "text-blue-500",
  iconBgColor = "bg-blue-50",
  buttonColor = "bg-blue-600 hover:bg-blue-700",
  onClick,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-300 flex flex-col justify-between gap-4">
      <div>
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        {stats.length > 0 && (
          <div className="space-y-2 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm font-medium"
              >
                <span>{stat.label}</span>
                <span>{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={onClick}
        className={`w-full ${buttonColor} text-white py-2 px-4 rounded font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none`}
      >
        <ButtonIcon className="w-4 h-4" />
        {buttonText}
      </button>
    </div>
  );
};

export default CommunityEventHomeCard;
