interface OverviewCardProps {
  icon: React.ElementType; // ✅ pass any Lucide or React icon
  iconColor?: string;
  iconBg?: string;
  value: string | number;
  bottomText: string;
  onClick?: () => void; // optional clickable card
}

const MentorOverviewCard: React.FC<OverviewCardProps> = ({
  icon: Icon,
  iconColor = "text-blue-700",
  iconBg = "bg-blue-100",
  value,
  bottomText,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full flex-1 flex flex-col justify-between gap-5 bg-white border border-slate-300 rounded-[8px] py-3 px-4 ${
        onClick ? "cursor-pointer" : "cursor-default"
      } transition shadow-md hover:drop-shadow-lg`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`${iconBg} p-3 rounded-[6px] flex items-center justify-center`}
        >
          <Icon className={`${iconColor} w-6 h-6`} />
        </div>
        <p className="text-xl text-[#0A0A0A] font-semibold">{value}</p>
      </div>
      <div>
        <p className="text-lg text-[#4A5565] font-medium">{bottomText}</p>
      </div>
    </div>
  );
};

export default MentorOverviewCard;
