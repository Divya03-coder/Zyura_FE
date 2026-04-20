import CommonSpace from "@/common/space/CommonSpace";
import DashBoardCard from "../reuseable/DashBoardCard";
import DashboardTopSection from "../reuseable/DashboardTopSection";

import { useGetDashboardDataQuery } from "@/store/features/adminDashboard/UserManagement/studentsManagementApi";
import { LuUsers } from "react-icons/lu";

const TopSectionCard = () => {
  const { data } = useGetDashboardDataQuery();
  const dashboardData = data?.data;

  const dashboardStats = [
    {
      title: dashboardData?.students?.title || "Total Students",
      value: dashboardData?.students?.total ?? 0,
      subtitle: `${
        (dashboardData?.students?.change ?? 0) >= 0 ? "Up" : "Down"
      } ${Math.abs(dashboardData?.students?.change ?? 0)}% ${
        dashboardData?.students?.period || "from last month"
      }`,
      icon: LuUsers,
      iconColor: "text-[#09090B]",
      subtitleColor:
        dashboardData?.students?.trend === "increase"
          ? "text-green-500"
          : "text-red-500",
    },
    {
      title: dashboardData?.professionals?.title || "Total Professionals",
      value: dashboardData?.professionals?.total ?? 0,
      subtitle: `${
        (dashboardData?.professionals?.change ?? 0) >= 0 ? "Up" : "Down"
      } ${Math.abs(dashboardData?.professionals?.change ?? 0)}% ${
        dashboardData?.professionals?.period || "from last month"
      }`,
      icon: LuUsers,
      iconColor: "text-[#09090B]",
      subtitleColor:
        dashboardData?.professionals?.trend === "increase"
          ? "text-green-500"
          : "text-red-500",
    },
    {
      title: dashboardData?.mentors?.title || "Active Mentors",
      value: dashboardData?.mentors?.total ?? 0,
      subtitle: `${
        (dashboardData?.mentors?.change ?? 0) >= 0 ? "Up" : "Down"
      } ${Math.abs(dashboardData?.mentors?.change ?? 0)}% ${
        dashboardData?.mentors?.period || "from last month"
      }`,
      icon: LuUsers,
      iconColor: "text-[#09090B]",
      subtitleColor:
        dashboardData?.mentors?.trend === "increase"
          ? "text-green-500"
          : "text-red-500",
    },
    {
      title: dashboardData?.aiRequest?.title || "Daily AI Requests",
      value: dashboardData?.aiRequest?.total ?? 0,
      subtitle: `${
        (dashboardData?.aiRequest?.change ?? 0) >= 0 ? "Up" : "Down"
      } ${Math.abs(dashboardData?.aiRequest?.change ?? 0)}% ${
        dashboardData?.aiRequest?.period || "from yesterday"
      }`,
      icon: LuUsers,
      iconColor: "text-[#09090B]",
      subtitleColor:
        dashboardData?.aiRequest?.trend === "increase"
          ? "text-green-500"
          : "text-red-500",
    },
  ];

  return (
    <div>
      <DashboardTopSection
        title="Dashboard"
        description="Overview of your business"
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

export default TopSectionCard;
