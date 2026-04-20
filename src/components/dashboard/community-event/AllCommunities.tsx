import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../gamified-learning/types";
import EventPage from "./EventPage";
// import SocialFeedPage from "./SocialFeedPage";
// import ForumsPage from "./ForumsPage";
import MessagesPage from "./messages/MessagesPage";
import MentorCommunityTabs from "@/components/mentorCommunity/MentorCommunityTabs";
import SocialFeed from "@/components/mentorCommunity/SocialFeed";
import Forums from "@/components/mentorCommunity/Forums";

interface Event {
  id: string;
  title: string;
  type:
    | "PLAB Prep"
    | "Workshop"
    | "Conference"
    | "Telemedicine"
    | "Health Summit";
  date: string;
  time?: string;
  description: string;
  price: string;
  status: "Free" | "Paid";
  featured?: boolean;
  startTime: string;
  endTime: string;
  color: string;
}

// interface StudyGroup {
//   id: string;
//   name: string;
//   description: string;
//   members: number;
//   subject: string;
//   leader: string;
// }

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Community & Event", link: "/dashboard/community-event" },
  { name: "All Communities", link: "/dashboard/all-communities" },
];

const MedicalEventsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Social Feed");
  const [activeEventFilter, setActiveEventFilter] = useState("All Event");
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  // const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEvents([
        {
          id: "1",
          title: "Free Webinar: How to Prepare for USMLE Step 1 in 3 Months",
          type: "PLAB Prep",
          date: "June 15, 2025",
          time: "5:00 PM GMT",
          description: "Dr. Maria Estevez - Internal Medicine, NYU",
          price: "Free",
          status: "Free",
          featured: true,
          startTime: "17:00",
          endTime: "18:30",
          color: "bg-blue-500",
        },
        {
          id: "2",
          title: "PLAB 1 Crash Webinar",
          type: "PLAB Prep",
          date: "June 20, 2025",
          description: "Intensive review session covering high-yield topics",
          price: "Free",
          status: "Free",
          startTime: "14:00",
          endTime: "16:00",
          color: "bg-red-500",
        },
      ]);

      // setStudyGroups([
      //   {
      //     id: "1",
      //     name: "USMLE Step 1 Warriors",
      //     description: "Focused group for high-yield review",
      //     members: 45,
      //     subject: "USMLE Step 1",
      //     leader: "Dr. Alex Johnson",
      //   },
      //   {
      //     id: "2",
      //     name: "PLAB Prep Squad",
      //     description: "Daily practice questions and discussions",
      //     members: 32,
      //     subject: "PLAB 1",
      //     leader: "Sarah Lee",
      //   },
      // ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PLAB Prep":
        return "bg-red-500";
      case "Workshop":
        return "bg-green-500";
      case "Conference":
        return "bg-purple-500";
      case "Telemedicine":
        return "bg-blue-500";
      case "Health Summit":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  // ✅ Tabs config matching your MentorCommunityTabs format
  const tabs = [
    "Social Feed",
    "Events",
    // "Study Groups",
    "Forums",
    "Messages",
  ];

  return (
    <div className="my-6">
      {/* ✅ Replace ShadCN Tabs with your MentorCommunityTabs */}
      <div className="">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <MentorCommunityTabs
          tabs={tabs}
          activeTab={activeTab}
          setTab={setActiveTab}
        />
      </div>

      {/* ✅ Render content based on activeTab (same logic, no functionality change) */}
      <div className="mt-3 space-y-6">
        {/* {activeTab === "Social Feed" && <SocialFeedPage />} */}
        {activeTab === "Social Feed" && <SocialFeed />}

        {activeTab === "Events" && (
          <EventPage
            events={events}
            activeEventFilter={activeEventFilter}
            setActiveEventFilter={setActiveEventFilter}
            eventFilters={["All Event", "Registered Event"]}
            isLoading={isLoading}
            getTypeColor={getTypeColor}
          />
        )}

        {/* {activeTab === "Study Groups" && (
          <StudyGroupPage studyGroups={studyGroups} isLoading={isLoading} />
        )} */}

        {activeTab === "Forums" && <Forums />}

        {activeTab === "Messages" && <MessagesPage />}
      </div>
    </div>
  );
};

export default MedicalEventsDashboard;
