import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export interface Tab<T extends string> {
  label: string;
  value: T;
}

interface TabsProps<T extends string> {
  tabs: Tab<T>[];
  active: T;
  onChange: (value: T) => void;
  className?: string;
}

const Tabs = <T extends string>({
  tabs,
  active,
  onChange,
  className,
}: TabsProps<T>) => {
  return (
    <>
      <div className="block sm:hidden w-full ">
        <Select value={active} onValueChange={onChange}>
          <SelectTrigger
            className={`${className} bg-[#FCFCFC] border border-[#CBD5E1] px-3 py-3 cursor-pointer rounded-md text-sm     outline-none
          focus:outline-none
          focus:ring-0
           focus:border-[#B3B3B3]
          focus-visible:ring-0`}
          >
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>

          <SelectContent className="bg-white border border-[#B3B3B3] rounded-md shadow-md">
            {tabs.map((option, index) => (
              <SelectItem
                key={option.value + index}
                value={option.value}
                className="cursor-pointer px-4 py-2 rounded"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden sm:flex items-center flex-wrap bg-white border border-border rounded-full p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-6 py-2 shrink-0 text-sm font-medium rounded-full transition-colors cursor-pointer
              ${
                active === tab.value
                  ? "bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Tabs;
