import { BrainCog, CalendarRange, Cog, NotebookText, Target } from "lucide-react";
import TestOverviewCard from '@/components/reusable/TestOverviewCard';
import { Progress } from "@/components/ui/progress";

export default function FlashCardOverview() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <TestOverviewCard
          icon={Target}
          iconColor="text-blue-700"
          iconBg="bg-blue-100"
          topText="10"
          bottomText="Total Flash Card"
        />
        <TestOverviewCard
          icon={NotebookText}
          iconColor="text-green-700"
          iconBg="bg-[#DCFCE7]"
          topText="82%"
          bottomText="Avg Score"
        />
        <TestOverviewCard
          icon={CalendarRange}
          iconColor="text-yellow-600"
          iconBg="bg-[#FFEDD4]"
          topText="05"
          bottomText="This Month"
        />
        <TestOverviewCard
          icon={Cog}
          iconColor="text-purple-700"
          iconBg="bg-[#F3E8FF]"
          topText="Cardiology"
          bottomText="Top Category"
        />
      </div>
      <div className="max-w-[700px] bg-white border border-slate-300 p-4 mt-10 rounded-[8px]">
        <p className="flex items-center gap-2 text-lg font-medium text-[#111827]"><BrainCog className="w-6 h-6 text-blue-main" /> Areas to Improve</p>
        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="min-w-[150px]">
              <h4 className="text-black font-medium">Cardiology</h4>
              <p>65% accuracy</p>
            </div>
            <Progress value={60} className="[&>div]:bg-[#7F56D9]" />
          </div>

          <div className="flex items-center justify-between">
            <div className="min-w-[150px]">
              <h4 className="text-black font-medium">Immunology</h4>
              <p>65% accuracy</p>
            </div>
            <Progress value={60} className="[&>div]:bg-[#7F56D9]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="min-w-[150px]">
              <h4 className="text-black font-medium">Neurology</h4>
              <p>65% accuracy</p>
            </div>
            <Progress value={60} className="[&>div]:bg-[#7F56D9]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="min-w-[150px]">
              <h4 className="text-black font-medium">Immunology</h4>
              <p>65% accuracy</p>
            </div>
            <Progress value={60} className="[&>div]:bg-[#7F56D9]" />
          </div>

        </div>
      </div>
    </div>
  )
}
