import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import MentorOverviewCard from "@/components/reusable/MentorOverviewCard";
import { BookOpenText, NotepadText } from "lucide-react";
import { useState } from "react";
import MentorAllSessionTab from "./MentorAllSessionTab";
import MentorSessionCard from "../MentorSessionCard";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Community & Event", link: "/dashboard/community-event" },
  { name: "All Communities", link: "/dashboard/all-communities" },
];

const MentorClasses = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <DashboardHeading
        title=" Your Expertise, Their Success"
        titleSize="text-xl"
        titleFont="font-medium"
        titleColor="text-black"
        description="Connect with students who value your skills and experience"
        descSize="text-sm"
        descColor="text-slate-700"
        className="mb-7"
      />

      <div className="flex items-center gap-7">
        <MentorOverviewCard
          icon={BookOpenText}
          iconColor="text-blue-700"
          iconBg="bg-blue-100"
          value="$ 2470"
          bottomText="Total Earnings"
        />
        <MentorOverviewCard
          icon={NotepadText}
          iconColor="text-fuchsia-700"
          iconBg="bg-fuchsia-100"
          value="$ 750"
          bottomText="Pending Pay-out"
        />
      </div>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Schedule Classes</h2>

      {/* Tab  */}
      <div>
        <div>
          {/* Tab Buttons */}
          <div className="flex gap-4 my-6 md:my-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={` py-1 text-start text-lg font-semibold leading-7 transition-colors duration-200 hover:cursor-pointer
                    ${
                      activeTab === tab.id
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-blue-500"
                    }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="">
            {activeTab === "all" && <MentorAllSessionTab />}
            {activeTab === "upcoming" && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <MentorSessionCard key={i} session={null} />
                  ))}
              </div>
            )}
            {activeTab === "completed" && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(2)
                  .fill(null)
                  .map((_, i) => (
                    <MentorSessionCard key={i} session={null} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorClasses;
