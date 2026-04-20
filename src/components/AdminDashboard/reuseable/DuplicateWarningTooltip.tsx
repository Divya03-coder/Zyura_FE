import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";
import React from "react";

interface DuplicateInfo {
  mcqId: string;
  bankName?: string;
  examName?: string;
  question: string;
}

interface DuplicateWarningTooltipProps {
  duplicates: DuplicateInfo[];
  className?: string;
}

export const DuplicateWarningTooltip: React.FC<DuplicateWarningTooltipProps> = ({
  duplicates,
  className = "",
}) => {
  if (duplicates.length === 0) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center cursor-pointer ${className}`}>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span className="ml-1 text-xs text-amber-600 font-medium">
              {duplicates.length} similar question(s) found
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-md z-[10000]">
          <div className="space-y-2">
            <p className="font-semibold text-amber-600">⚠️ Similar question is available already</p>
            <p className="text-sm">This question already exists in:</p>
            <ul className="space-y-1 text-sm max-h-48 overflow-y-auto">
              {duplicates.map((dup, index) => (
                <li key={index} className="border-l-2 border-amber-400 pl-2">
                  <div className="font-medium">
                    {dup.bankName || dup.examName}
                  </div>
                  <div className="text-xs text-gray-500">ID: {dup.mcqId}</div>
                </li>
              ))}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};