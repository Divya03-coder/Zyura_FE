import CommonSpace from "@/common/space/CommonSpace";
import { usePaymentOverviewQuery } from "@/store/features/adminDashboard/payment/paymentApi";
import { FC } from "react";
import { LuCoins } from "react-icons/lu";
import DashBoardCard from "../reuseable/DashBoardCard";
import DashboardTopSection from "../reuseable/DashboardTopSection";

interface PlanTopProps {
  handleCreatePlan: () => void;
}

const PlanTop: FC<PlanTopProps> = ({ handleCreatePlan }) => {
  const { data: overview } = usePaymentOverviewQuery();
  const dashboardStats = [
    {
      title: "Total Revenue",
      value: `${overview?.data?.totalRevenue} ?? 0`,
      subtitle: "+12.3% from last month",
      icon: LuCoins,
      subtitleColor: "text-[#000]",
      iconColor: "!text-[#1E40AF]",
    },
    {
      title: "Active Subscribers",
      value: overview?.data?.activeSubscribers ?? 0,

      icon: LuCoins,
      iconColor: "text-[#1E40AF]",
      subtitleColor: "text-green-500",
      subtitle: "+12% from last month",
    },
    {
      title: "Active Plans",
      value: overview?.data?.thisMonthSubscribers ?? 0,
      subtitle: "01 New this month",

      icon: LuCoins,
      iconColor: "!text-[#1E40AF]",
      subtitleColor: "text-[#000]",
    },
  ];
  return (
    <div>
      <DashboardTopSection
        title="Plan Management"
        description="Create and manage subscription plans, monitor usage, and track revenue."
        buttonText="Create Plan"
        action={() => handleCreatePlan()}
      />

      <CommonSpace>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, idx) => (
            <DashBoardCard key={idx} {...stat} />
          ))}
        </div>
      </CommonSpace>
    </div>
  );
};

export default PlanTop;
