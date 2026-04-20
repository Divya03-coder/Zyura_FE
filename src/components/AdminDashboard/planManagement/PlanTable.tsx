import CommonSpace from "@/common/space/CommonSpace";
import { useState } from "react";
import Tabs from "../reuseable/Tabs";
import PlanOverviewTable from "./PlanOverviewTable";
import PlanSubscriptionTable from "./PlanSubscriptionTable";

const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Subscription", value: "subscription" },
];
const PlanTable = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>
      <CommonSpace>
        <div>{activeTab === "overview" && <PlanOverviewTable />}</div>
        <div>{activeTab === "subscription" && <PlanSubscriptionTable />}</div>
      </CommonSpace>
    </div>
  );
};

export default PlanTable;
