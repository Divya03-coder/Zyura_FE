import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  component?: React.ReactNode;
}

interface CommonDropdownProps {
  items: DropdownItem[];
  trigger: React.ReactNode;
}

const CommonDropdown: React.FC<CommonDropdownProps> = ({ items, trigger }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white border border-border w-fit"
      >
        {items.map((item, idx) =>
          item.component ? (
            <div key={idx}>{item.component}</div>
          ) : (
            <DropdownMenuItem
              key={idx}
              onClick={item.onClick}
              className="cursor-pointer hover:bg-gray-100"
            >
              {item.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommonDropdown;
