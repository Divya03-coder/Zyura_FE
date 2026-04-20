import { X } from "lucide-react";
import { FC } from "react";

interface ModalCloseButtonProps {
  onClick: () => void;
  className?: string;
}

const ModalCloseButton: FC<ModalCloseButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer ${className}`}
    >
      <X className="w-5 h-5" />
    </button>
  );
};

export default ModalCloseButton;
