import type { ReactNode } from "react";

interface CommonBorderWrapper {
  children: ReactNode;
  className?: string;
}

const CommonBorderWrapper: React.FC<CommonBorderWrapper> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-full border border-[#CBD5E1] p-4 md:p-7.5 rounded-2xl bg-white ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonBorderWrapper;
