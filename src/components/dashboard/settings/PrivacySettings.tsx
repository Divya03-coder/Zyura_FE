import { useState } from "react";
import Switch from "./Switch";
import Select from "./Select";

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    profileVisibility: "friends",
    studyDataSharing: false,
    analyticsOptIn: true,
    thirdPartySharing: false,
  });

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-lg text-purple-900 mb-2">
          Privacy Overview
        </h3>
        <p className="text-purple-700 text-sm">
          Control how your data is collected, used, and shared. Your privacy is
          important to us.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="font-medium text-gray-900">Data Collection</h4>
          <p className="text-sm text-gray-600">
            Allow collection of usage data to improve your experience
          </p>
        </div>
        <Switch
          checked={privacySettings.dataCollection}
          onCheckedChange={(checked) =>
            setPrivacySettings({ ...privacySettings, dataCollection: checked })
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h4 className="font-medium text-gray-900">Profile Visibility</h4>
          <p className="text-sm text-gray-600">
            Choose who can see your profile and study progress
          </p>
        </div>
        <div className="w-full sm:w-40">
          <Select
            value={privacySettings.profileVisibility}
            onValueChange={(value) =>
              setPrivacySettings({
                ...privacySettings,
                profileVisibility: value,
              })
            }
            options={[
              { value: "public", label: "Public" },
              { value: "friends", label: "Friends Only" },
              { value: "private", label: "Private" },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="font-medium text-gray-900">Study Data Sharing</h4>
          <p className="text-sm text-gray-600">
            Share anonymized study data for educational research
          </p>
        </div>
        <Switch
          checked={privacySettings.studyDataSharing}
          onCheckedChange={(checked) =>
            setPrivacySettings({
              ...privacySettings,
              studyDataSharing: checked,
            })
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="font-medium text-gray-900">Analytics Opt-in</h4>
          <p className="text-sm text-gray-600">
            Help us improve by sharing usage analytics
          </p>
        </div>
        <Switch
          checked={privacySettings.analyticsOptIn}
          onCheckedChange={(checked) =>
            setPrivacySettings({ ...privacySettings, analyticsOptIn: checked })
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="font-medium text-gray-900">Third-party Sharing</h4>
          <p className="text-sm text-gray-600">
            Allow sharing data with educational partners
          </p>
        </div>
        <Switch
          checked={privacySettings.thirdPartySharing}
          onCheckedChange={(checked) =>
            setPrivacySettings({
              ...privacySettings,
              thirdPartySharing: checked,
            })
          }
        />
      </div>
    </div>
  );
};

export default PrivacySettings;
