import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import { useState } from "react";

interface YourModalProps {
  action: "add" | "rename" | "delete";
  currentTitle: string;
  onClose: () => void;
  onConfirm: (newTitle?: string) => void;
  isUpdating?: boolean;
}

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs ",
  error: "text-red-500 text-sm mt-1",
};
const UpdateTreeTableAction: React.FC<YourModalProps> = ({
  action,
  currentTitle,
  onClose,
  onConfirm,
  isUpdating,
}) => {
  const [input, setInput] = useState(currentTitle);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg  relative">
        <ModalCloseButton onClick={onClose} />

        <CommonHeader className="!text-2xl !font-semibold !font-inter text-gray-900 mb-2.5">
          {action === "add"
            ? "Add New"
            : action === "rename"
            ? "Rename"
            : "Delete"}
        </CommonHeader>
        {action !== "delete" && (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={inputClass.input}
          />
        )}

        <div className="flex justify-end gap-3 mt-4">
          <CommonButton type="button" onClick={onClose} className="">
            Cancel
          </CommonButton>

          <CommonButton
            onClick={() => onConfirm(input)}
            className={`${
              action === "delete" ? "!bg-red-500" : "!bg-blue-500"
            }  !text-white`}
          >
            {isUpdating ? (
              <ButtonWithLoading title="Updating..." />
            ) : (
              `${
                action === "add"
                  ? "Add New"
                  : action === "rename"
                  ? "Rename"
                  : "Delete"
              }`
            )}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default UpdateTreeTableAction;
