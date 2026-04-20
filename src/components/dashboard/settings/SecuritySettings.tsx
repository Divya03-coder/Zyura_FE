import { Monitor, Smartphone, Tablet } from "lucide-react";
import Switch from "./Switch";
import Select from "./Select";
import { useState } from "react";

const SecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: "30 minutes",
    deviceTrust: true,
  });

  const [sessions] = useState([
    {
      id: 1,
      device: "Chrome on MacBook Pro",
      location: "New York, US",
      current: true,
      lastActive: "Now",
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, US",
      current: false,
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      device: "Chrome on Windows",
      location: "California, US",
      current: false,
      lastActive: "3 days ago",
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="font-semibold text-lg text-red-900 mb-4">
          Account Security
        </h3>
        <div className="text-sm text-red-700">
          Last login: Today at 2:30 PM from Chrome on MacBook Pro
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">
              Two-Factor Authentication
            </h4>
            <p className="text-sm text-gray-600">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            checked={securitySettings.twoFactorAuth}
            onCheckedChange={(checked) =>
              setSecuritySettings({
                ...securitySettings,
                twoFactorAuth: checked,
              })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Login Notifications</h4>
            <p className="text-sm text-gray-600">
              Get notified when someone logs into your account
            </p>
          </div>
          <Switch
            checked={securitySettings.loginNotifications}
            onCheckedChange={(checked) =>
              setSecuritySettings({
                ...securitySettings,
                loginNotifications: checked,
              })
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Session Timeout</h4>
            <p className="text-sm text-gray-600">
              Automatically log out after inactivity
            </p>
          </div>
          <div className="w-full sm:w-40">
            <Select
              value={securitySettings.sessionTimeout}
              onValueChange={(value) =>
                setSecuritySettings({
                  ...securitySettings,
                  sessionTimeout: value,
                })
              }
              options={[
                { value: "15 minutes", label: "15 minutes" },
                { value: "30 minutes", label: "30 minutes" },
                { value: "1 hour", label: "1 hour" },
                { value: "Never", label: "Never" },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900">Device Trust</h4>
            <p className="text-sm text-gray-600">
              Remember trusted devices for 30 days
            </p>
          </div>
          <Switch
            checked={securitySettings.deviceTrust}
            onCheckedChange={(checked) =>
              setSecuritySettings({ ...securitySettings, deviceTrust: checked })
            }
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Active Sessions</h4>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {session.device.includes("iPhone") ? (
                  <Smartphone className="w-8 h-8 text-gray-400" />
                ) : session.device.includes("MacBook") ? (
                  <Monitor className="w-8 h-8 text-gray-400" />
                ) : (
                  <Tablet className="w-8 h-8 text-gray-400" />
                )}
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {session.device}
                    {session.current && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              {!session.current && (
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;