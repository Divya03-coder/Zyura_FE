import React from "react";
import BigTitle from "@/common/header/BigTitle";
import CommonHeader from "@/common/header/CommonHeader";

interface CurveCardProps {
  value: string | number;
  title: string;
  icon: string; // image src
  bgColor?: string; // optional background color for the curve
  curveColor?: string; // optional curve color
  textColor?: string; // optional curve color
  opacity: string; // optional curve color
}

const CurveCard: React.FC<CurveCardProps> = ({
  value,
  title,
  icon,
  bgColor,
  curveColor,
  textColor,
  opacity,
}) => {
  return (
    <div className={` !rounded-[10px] overflow-hidden ${bgColor} ]`}>
      <div className="relative">
        {/* Curve background */}
        <div
          className={`absolute inset-0 w-[130px] h-full ${curveColor} rounded-br-[100%] ${opacity} z-0`}
        ></div>

        {/* Content on top */}
        <div className="relative flex items-center justify-between p-2 z-10">
          <div className="space-y-2.5 p-8">
            <BigTitle className={`${textColor}`}>{value}</BigTitle>
            <CommonHeader
              className={`!text-base font-medium ${textColor} !leading-[28px]`}
            >
              {title}
            </CommonHeader>
          </div>
          <div className="w-12 h-12 self-end">
            <img className="w-full h-full" src={icon} alt="dollar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurveCard;
