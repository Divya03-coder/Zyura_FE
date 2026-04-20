import CommonSpace from "@/common/space/CommonSpace";
import AllStudentProfileTable from "@/components/AdminDashboard/userManagement/student/AllStudentProfileTable";
import { useState } from "react";
import Tabs from "../../reuseable/Tabs";
import UserManagementCard from "../../reuseable/UserManagementCard";
const StudentTab = () => {
  const [activeTab, setActiveTab] = useState("StudentTypes");

  const tabs = [
    { label: "Student Types", value: "StudentTypes" },
    { label: "All Students", value: "AllStudents" },
  ];

  return (
    <div className="">
      <CommonSpace>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </CommonSpace>
      <div className="">
        {activeTab === "StudentTypes" && <UserManagementCard />}
        {activeTab === "AllStudents" && <AllStudentProfileTable />}
      </div>
    </div>
  );
};

export default StudentTab;
