// components/CustomSwitch.tsx
import React from "react";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        relative flex items-center flex-shrink-0 h-6 w-11 rounded-full transition-colors duration-200 ease-in-out
        focus:outline-none cursor-pointer
        ${checked ? "bg-[#1D4ED8]" : "bg-[#2C2C2C]"}
      `}
    >
      <span
        className={`
          inline-block  h-4 w-4 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  );
};

export default CustomSwitch;
