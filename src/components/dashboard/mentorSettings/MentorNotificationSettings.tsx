import { useState } from "react"

const MentorNotificationSettings = () => {
  const [toggles, setToggles] = useState({
    allNotifications: true,
    sessionRequest: true,
    communityNotifications: true,
    eventReminders: true,
    forumReplies: true,
    emailNotification: true,
    pushNotifications: true,
  })

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="w-full mx-auto">
      {/* Section 1 */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Header */}
        <div className="px-4 sm:px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Notification</h2>

          {/* All Notification */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-4 mb-2">
            <button
              role="switch"
              aria-checked={toggles.allNotifications}
              onClick={() => handleToggle("allNotifications")}
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:outline-none ${
                toggles.allNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  toggles.allNotifications ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <div className="text-sm font-medium text-gray-900 mt-2 sm:mt-0">
              All Notification
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-6 space-y-6">
          {/* Session Request Alert */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <div className="text-sm font-medium text-gray-900">Session Request Alert</div>
              <div className="text-sm text-gray-500">
                Celebrate milestones and achievements
              </div>
            </div>
            <button
              role="switch"
              aria-checked={toggles.sessionRequest}
              onClick={() => handleToggle("sessionRequest")}
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                toggles.sessionRequest ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  toggles.sessionRequest ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Community Notifications */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <div className="text-sm font-medium text-gray-900">Community Notifications</div>
              <div className="text-sm text-gray-500">
                Stay updated on community discussions
              </div>
            </div>
            <button
              role="switch"
              aria-checked={toggles.communityNotifications}
              onClick={() => handleToggle("communityNotifications")}
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                toggles.communityNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  toggles.communityNotifications ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Event Reminders */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <div className="text-sm font-medium text-gray-900">Event Reminders</div>
              <div className="text-sm text-gray-500">
                Upcoming events and webinars
              </div>
            </div>
            <button
              role="switch"
              aria-checked={toggles.eventReminders}
              onClick={() => handleToggle("eventReminders")}
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                toggles.eventReminders ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  toggles.eventReminders ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Forum Replies */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <div className="text-sm font-medium text-gray-900">Forum Replies</div>
              <div className="text-sm text-gray-500">
                Get updates on forum replies
              </div>
            </div>
            <button
              role="switch"
              aria-checked={toggles.forumReplies}
              onClick={() => handleToggle("forumReplies")}
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                toggles.forumReplies ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  toggles.forumReplies ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white border border-gray-200 rounded-lg mt-6">
        <div className="px-4 sm:px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            General Notification
          </h2>
        </div>

        <div className="px-4 sm:px-6 py-6 space-y-6">
          {/* Email Notifications */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <div className="text-sm font-medium text-gray-900">Email Notification</div>
              <div className="text-sm text-gray-500">
                Receive notifications via email
              </div>
            </div>
            <button
              role="switch"
              aria-checked={toggles.emailNotification}
              onClick={() => handleToggle("emailNotification")}
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                toggles.emailNotification ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  toggles.emailNotification ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Push Notifications */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <div className="text-sm font-medium text-gray-900">Push Notifications</div>
              <div className="text-sm text-gray-500">
                Receive notifications even when app is closed
              </div>
            </div>
            <button
              role="switch"
              aria-checked={toggles.pushNotifications}
              onClick={() => handleToggle("pushNotifications")}
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                toggles.pushNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  toggles.pushNotifications ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorNotificationSettings;
