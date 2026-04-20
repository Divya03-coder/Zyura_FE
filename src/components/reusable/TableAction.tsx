import CommonDropdown from "@/common/custom/CommonDropdown";
import { MoreVertical } from "lucide-react";

interface TableActionProps {
  handleDelete: () => void;
  handleEdit: () => void;
}
const TableAction: React.FC<TableActionProps> = ({
  handleDelete,
  handleEdit,
}) => {
  return (
    <div>
      <CommonDropdown
        items={[
          { label: "Edit", onClick: () => handleEdit() },
          { label: "Delete", onClick: () => handleDelete() },
        ]}
        trigger={
          <button className="text-[#0A0A0A] hover:text-gray-600 cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </button>
        }
      />
    </div>
  );
};

export default TableAction;
