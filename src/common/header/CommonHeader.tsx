import React from "react";

interface CommonHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2
      className={`text-base  leading-[24px] font-inter font-medium text-black ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export default CommonHeader;
