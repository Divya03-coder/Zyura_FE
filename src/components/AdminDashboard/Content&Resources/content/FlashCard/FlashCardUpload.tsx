import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import ToggleButtonGroup from "@/components/AdminDashboard/reuseable/ToggleButtonGroup";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { useState } from "react";
import StepIndicator from "../medical/StepIndicator";
import { steps } from "../medical/createContent/CreateContent";
import BulkUploadFlashCard from "./BulkUploadFlashCard";
import ManualFlashUpload from "./ManualFlashUpload";

interface CreateMCQStudyProps {
  breadcrumb?: string;
  handleCancel: () => void;
}

const activeStep = 2;
const FlashCardUpload: React.FC<CreateMCQStudyProps> = ({
  breadcrumb,
  handleCancel,
}) => {
  const [mode, setMode] = useState<"manual" | "bulk">("manual");
  const { uploadIntoBank } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  return (
    <div>
      {!uploadIntoBank && (
        <DashboardTopSection
          title="Add Flashcard Content"
          description={breadcrumb}
          descriptionClassName="!text-[#717182]"
        />
      )}

      <CommonSpace>
        <StepIndicator steps={steps} activeStep={activeStep} />
      </CommonSpace>
      <div>
        <div className="py-10">
          <ToggleButtonGroup
            options={[
              { label: "Manual Upload", value: "manual" },
              { label: "Bulk Upload", value: "bulk" },
            ]}
            active={mode}
            onChange={setMode}
          />
        </div>

        {mode === "manual" ? (
          <ManualFlashUpload handleCancel={handleCancel} />
        ) : (
          <BulkUploadFlashCard />
        )}
      </div>
    </div>
  );
};

export default FlashCardUpload;
