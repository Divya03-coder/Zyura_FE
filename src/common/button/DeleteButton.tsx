import { RiDeleteBinLine } from "react-icons/ri";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

const DeleteButton = ({
  onDelete,
  isLoading = false,
  className = "",
}: DeleteButtonProps) => {
  const handleClick = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`text-[#B91C1C] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <RiDeleteBinLine size={24} />
    </button>
  );
};

export default DeleteButton;
