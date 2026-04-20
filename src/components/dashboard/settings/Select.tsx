import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface Option<T = string> {
  value: T;
  label: string;
}

interface SelectProps<T = string> {
  value: T | null;
  onValueChange: (value: T) => void;
  options: Option<T>[];
  placeholder?: string;
}

function Select<T = string>({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {value !== null ? String(value) : placeholder}
        <ChevronRight
          className={`w-4 h-4 absolute right-3 top-3 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
