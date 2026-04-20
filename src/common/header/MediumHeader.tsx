import { type FC, type ReactNode } from "react";

interface LargeTitleProps {
  children: ReactNode;
  className?: string; // optional extra styles
}

const MediumHeader: FC<LargeTitleProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`text-lg md:text-2xl font-semibold  text-black  md:leading-[32px] font-inter ${className}`}
    >
      {children}
    </div>
  );
};

export default MediumHeader;
