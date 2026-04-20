import { useState } from "react";
import Switch from "./Switch";
import { NotificationSettingsProps } from "./types";

const NotificationSettings = ({ notifications }: NotificationSettingsProps) => {
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    achievementAlerts: true,
    weeklyReports: false,
    marketingEmails: false,
  });

  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-lg text-yellow-900 mb-4">
          Recent Notifications
        </h3>
        <div className="space-y-3">
          {notifications?.slice(0, 3).map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-md border ${
                notification.read
                  ? "bg-white border-gray-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">{notification.type}</div>
                  <div className="text-sm text-gray-600">
                    {notification.message}
                  </div>
                </div>
                <div className="text-xs text-gray-500">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-600">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={notificationPrefs.emailNotifications}
            onCheckedChange={(checked) =>
              setNotificationPrefs({
                ...notificationPrefs,
                emailNotifications: checked,
              })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Push Notifications</h4>
            <p className="text-sm text-gray-600">
              Receive push notifications on your device
            </p>
          </div>
          <Switch
            checked={notificationPrefs.pushNotifications}
            onCheckedChange={(checked) =>
              setNotificationPrefs({
                ...notificationPrefs,
                pushNotifications: checked,
              })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Study Reminders</h4>
            <p className="text-sm text-gray-600">
              Get reminded about your study sessions
            </p>
          </div>
          <Switch
            checked={notificationPrefs.studyReminders}
            onCheckedChange={(checked) =>
              setNotificationPrefs({
                ...notificationPrefs,
                studyReminders: checked,
              })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Achievement Alerts</h4>
            <p className="text-sm text-gray-600">
              Get notified when you complete milestones
            </p>
          </div>
          <Switch
            checked={notificationPrefs.achievementAlerts}
            onCheckedChange={(checked) =>
              setNotificationPrefs({
                ...notificationPrefs,
                achievementAlerts: checked,
              })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Weekly Reports</h4>
            <p className="text-sm text-gray-600">
              Receive weekly progress summaries
            </p>
          </div>
          <Switch
            checked={notificationPrefs.weeklyReports}
            onCheckedChange={(checked) =>
              setNotificationPrefs({
                ...notificationPrefs,
                weeklyReports: checked,
              })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Marketing Emails</h4>
            <p className="text-sm text-gray-600">
              Receive updates about new features and courses
            </p>
          </div>
          <Switch
            checked={notificationPrefs.marketingEmails}
            onCheckedChange={(checked) =>
              setNotificationPrefs({
                ...notificationPrefs,
                marketingEmails: checked,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
