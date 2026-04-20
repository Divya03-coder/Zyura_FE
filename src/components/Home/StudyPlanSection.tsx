import CommonWrapper from "@/common/CommonWrapper";
import PrimaryButton from "../reusable/PrimaryButton";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Feature {
  text: string;
}

interface StudyPlanSectionProps {
  title: string;
  description: string;
  leftFeatures: Feature[];
  rightFeatures: Feature[];
  buttonText: string;
  image: string;
}

export default function StudyPlanSection({
  title,
  description,
  leftFeatures,
  rightFeatures,
  buttonText,
  image,
}: StudyPlanSectionProps) {
  const navigate = useNavigate();
  return (
    <CommonWrapper>
      <div className="grid grid-cols-1 lg:items-center lg:grid-cols-2 gap-10 py-10 md:py-16">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
            {title}
          </h2>
          <p className="text-[#181818] font-normal leading-6 border-b border-b-[#E2E8F0] pb-9 mt-9 mb-6">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row  items-start lg:justify-between gap-5 sm:gap-16 mb-12 max-w-md">
            {/* Left Features */}
            <div className="space-y-5">
              {leftFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#155E75]" />
                  <p className="text-[#1E293B] font-medium leading-6">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Features */}
            <div className="space-y-5">
              {rightFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#155E75]" />
                  <p className="text-[#1E293B] font-medium leading-6">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <PrimaryButton
            onClick={() => {
              navigate("/dashboard/clinical-case-generator");
            }}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {buttonText}
          </PrimaryButton>
        </div>

        {/* Right Image */}
        <div className="hidden md:block mx-auto">
          <img src={image} alt="Study Plan" />
        </div>
      </div>
    </CommonWrapper>
  );
}
