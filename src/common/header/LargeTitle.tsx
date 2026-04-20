import { type FC, type ReactNode } from "react";

interface LargeTitleProps {
  children: ReactNode;
  className?: string; // optional extra styles
}

const LargeTitle: FC<LargeTitleProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`text-xl md:text-3xl font-semibold tracking-[-0.225px] text-black font-inter leading-normal md:leading-[36px] ${className}`}
    >
      {children}
    </div>
  );
};

export default LargeTitle;
