import { FaCheck } from "react-icons/fa6";

interface Option {
  label: string;
  value: string;
}

interface PlanSelectorProps<T extends string> {
  value: T;
  onChange: (val: T) => void;
  options: Option[];
}

const PlanSelector = <T extends string>({
  value,
  onChange,
  options,
}: PlanSelectorProps<T>) => {
  return (
    <div className="flex items-center gap-4">
      {options.map((opt) => (
        <div key={opt.value} className="flex items-center gap-2">
          <div
            onClick={() => onChange(opt.value as T)}
            className={`w-5 h-5 border-2 rounded-md flex items-center justify-center cursor-pointer transition
              ${
                value === opt.value
                  ? "border-primary bg-primary/30"
                  : "border-gray-300 bg-white"
              }`}
          >
            {value === opt.value && <FaCheck className="text-black w-2 h-2" />}
          </div>
          <span className="text-sm text-gray-600">{opt.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PlanSelector;
