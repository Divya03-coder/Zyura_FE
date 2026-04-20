import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarItems, SidebarItem } from "./sidebarConfig";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface DashboardSearchProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  debounce?: number;
}

const DashboardSearch: FC<DashboardSearchProps> = ({
  className,
  value: controlledValue,
  onChange,
  debounce = 500,
}) => {
  const [value, setValue] = useState(controlledValue || "");
  const [results, setResults] = useState<SidebarItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle controlled value updates
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (onChange) {
      const handler = setTimeout(() => {
        onChange(value);
      }, debounce);
      return () => clearTimeout(handler);
    }
  }, [value, debounce, onChange]);

  // Search logic
  useEffect(() => {
    if (value.trim().length > 0) {
      const filtered = sidebarItems.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      setResults(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
    setFocusedIndex(-1);
  }, [value]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: SidebarItem) => {
    navigate(item.path);
    setValue("");
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (focusedIndex >= 0 && results[focusedIndex]) {
        handleSelect(results[focusedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm" ref={dropdownRef}>
      <div
        className={cn(
          "flex items-center w-full gap-1 border border-border rounded-full bg-white px-3 transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary/20",
          className,
        )}
      >
        <span className="flex items-center justify-center text-[#94A3B8] rounded-full transition-colors duration-200">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder="Search menu..."
          className="w-full outline-none bg-transparent text-[#1e293b] py-2 placeholder:text-[#94A3B8]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() =>
            value.trim().length > 0 && results.length > 0 && setIsOpen(true)
          }
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg z-[100] max-h-64 overflow-y-auto py-2">
          {results.map((item, index) => (
            <button
              key={item.path}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setFocusedIndex(index)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors duration-150",
                focusedIndex === index
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg",
                  item.iconBgColor,
                )}
              >
                {item?.isImageIcon ? (
                  <img
                    src={item.icon as string}
                    alt={item.label ?? "icon"}
                    className={cn("w-5 h-5", item.iconColor)}
                  />
                ) : (
                  <item.icon className={cn("w-5 h-5", item.iconColor)} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{item.label}</span>
                <span className="text-xs text-gray-400 capitalize">
                  {item.section}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardSearch;
