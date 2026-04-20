import CommonDropdown from "@/common/custom/CommonDropdown";
import { MoreVertical } from "lucide-react";

interface TreeTableActionProps {
  depth: number;
  onAction: (action: "add" | "rename" | "delete") => void;
}

const TreeTableAction: React.FC<TreeTableActionProps> = ({
  depth,
  onAction,
}) => {
  const actionLabels =
    depth === 3
      ? [
          { label: "Rename", action: "rename" },
          { label: "Delete", action: "delete" },
        ]
      : ([
          depth === 0
            ? { label: "Add System", action: "add" }
            : depth === 1
            ? { label: "Add Topic", action: "add" }
            : { label: "Add Subtopic", action: "add" },
          { label: "Rename", action: "rename" },
          { label: "Delete", action: "delete" },
        ] as const);

  return (
    <CommonDropdown
      trigger={
        <button className="text-[#0A0A0A] hover:text-gray-600 cursor-pointer">
          <MoreVertical className="w-4 h-4" />
        </button>
      }
      items={actionLabels.map((item) => ({
        label: item.label,
        onClick: () => onAction(item.action as "add" | "rename" | "delete"),
      }))}
    />
  );
};

export default TreeTableAction;
