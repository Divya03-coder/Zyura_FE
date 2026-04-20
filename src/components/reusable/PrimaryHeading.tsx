import { ReactNode } from "react";

type PrimaryHeadingProps = {
  title: string;
  icon?: ReactNode;
  className?: string;
  iconColor?: string;
};

const PrimaryHeading: React.FC<PrimaryHeadingProps> = ({
  title,
  icon,
  className,
  iconColor = "text-blue-main",
}) => {
  return (
    <div
      className={`flex items-center gap-2 text-xl font-medium ${
        className || ""
      }`}
    >
      {icon && <span className={` ${iconColor}`}>{icon}</span>}
      <h2 className="text-slate-800">{title}</h2>
    </div>
  );
};

export default PrimaryHeading;
