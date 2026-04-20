import React, { type ReactNode } from "react";

interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-sm text-[#0A0A0A] leading-[20px] font-geist  ${className}`}
    >
      {children}
    </h2>
  );
};

export default Paragraph;
