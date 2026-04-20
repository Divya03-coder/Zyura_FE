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
      className={`w-full border border-border p-5 rounded-[10px] bg-white ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonBorderWrapper;
