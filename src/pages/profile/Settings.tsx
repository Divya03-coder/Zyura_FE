import { useState } from "react";
import { User, Bell, CreditCard, Shield, BookOpen } from "lucide-react";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import StudySettings from "@/components/dashboard/settings/StudySettings";
import PaymentSettings from "@/components/dashboard/settings/PaymentSettings";
import PrivacySettings from "@/components/dashboard/settings/PrivacySettings";
import SecuritySettings from "@/components/dashboard/settings/SecuritySettings";
import NotificationSettings from "@/components/dashboard/settings/NotificationSettings";

// Mock data for dynamic content
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/api/placeholder/40/40",
  studyGoal: "03 Hours",
  studyStreak: 15,
  totalStudyTime: "127 Hours",
  completedCourses: 8,
  currentLevel: "Intermediate",
  aiAssistant: true,
  adaptiveDifficulty: false,
  recommendations: true,
};

const mockNotifications = [
  {
    id: 1,
    type: "Study Reminder",
    message: "Time for your daily study session",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "Achievement",
    message: "You've completed 5 courses this month!",
    time: "1 day ago",
    read: true,
  },
  {
    id: 3,
    type: "Goal Progress",
    message: "You're 80% towards your weekly goal",
    time: "2 days ago",
    read: true,
  },
];

const mockPaymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/26", isDefault: true },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "09/25",
    isDefault: false,
  },
];

type TabConfig = {
  name: string;
  icon: React.ElementType;
  component: React.ComponentType<any>; // accept different props
};

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState("Study Settings");
  const [userData, setUserData] = useState(mockUserData);

  const tabs: TabConfig[] = [
    { name: "Study Settings", icon: BookOpen, component: StudySettings },
    {
      name: "Notification Setting",
      icon: Bell,
      component: NotificationSettings,
    },
    { name: "Payment Setting", icon: CreditCard, component: PaymentSettings },
    { name: "Privacy", icon: User, component: PrivacySettings },
    { name: "Security", icon: Shield, component: SecuritySettings },
  ];

  const renderTabContent = () => {
    const activeTabData = tabs.find((tab) => tab.name === activeTab);
    if (!activeTabData) return null;

    const Component = activeTabData.component;

    if (activeTab === "Study Settings") {
      return <Component userData={userData} onUserDataChange={setUserData} />;
    } else if (activeTab === "Notification Setting") {
      return <Component notifications={mockNotifications} />;
    } else if (activeTab === "Payment Setting") {
      return <Component paymentMethods={mockPaymentMethods} />;
    } else {
      return <Component />;
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Community & Event", link: "/dashboard/community-event" },
  ];

  return (
    <div className="my-6 md:my-10">
      {/* Header */}

      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-lg text-gray-900 mb-4">
              Settings
            </h2>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.name;

                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`
                        w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-left transition-colors
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 ${
                        isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{activeTab}</h2>
              <p className="text-gray-600 mt-1">
                {activeTab === "Study Settings" && "Customize your experience"}
                {activeTab === "Notification Setting" &&
                  "Manage your notification preferences"}
                {activeTab === "Payment Setting" &&
                  "Manage your billing and payment methods"}
                {activeTab === "Privacy" &&
                  "Control your privacy and data settings"}
                {activeTab === "Security" &&
                  "Secure your account and manage sessions"}
              </p>
            </div>

            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
