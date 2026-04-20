import React, { type ReactNode } from "react";

interface SubHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <h2
      className={`text-sm lg:text-base text-[#111827] font-medium  font-Geist leading-[24px] ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export default SubHeader;
