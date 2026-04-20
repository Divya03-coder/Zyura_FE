import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import React from "react";

interface ActionButtonsProps {
  onSavePublish: () => void;
  isLoading?: boolean;
  onCancel?: () => void;
  importLabel?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isLoading,
  onCancel,
  onSavePublish,
  importLabel = "Save & Publish Question",
}) => {
  return (
    <div className="flex items-center justify-end gap-6 pt-6">
      <div className="flex flex-col sm:flex-row gap-3 ">
        <CommonButton
          type="button"
          className="bg-blue-500 !text-white"
          disabled={isLoading}
          onClick={onSavePublish}
        >
          {isLoading ? <ButtonWithLoading title="Saving..." /> : importLabel}
        </CommonButton>
      </div>
      <CommonButton type="button" onClick={onCancel}>
        Cancel
      </CommonButton>
    </div>
  );
};

export default ActionButtons;
