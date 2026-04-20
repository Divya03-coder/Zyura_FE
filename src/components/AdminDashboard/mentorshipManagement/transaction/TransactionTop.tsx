import CommonSpace from "@/common/space/CommonSpace";
import { LuCoins } from "react-icons/lu";
import DashboardTopSection from "../../reuseable/DashboardTopSection";
import DashBoardCard from "../../reuseable/DashBoardCard";

const dashboardStats = [
  {
    title: "Pending Payouts",
    value: "$2500",
    subtitle: "3 month",
    icon: LuCoins,
    subtitleColor: "text-green-500",
    iconColor: "text-[#EA580C]",
  },
  {
    title: "Total Paid",
    value: "3582$",
    icon: LuCoins,
    iconColor: "text-[#EA580C]",
    subtitleColor: "text-green-500",
    subtitle: "This month",
  },
  {
    title: "Platform Revenue",
    value: "$471.00",
    subtitle: "Commission earned",

    icon: LuCoins,
    iconColor: "text-[#EA580C]",
    subtitleColor: "text-[#000]",
  },
  {
    title: "Disputed Sessions",
    value: 8,
    subtitle: "Requires review",
    icon: LuCoins,
    iconColor: "text-[#EA580C]",
    subtitleColor: "text-[#000]",
  },
];

const TransactionTop = () => {
  return (
    <div>
      <DashboardTopSection
        title="Mentorship  Administration"
        description="Configure programs, track progress, and manage mentor-mentee relationships."
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

export default TransactionTop;
