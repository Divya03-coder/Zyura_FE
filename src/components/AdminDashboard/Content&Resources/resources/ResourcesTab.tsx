import CommonSpace from "@/common/space/CommonSpace";
import Book from "@/components/AdminDashboard/Content&Resources/resources/book/Book";
import Carrier from "@/components/AdminDashboard/Content&Resources/resources/carrier/Carrier";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useState } from "react";
const ResourcesTab = () => {
  const [activeTab, setActiveTab] = useState("career");

  const tabs = [
    { label: "Career Resource", value: "career" },
    { label: "Books Library", value: "books" },
  ];

  return (
    <div>
      <div>
        <DashboardTopSection
          title="Resource Management"
          description="Manage MCQ banks, flashcards, quizzes, and educational resources."
        />

        <div className="">
          <CommonSpace>
            <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          </CommonSpace>
          <div className="">
            {activeTab === "career" && <Carrier />}
            {activeTab === "books" && <Book />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;
