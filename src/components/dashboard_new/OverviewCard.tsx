import React from "react";

interface OverviewCardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  footerText?: string;
  variant?: "purple" | "orange" | "green";
  className?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  icon,
  title,
  subtitle,
  stats,
  footerText,
  variant = "purple",
  className = "",
}) => {


  const themes = {
    purple: {
      bg: "bg-purple-100",
      border: "border-purple-300",
      iconBg: "bg-purple-100",
      labelColor: "text-[#4A5565]",
    },
    orange: {
      bg: "bg-orange-100",
      border: "border-orange-300",
      iconBg: "bg-orange-100",
      labelColor: "text-[#4A5565]",
    },
    green: {
      bg: "bg-green-100",
      border: "border-green-300",
      iconBg: "bg-green-100",
      labelColor: "text-[#4A5565]",
    },
  };

  const theme = themes[variant];

  return (
    <div
      className={`flex flex-col rounded-2xl overflow-hidden border-[1.5px] ${theme.border} ${theme.bg} h-full transition-all duration-300 hover:shadow-md ${className}`}
    >

      {/* Top Section */}
      <div className={`p-5 flex-1`}>
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-[8px] ${theme.iconBg} flex items-center justify-center shadow-sm text-xl`}
          >
            {icon}
          </div>

          <div>
            <p className={`text-sm font-normal ${theme.labelColor} mb-0.5`}>
              {subtitle}
            </p>
            <h4 className="text-lg font-medium text-[#0A0A0A] leading-tight text-nowrap">
              {title}
            </h4>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white p-5 border-t rounded-2xl border-inherit min-h-[85px] flex items-center">
        {stats ? (
          <div className="grid grid-cols-3 w-full">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`text-center flex flex-col justify-center`}
              >
                <p className="text-[14px] font-medium text-[#0A0A0A]">
                  {stat.value}
                </p>
                <p className="text-[12px] font-normal text-[#4A5565] whitespace-nowrap mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full">
            <p className="text-[13px] text-[#475467] text-center leading-relaxed px-2">
              {footerText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewCard;

