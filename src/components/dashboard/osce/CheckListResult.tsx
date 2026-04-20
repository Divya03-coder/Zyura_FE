

import { CheckCircle, XCircle, PlayCircle } from "lucide-react";

export default function CheckListResult() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center border-l-4 border-green-600">
        <div>
          <h1 className="text-lg font-semibold text-green-700 flex items-center gap-2">
            <CheckCircle className="text-green-600 w-5 h-5" />
            Session Complete!
          </h1>
          <p className="text-gray-600 text-sm">
            Cardiovascular Examination (CVS) – Practice Mode <br />
            Completed in 18:45 minutes
          </p>
        </div>
        <div className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold">
          85% <br />
          <span className="text-sm font-normal">Completion Rate</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Checklist */}
        <div className="bg-white p-5 rounded-xl shadow border col-span-2">
          <h2 className="text-lg font-semibold mb-3">Your Completed Checklist</h2>
          <div className="space-y-3">
            {[
              { text: "Introduce yourself and obtain consent", status: "completed" },
              { text: "Position patient at 45° angle", status: "completed" },
              { text: "Inspect the precordium", status: "completed" },
              { text: "Palpate the apex beat", status: "completed" },
              { text: "Listen for carotid bruits", status: "missed" },
              { text: "Check for peripheral edema", status: "completed" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  item.status === "completed"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <span className="text-gray-800">{item.text}</span>
                {item.status === "completed" ? (
                  <CheckCircle className="text-green-600 w-5 h-5" />
                ) : (
                  <XCircle className="text-red-600 w-5 h-5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow border">
            <h2 className="text-lg font-semibold mb-3">Performance Summary</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex justify-between">
                <span>Session Time</span> <span className="font-medium">18:45</span>
              </li>
              <li className="flex justify-between">
                <span>Steps Completed</span> <span className="font-medium">8/13</span>
              </li>
              <li className="flex justify-between">
                <span>Confidence Level</span>{" "}
                <span className="font-medium text-yellow-600">Developing</span>
              </li>
              <li className="flex justify-between">
                <span>Next Milestone</span>{" "}
                <span className="text-blue-600 font-medium cursor-pointer">
                  Advanced CVS
                </span>
              </li>
            </ul>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <h2 className="text-lg font-semibold mb-3">AI Recommendations</h2>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700 mb-3">
                <span className="font-semibold">Targeted Skill Review:</span> You
                missed <span className="text-purple-700">Auscultation</span>. We
                recommend re-watching the tutorial on Heart Auscultation Techniques.
              </p>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <PlayCircle className="w-5 h-5" />
                Watch Tutorial Again
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rubric Analysis */}
      <div className="bg-white p-5 rounded-xl shadow border mt-6">
        <h2 className="text-lg font-semibold mb-3">RCSI-Aligned Rubric Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Key Areas */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700 text-sm mb-2">
              Key Areas for Improvement
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Cardiac auscultation is essential for complete CVS examination</li>
              <li>
                Focus on systematic auscultation technique for all valve areas
              </li>
              <li>
                Consider patient positioning for optimal heart sound detection
              </li>
            </ul>
          </div>

          {/* Strengths */}
          <div className="p-4 rounded-lg border bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-700 text-sm mb-2">Strengths</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Professional approach</li>
              <li>Systematic inspection</li>
            </ul>
          </div>

          {/* Areas to Focus */}
          <div className="p-4 rounded-lg border bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-700 text-sm mb-2">
              Areas to Focus
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Auscultation technique</li>
              <li>Carotid examination</li>
              <li>Murmur identification</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="px-6 py-3 bg-green-100 text-green-700 rounded-lg border border-green-200 hover:bg-green-200 transition">
          ↺ Repeat Session
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Start a Quiz
        </button>
      </div>
    </div>
  );
}
