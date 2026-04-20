import AllClinicalCases from "@/components/dashboard/clinical-case/AllClinicalCases";
// import ClinicalLeaderboard from "@/components/dashboard/clinical-case/ClinicalLeaderboard";
// import ClinicalProgress from "@/components/dashboard/clinical-case/ClinicalProgress";
// import ClinicalRecommendation from "@/components/dashboard/clinical-case/ClinicalRecommendation";
// import ClinicalWeekPlan from "@/components/dashboard/clinical-case/ClinicalWeekPlan";
import CreateClinicalCaseModal from "@/components/dashboard/clinical-case/CreateClinicalCaseModal";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus } from "lucide-react";
import { useState } from "react";

const ClinicalCaseGenerator = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="mt-5 px-2">
      {/* heading */}
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
        <div>
          <DashboardHeading
            title="Clinical Case Library"
            titleSize="text-xl md:text-2xl"
            titleColor="text-[#0A0A0A]"
            description="Sharpen your diagnostic skills. Ready for your next challenge?"
            descColor="text-[#4A5565]"
            descFont="text-sm"
          />
        </div>
        <PrimaryButton
          icon={<Plus className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => setOpenModal(true)}
        >
          Create Clinical Case
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* week plan */}
        {/* <div>
          <ClinicalWeekPlan />
        </div> */}
        {/* Progress */}
        {/* <div>
          <ClinicalProgress
            weeklyGoal={10}
            completedCases={6}
            timeSpent={15}
            badges={["Case Solver - Level 1", "Neuro Star"]}
          />
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Recommendation */}
        {/* <div>
          <ClinicalRecommendation />
        </div> */}
        {/* Weekly Leaderboard */}
        {/* <div>
          <ClinicalLeaderboard />
        </div> */}
      </div>

      {/* All Cases */}
      <div>
        {/* filter */}
        <div>
          <AllClinicalCases />{" "}
        </div>
        {/* cards + pagination */}
        <div></div>
      </div>
      <CreateClinicalCaseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default ClinicalCaseGenerator;
