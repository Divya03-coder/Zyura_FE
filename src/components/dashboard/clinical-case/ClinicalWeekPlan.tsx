"use client";

import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";

const ClinicalWeekPlan = () => {
  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow">
      {/* Header */}

      <PrimaryHeading
        title="Your AI-Powered Plan for This Week"
        icon={<Brain size={20} />}
        iconColor="text-black"
      />
      {/* Plan Description */}
      <div className="bg-slate-50 p-3 rounded-md text-sm text-gray-700 leading-relaxed my-4">
        Based on your performance, let's focus on{" "}
        <span className="font-semibold">Cardiology</span>. I've added{" "}
        <span className="font-semibold">2 new cardio cases</span> and an{" "}
        <span className="font-semibold">ECG mini-course</span> to your plan.
      </div>

      {/* Highlight Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="font-semibold text-base mb-1">
            You've excelled in Neuro cases!
          </h4>
          <p className="text-sm opacity-90">
            Unlock your potential with a live, expert-led OSCE session.
          </p>
        </div>
        <Button
          variant="secondary"
          className="mt-3 md:mt-0 bg-white text-gray-800 hover:bg-slate-100"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default ClinicalWeekPlan;
