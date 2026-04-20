import { ReactNode } from "react";

interface AIToolCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function AIToolCard({
  icon,
  title,
  description,
}: AIToolCardProps) {
  return (
    <div className="group bg-slate-800/40 hover:bg-slate-800 transition-all duration-300 rounded-[20px] pt-6 pl-6 pb-4 cursor-pointer">
      <div className="flex items-center gap-4">
        <span className="w-6 h-6 text-white">{icon}</span>
        <h4 className="text-[#F8FAFC] font-medium">{title}</h4>
      </div>
      <p className="pt-3 text-base text-slate-400 font-normal leading-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-md">
        {description}
      </p>
    </div>
  );
}
