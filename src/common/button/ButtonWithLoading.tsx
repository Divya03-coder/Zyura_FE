import { FC } from "react";

interface ButtonWithLoadingProps {
  title?: string;
  textColor?: string;
  borderColor?: string;
}
const ButtonWithLoading: FC<ButtonWithLoadingProps> = ({
  title,
  textColor,
  borderColor,
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-2  text-sm text-white ${textColor}`}
    >
      <div
        className={`w-4 h-4 border-2 border-white ${borderColor} border-t-transparent rounded-full animate-spin`}
      />
      <span>{title}</span>
    </div>
  );
};

export default ButtonWithLoading;
