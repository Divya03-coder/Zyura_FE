import MediumHeader from "@/common/header/MediumHeader";
import MiniTitle from "@/common/header/MiniTitle";
import Paragraph from "@/common/header/Paragraph";
import type { LucideIcon } from "lucide-react";
import { FC, ReactNode } from "react";
import { FaRegStar } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

interface StatCardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  icon?: LucideIcon | IconType;
  subtitleColor?: string;
  iconColor?: string;
  className?: string;
  children?: ReactNode;
  star?: boolean;
  des?: string;
}

const DashBoardCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  subtitleColor = "text-green-600",
  iconColor = "text-blue-500",
  className = "",
  star,
  children,
  des,
}) => {
  return (
    <div className={`bg-white border border-border rounded-xl ${className}`}>
      <div className="p-4 md:p-6">
        {children ? (
          children
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              {title && <Paragraph className="">{title}</Paragraph>}
              {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
            </div>
            <div className="space-y-1">
              {value !== undefined && (
                <MediumHeader className=" !font-bold">{value}</MediumHeader>
              )}
              <div className="flex items-center gap-1">
                {" "}
                {star && (
                  <span className="text-[#CA8A04]">
                    <FaRegStar />
                  </span>
                )}
                <div className="flex flex-col ">
                  {des && <MiniTitle className={` `}>{des}</MiniTitle>}
                  {subtitle && (
                    <MiniTitle className={` ${subtitleColor}`}>
                      {subtitle}
                    </MiniTitle>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoardCard;
