import CommonHeader from "@/common/header/CommonHeader";
import React from "react";

interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  activeStep: number; // current active step (1-based)
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, activeStep }) => {
  return (
    <div className="flex items-center gap-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-2">
            <p
              className={`flex item-center justify-center p-1 rounded-full w-8 h-8 ${
                activeStep === step.id
                  ? "bg-[#030213] text-white"
                  : "bg-[#ECECF0] text-[#717182]"
              }`}
            >
              {step.id}
            </p>
            <CommonHeader
              className={`${
                activeStep === step.id ? "!text-[#030213]" : "!text-[#717182]"
              }`}
            >
              {step.label}
            </CommonHeader>
          </div>

          {/* Divider except for last step */}
          {index < steps.length - 1 && (
            <hr className="flex-1 border border-black/10" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
