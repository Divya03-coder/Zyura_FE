import React from "react";
import { StepIndicatorProps } from "./type";

// Step Indicator Component
export const GoalStepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          1
        </div>
        <div
          className={`w-16 h-1 ${
            currentStep >= 2 ? "bg-blue-500" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 2 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          2
        </div>
        <div
          className={`w-16 h-1 ${
            currentStep >= 3 ? "bg-blue-500" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep >= 3 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          3
        </div>
      </div>
    </div>
  );
};
