import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import ToggleButtonGroup from "@/components/AdminDashboard/reuseable/ToggleButtonGroup";
import { useState } from "react";
import StepIndicator from "../medical/StepIndicator";
import { steps } from "../medical/createContent/CreateContent";

import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import AddBulkMCQ from "./AddBulkMCQ";
import AddMCQForm from "./AddMCQForm";

interface CreateMCQStudyProps {
  breadcrumb?: string;
  handleModalClose: () => void;
}

const activeStep = 2;
const MCQUpload: React.FC<CreateMCQStudyProps> = ({
  breadcrumb,
  handleModalClose,
}) => {
  const [mode, setMode] = useState<"manual" | "bulk">("manual");
  const { uploadIntoBank } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  return (
    <div>
      {!uploadIntoBank && (
        <DashboardTopSection
          title="Add Mcq Content"
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
          <AddMCQForm handleCancel={handleModalClose} />
        ) : (
          <AddBulkMCQ />
        )}
      </div>
    </div>
  );
};

export default MCQUpload;
