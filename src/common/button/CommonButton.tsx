import React, { type ReactNode } from "react";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type} // Make sure type is passed to the button element
      className={`px-2 sm:px-3 py-2 mx-1 flex-shrink-0 border border-border rounded-md font-medium transition text-[#0F172A] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
