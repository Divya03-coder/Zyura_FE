/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Overview from "./tabs/Overview";
import FAQ from "./tabs/FAQ";
import Tickets from "./tabs/Tickets";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Help & Support ", link: "/dashboard/help" },
];

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "faq":
        return <FAQ />;
      case "tickets":
        return <Tickets />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="my-3 px-2">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <main className="">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold text-[#000000] mb-2">
            Help & Support
          </h1>
          <p className="text-sm font-normal text-slate-700">
            Get help with your account, find answers to common questions, or
            contact our support team
          </p>
        </div>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6">{renderTabContent()}</div>
      </main>
    </div>
  );
}

function TabNavigation({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: any;
}) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "faq", label: "FAQ" },
    { id: "tickets", label: "Tickets" },
  ];

  return (
    <div className="w-[290px] flex justify-between gap-2 border border-border rounded-full py-2 px-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`min-w-[80px] px-4 py-2 font-medium text-sm text-slate-900 cursor-pointer rounded-full ${
            activeTab === tab.id
              ? " text-white bg-[#0076F5] rounded-full"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
