import CommonDropdown from "@/common/custom/CommonDropdown";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import { MoreVertical, Trash2 } from "lucide-react";

interface TableActionProps {
  handleDelete: () => Promise<void>;
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
          { 
            label: "Delete", 
            component: (
              <AlertDialogBox
                trigger={
                  <button className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer">
                    <Trash2 size={14} />
                    Delete
                  </button>
                }
                action={handleDelete}
                isLoading={false}
                title="Are you sure?"
                description="This action cannot be undone. This will permanently delete the item."
              />
            )
          },
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

