import Select from "./Select";
import Switch from "./Switch";
import { StudySettingsProps } from "./types";

const StudySettings = ({ userData, onUserDataChange }: StudySettingsProps) => {
  const studyGoalOptions = [
    { value: "01 Hours", label: "01 Hours" },
    { value: "02 Hours", label: "02 Hours" },
    { value: "03 Hours", label: "03 Hours" },
    { value: "04 Hours", label: "04 Hours" },
    { value: "05 Hours", label: "05 Hours" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-lg text-blue-900 mb-4">
          Study Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {userData.studyStreak}
            </div>
            <div className="text-sm text-blue-700">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {userData.totalStudyTime}
            </div>
            <div className="text-sm text-blue-700">Total Study Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {userData.completedCourses}
            </div>
            <div className="text-sm text-blue-700">Courses Completed</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Study goal</h4>
            <p className="text-sm text-gray-600">
              Set your learning objectives and track your progress.
            </p>
          </div>
          <div className="w-full sm:w-40">
            <Select
              value={userData.studyGoal}
              onValueChange={(value) =>
                onUserDataChange({ ...userData, studyGoal: value })
              }
              options={studyGoalOptions}
              placeholder="Select hours"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">AI Learning Assistant</h4>
            <p className="text-sm text-gray-600">
              Configure how AI personalizes your learning experience.
            </p>
          </div>
          <Switch
            checked={userData.aiAssistant ?? true}
            onCheckedChange={(checked) =>
              onUserDataChange({ ...userData, aiAssistant: checked })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Adaptive Difficulty</h4>
            <p className="text-sm text-gray-600">
              AI adjusts question difficulty based on your performance
            </p>
          </div>
          <Switch
            checked={userData.adaptiveDifficulty ?? true}
            onCheckedChange={(checked) =>
              onUserDataChange({ ...userData, adaptiveDifficulty: checked })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Recommendation</h4>
            <p className="text-sm text-gray-600">
              AI suggests study materials based on your weaknesses
            </p>
          </div>
          <Switch
            checked={userData.recommendations ?? true}
            onCheckedChange={(checked) =>
              onUserDataChange({ ...userData, recommendations: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StudySettings;
