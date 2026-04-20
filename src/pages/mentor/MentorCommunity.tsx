import { useState } from "react";
// import MentorCommunityTabs from "./components/MentorCommunityTabs"
// import SocialFeed from "./components/SocialFeed"
// import Question from "./components/Question"
// import Forums from "./components/Forums"
// import Message from "./components/Message"
import SocialFeed from "@/components/mentorCommunity/SocialFeed";
import Question from "@/components/mentorCommunity/Question";
import Forums from "@/components/mentorCommunity/Forums";
import Messages from "@/components/mentorCommunity/Messages";
import MentorCommunityTabs from "@/components/mentorCommunity/MentorCommunityTabs";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

export type TabType = "Social Feed" | "Question" | "Forums" | "Message";

const MentorCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Social Feed");
  const tabs: TabType[] = ["Social Feed", "Question", "Forums", "Message"];

  const renderContent = () => {
    switch (activeTab) {
      case "Social Feed":
        return <SocialFeed />;
      case "Question":
        return <Question />;
      case "Forums":
        return <Forums />;
      case "Message":
        return <Messages />;
      default:
        return <SocialFeed />;
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Group Study", link: "/dashboard/mentor-community" },
  ];

  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="min-h-screen bg-gray-50">
        <div className="w-full mx-auto pb-6">
          <MentorCommunityTabs
            title="Social Feed"
            description="Share knowledge, ask questions, and connect with the medical community"
            tabs={tabs}
            activeTab={activeTab}
            setTab={setActiveTab}
          />
          <div className="mt-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default MentorCommunity;
