import PlanForm from "@/components/AdminDashboard/planManagement/PlanForm";
import PlanTable from "@/components/AdminDashboard/planManagement/PlanTable";
import PlanTop from "@/components/AdminDashboard/planManagement/PlanTop";
import { useState } from "react";

const CreatePlan = () => {
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const handleCreatePlan = () => {
    setShowCreatePlan(true);
  };
  return (
    <div>
      {showCreatePlan ? (
        <PlanForm handleCancel={() => setShowCreatePlan(false)} />
      ) : (
        <div>
          <PlanTop handleCreatePlan={handleCreatePlan} />
          <PlanTable />
        </div>
      )}
    </div>
  );
};

export default CreatePlan;
