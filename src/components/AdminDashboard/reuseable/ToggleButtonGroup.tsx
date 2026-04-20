import CommonButton from "@/common/button/CommonButton";

interface ToggleButtonGroupProps<T extends string> {
  options: { label: string; value: T }[];
  active: T;
  onChange: (value: T) => void;
}

const ToggleButtonGroup = <T extends string>({
  options,
  active,
  onChange,
}: ToggleButtonGroupProps<T>) => {
  return (
    <div className="grid grid-cols-2 gap-4 ">
      {options.map((option) => (
        <CommonButton
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`!py-3 ${
            active === option.value ? "bg-blue-600 text-white" : ""
          }`}
        >
          {option.label}
        </CommonButton>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
