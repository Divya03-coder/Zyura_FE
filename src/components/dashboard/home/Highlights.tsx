import HighlightsCard from "@/components/reusable/HighlightsCard";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { BookOpenText } from "lucide-react";

import highlightImg1 from "@/assets/dashboard/highlights1.svg";
import highlightImg2 from "@/assets/dashboard/highlights2.svg";
import highlightImg3 from "@/assets/dashboard/highlights3.svg";

const Highlights = () => {
  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 my-10 shadow">
      <PrimaryHeading
        title="Highlights of the Week"
        icon={<BookOpenText size={20} />}
      />
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HighlightsCard
            title="Question Of The Week"
            description="What is the significant improvements in mobility, posture, and overall pain relief?"
            buttonText="Answer Now"
            buttonLink="hh"
            image={highlightImg1} // Replace with actual image path
          />
          <HighlightsCard
            title="Mini Case of the Week"
            description="Years of combined expertise in chirop- ractic and physiotherapy care."
            buttonText="Continue"
            buttonLink="#"
            image={highlightImg2} // Replace with actual image path
          />
          <HighlightsCard
            title="Students of the Week"
            description="Years of combined expertise in chiropractic and physiotherapy care."
            buttonText="View Profile"
            buttonLink="#"
            image={highlightImg3} // Replace with actual image path
          />
        </div>
      </div>
    </div>
  );
};

export default Highlights;
