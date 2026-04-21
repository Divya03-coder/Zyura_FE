import { RiDeleteBinLine } from "react-icons/ri";
import AlertDialogBox from "@/common/custom/AlertDialogBox";

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
  return (
    <AlertDialogBox
      trigger={
        <button
          disabled={isLoading}
          className={`text-[#B91C1C] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
          <RiDeleteBinLine size={24} />
        </button>
      }
      action={onDelete}
      isLoading={isLoading}
      title="Are you sure?"
      description="This action cannot be undone. This will permanently delete the item."
    />
  );
};

export default DeleteButton;

