import PrimaryButton from "@/components/reusable/PrimaryButton";
import { ArrowRight } from "lucide-react";

interface Recommendation {
  category: string;
  title: string;
  description: string;
  level: string;
}

const ClinicalRecommendation = () => {
  const recommendations: Recommendation[] = [
    {
      title: "Abdominal Pain in Young Adult",
      description: "A 22-year-old presents with right lower quadrant pain.",
      category: "Cardiology",
      level: "Beginner",
    },
    {
      title: "Abdominal Pain in Young Adult",
      description: "A 22-year-old presents with right lower quadrant pain.",
      category: "Cardiology",
      level: "Beginner",
    },
    // Add more recommendations here if needed
  ];

  return (
    <div>
      <h2 className="text-xl font-medium text-slate-800">
        Weekly Recommendation
      </h2>
      <div className="flex flex-col gap-4 mt-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white border border-purple-500 rounded-lg shadow-md p-4 "
          >
            {/* Recommendation Info */}
            <div>
              <div className="flex space-x-2 items-center">
                <span className="text-xs px-2 py-1 bg-slate-100 font-semibold rounded-lg">
                  {rec.category}
                </span>
                <span className="text-xs px-2 py-1 border border-slate-200 rounded-lg">
                  {rec.level}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mt-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {rec.title}
                </h3>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
              {/* Button */}
              <PrimaryButton
                className="bg-white text-black border border-slate-300 transition-colors hover:bg-blue-main hover:text-white"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Start Case
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalRecommendation;
