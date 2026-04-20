import React, { type ReactNode } from "react";

interface CommonHeaderProps {
  children: ReactNode;
  className?: string;
}

const BigTitle: React.FC<CommonHeaderProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-base sm:text-[26px] leading-[28px] font-Geist text-[#0891B2] font-semibold ${className}`}
    >
      {children}
    </h2>
  );
};

export default BigTitle;
