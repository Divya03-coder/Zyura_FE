import AlertDialogBox from "@/common/custom/AlertDialogBox";
import CommonDropdown from "@/common/custom/CommonDropdown";
import { MoreVertical } from "lucide-react";

interface TreeActionProps {
  handleDelete: () => Promise<void>;
  isDeleting: boolean;
  handleEdit: () => void;
}

const TreeAction: React.FC<TreeActionProps> = ({
  handleDelete,
  isDeleting,
  handleEdit,
}) => {
  return (
    <CommonDropdown
      trigger={
        <button className="text-[#0A0A0A] hover:text-gray-600 cursor-pointer">
          <MoreVertical className="w-4 h-4" />
        </button>
      }
      items={[
        {
          label: "Edit",
          onClick: handleEdit,
        },
        {
          label: "",
          onClick: () => {},

          component: (
            <AlertDialogBox
              isLoading={isDeleting}
              action={handleDelete}
              trigger={
                <button className="w-full text-left px-2 py-1 text-[#262626] cursor-pointer hover:bg-gray-100">
                  Delete
                </button>
              }
              title="Are you sure you want to delete this subject tree? "
              description="This action cannot be undone, and all associated data will be permanently lost."
            />
          ),
        },
      ]}
    />
  );
};

export default TreeAction;
