import React from "react";
import { Lightbulb } from "lucide-react";
import { AIRecommendationProps } from "./types";

const AIRecommendation: React.FC<AIRecommendationProps> = ({ recommendation }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">AI Recommendation</h3>
          <p className="text-gray-700">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
