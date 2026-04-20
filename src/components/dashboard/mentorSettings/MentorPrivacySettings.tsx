import { useState } from "react"

const MentorPrivacySettings = () => {
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
        <div className="w-full mx-auto space-y-6">
            {/* Section 1 */}
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                    {/* Profile Privacy */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div>
                            <div className="text-sm font-medium text-gray-900">Profile Privacy</div>
                            <div className="text-sm text-gray-500">Keep your Profile safe & Secure</div>
                        </div>
                    </div>

                    {/* Profile Visibility */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div>
                            <div className="text-sm font-medium text-gray-900">Profile Visibility</div>
                            <div className="text-sm text-gray-500">Visible to all users</div>
                        </div>
                        <button
                            role="switch"
                            aria-checked={toggles.communityNotifications}
                            onClick={() => handleToggle("communityNotifications")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${toggles.communityNotifications ? "bg-blue-600" : "bg-gray-200"
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${toggles.communityNotifications ? "translate-x-6" : "translate-x-0.5"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Share Progress */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div>
                            <div className="text-sm font-medium text-gray-900">Share Progress to community</div>
                            <div className="text-sm text-gray-500">Allow others to see your study achievements</div>
                        </div>
                        <button
                            role="switch"
                            aria-checked={toggles.eventReminders}
                            onClick={() => handleToggle("eventReminders")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${toggles.eventReminders ? "bg-blue-600" : "bg-gray-200"
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${toggles.eventReminders ? "translate-x-6" : "translate-x-0.5"
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                    {/* Data Privacy */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div>
                            <div className="text-sm font-medium text-gray-900">Data Privacy</div>
                            <div className="text-sm text-gray-500">Keep your Profile safe & Secure</div>
                        </div>
                    </div>

                    {/* Performance Analytics */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div>
                            <div className="text-sm font-medium text-gray-900">Performance Analytics</div>
                            <div className="text-sm text-gray-500">Allow us to analyse your study patterns</div>
                        </div>
                        <button
                            role="switch"
                            aria-checked={toggles.pushNotifications}
                            onClick={() => handleToggle("pushNotifications")}
                            className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${toggles.pushNotifications ? "bg-blue-600" : "bg-gray-200"
                                }`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${toggles.pushNotifications ? "translate-x-6" : "translate-x-0.5"
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
                    {/* Data Management */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div>
                            <div className="text-sm font-medium text-gray-900">Data Management</div>
                            <div className="text-sm text-gray-500">Keep your Profile safe & Secure</div>
                        </div>
                    </div>

                    {/* Reset Progress */}
                    <div>
                        <button className="w-full bg-gray-50 hover:bg-gray-100 cursor-pointer py-3 px-6 border border-[#000] rounded-[8px]">
                            Reset Progress Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorPrivacySettings;
