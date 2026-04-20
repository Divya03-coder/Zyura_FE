import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface CustomCheckboxProps {
  id: string;
  label?: string;
  className?: string;
  width?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void; //
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  className,
  width = "w-[23px] h-[22px]",
  checked,
  defaultChecked = false,
  onChange,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (!isControlled) {
      setInternalChecked(!internalChecked);
    }
    onChange?.(!isChecked);
  };

  return (
    <label
      htmlFor={id}
      className="flex items-start space-x-2 cursor-pointer select-none"
    >
      {/* Checkbox box */}
      <div
        className={`${width} min-w-[23px] min-h-[22px] rounded-md flex items-center justify-center border transition-colors ${
          isChecked
            ? "bg-[#334155] border-transparent"
            : "bg-white border-[#C3BEBE]"
        }`}
        onClick={toggle}
      >
        {isChecked && <FaCheck className="text-white" />}
      </div>

      {/* Label */}
      <span
        className={`${className} text-[#212B36] text-sm leading-[24px] font-normal font-playfair`}
      >
        {label}
      </span>
    </label>
  );
};

export default CustomCheckbox;
