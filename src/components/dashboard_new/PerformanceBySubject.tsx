import React from "react";
import { useGetPerformanceQuery } from "@/store/features/goal/goal.api";

const PerformanceBySubject: React.FC = () => {
  const { data: performanceData } = useGetPerformanceQuery({});

  const performance = performanceData?.data || {
    mcq: 0,
    flashcard: 0,
    clinicalCase: 0,
    osce: 0,
  };

  const subjects = [
    { name: "MCQ", value: performance.mcq, color: "blue" },
    { name: "Flashcard", value: performance.flashcard, color: "yellow" },
    { name: "Clinical Case", value: performance.clinicalCase, color: "red" },
    { name: "OSCE", value: performance.osce, color: "green" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
      <div className="space-y-4">
        {subjects.map((sub, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium text-${sub.color}-600`}>
                {sub.name}
              </span>
              <span className="text-sm font-medium">{sub.value}%</span>
            </div>
            <div className={`bg-${sub.color}-100 h-2 rounded-full`}>
              <div
                className={`bg-${sub.color}-500 h-2 rounded-full`}
                style={{ width: `${sub.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceBySubject;
