import CommonSpace from "@/common/space/CommonSpace";
import { useState } from "react";
import Tabs from "../../reuseable/Tabs";
import ProfessionalManagementCard from "./ProfessionalManagementCard";
import ProfessionalTable from "./ProfessionalTable";
const ProfessionalTab = () => {
  const [activeTab, setActiveTab] = useState("ProfessionalTypes");

  const tabs = [
    { label: "Professional Types", value: "ProfessionalTypes" },
    { label: "All Professional", value: "AllProfessional" },
  ];

  return (
    <div className="">
      <CommonSpace>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </CommonSpace>
      <div className="">
        {activeTab === "ProfessionalTypes" && <ProfessionalManagementCard />}
        {activeTab === "AllProfessional" && <ProfessionalTable />}
      </div>
    </div>
  );
};

export default ProfessionalTab;
