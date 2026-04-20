import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { useState } from "react";
import AllTransactionTab from "./AllTransactionTab";
import DueAmountTab from "./DueAmountTab";

export default function RecentTransaction() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/mentor" },
    { name: "Classes", link: "/mentor/classes" },
  ];

  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Transaction" },
    { id: "due", label: "Due Amount" },
  ];

  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DashboardHeading
        title="Recent Transaction"
        titleSize="text-xl"
        titleFont="font-medium"
        titleColor="text-black"
        description="Keep track of your earnings awaiting transfer."
        descSize="text-sm"
        descColor="text-slate-700"
        className="mb-7"
      />

      <div>
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
              {activeTab === "all" && <AllTransactionTab />}
              {activeTab === "due" && <DueAmountTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
