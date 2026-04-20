import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types"
import MentorNotificationSettings from "@/components/dashboard/mentorSettings/MentorNotificationSettings"
import MentorPaymentSettings from "@/components/dashboard/mentorSettings/MentorPaymentSettings"
import MentorPrivacySettings from "@/components/dashboard/mentorSettings/MentorPrivacySettings"
import MentorSecuritySettings from "@/components/dashboard/mentorSettings/MentorSecuritySettings"
import SettingsTabs from "@/components/dashboard/mentorSettings/SettingsTabs"
import Breadcrumb from "@/components/reusable/CommonBreadcrumb"
import { useState } from "react"

const MentorSettings = () => {
  // ✅ Default should be "notification"
  const [activeTab, setActiveTab] = useState("notification")

  const renderTabContent = () => {
    switch (activeTab) {
      case "notification":
        return <MentorNotificationSettings />
      case "payment":
        return <MentorPaymentSettings/>
      case "security":
        return <MentorSecuritySettings/>
      case "privacy":
        return <MentorPrivacySettings/>
      default:
        return null
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Mentors", link: "/mentor/mentor-setting" },
];

  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  )
}

export default MentorSettings
