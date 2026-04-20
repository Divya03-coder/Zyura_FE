import { ShieldQuestion } from "lucide-react";

const ForumsCard = () => {
  return (
    <div className="border border-slate-300 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldQuestion className="text-red-500" />
          <h3 className="text-xl font-medium">
            Best mnemonics for remembering cranial nerves?
          </h3>
        </div>
        <p className="text-xs text-white rounded-full bg-red-500 px-2 py-[2px]">
          Anatomy
        </p>
      </div>

      <p className="text-sm text-zinc-500 mt-4">
        I'm struggling to memorize all 12 cranial nerves and their functions.
        What mnemonics have worked best for you?
      </p>

      <div className="flex items-center gap-[10px] mt-6 mb-4">
        <p className="py-1 px-[6px] text-[#0A0A0A] border border-slate-300 rounded">
          #ExamTips
        </p>

        <p className="py-1 px-[6px] text-[#0A0A0A] border border-slate-300 rounded">
          #Neurology
        </p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-slate-600">Sarah M.</p>
        <p className="text-sm text-slate-600">2nd Year</p>
        <p className="text-sm text-slate-600">2 hours ago</p>
      </div>
    </div>
  );
};

export default ForumsCard;
