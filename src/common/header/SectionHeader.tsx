import React from "react";
import LandingTitle from "@/common/header/LandingTitle";
import MediumHeader from "@/common/header/MediumHeader";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`text-center ${className}`}>
      <LandingTitle className="mb-2">{title}</LandingTitle>
      {subtitle && (
        <MediumHeader className="!text-[#334155]">{subtitle}</MediumHeader>
      )}
    </div>
  );
};

export default SectionHeader;
