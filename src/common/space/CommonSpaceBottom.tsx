import React, { type ReactNode } from "react";

interface CommonSpaceBottom {
  children: ReactNode;
  className?: string;
}

const CommonSpaceBottom: React.FC<CommonSpaceBottom> = ({
  children,
  className,
}) => {
  return <div className={`pb-18 ${className}`}>{children}</div>;
};

export default CommonSpaceBottom;
