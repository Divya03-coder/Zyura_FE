import React from "react";

interface OverviewCardProps {
  icon: React.ElementType; // ✅ pass any Lucide or React icon
  iconColor?: string;
  iconBg?: string;
  topText: string | number;
  bottomText: string;
  note?: string;
  onClick?: () => void; // optional clickable card
}

const TestOverviewCard: React.FC<OverviewCardProps> = ({
  icon: Icon,
  iconColor = "text-blue-700",
  iconBg = "bg-blue-100",
  topText,
  bottomText,
  note,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`max-w-[350px flex items-center gap-5 bg-white border border-slate-300 rounded-[12px] py-7 px-4 cursor-${
        onClick ? "pointer" : "default"
      } transition shadow-md hover:drop-shadow-lg`}
    >
      <div
        className={`${iconBg} p-3 rounded-[6px] flex items-center justify-center`}
      >
        <Icon className={`${iconColor} w-6 h-6`} />
      </div>
      <div>
        <p className="text-xl text-[#0A0A0A] font-semibold">{topText}</p>
        <p className="text-lg text-[#4A5565] font-medium">{bottomText}</p>
        <p className="text-xs text-slate-500">{note}</p>
      </div>
    </div>
  );
};

export default TestOverviewCard;
