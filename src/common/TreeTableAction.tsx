import CommonDropdown from "@/common/custom/CommonDropdown";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import { MoreVertical, Trash2 } from "lucide-react";

interface TreeTableActionProps {
  depth: number;
  onAction: (action: "add" | "rename" | "delete") => Promise<void>;
}

const TreeTableAction: React.FC<TreeTableActionProps> = ({
  depth,
  onAction,
}) => {
  const getActionItems = () => {
    const commonDelete = { 
      label: "Delete", 
      component: (
        <AlertDialogBox
          trigger={
            <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer">
              <Trash2 size={14} />
              Delete
            </button>
          }
          action={() => onAction("delete")}
          isLoading={false}
          title="Are you sure?"
          description="This action cannot be undone. This will permanently delete the node."
        />
      )
    };

    if (depth === 3) {
      return [
        { label: "Rename", onClick: () => onAction("rename") },
        commonDelete,
      ];
    }

    const addLabel = depth === 0 ? "Add System" : depth === 1 ? "Add Topic" : "Add Subtopic";
    return [
      { label: addLabel, onClick: () => onAction("add") },
      { label: "Rename", onClick: () => onAction("rename") },
      commonDelete,
    ];
  };

  return (
    <CommonDropdown
      trigger={
        <button className="text-[#0A0A0A] hover:text-gray-600 cursor-pointer">
          <MoreVertical className="w-4 h-4" />
        </button>
      }
      items={getActionItems()}
    />
  );
};

export default TreeTableAction;

