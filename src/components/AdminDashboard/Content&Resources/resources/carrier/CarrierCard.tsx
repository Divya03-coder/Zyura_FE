import DashBoardCard from "@/components/AdminDashboard/reuseable/DashBoardCard";
import { FaRegFileAlt } from "react-icons/fa";

// import { useGetDashboardDataQuery } from "@/store/features/adminDashboard/UserManagement/studentsManagementApi";

const dashboardStats = [
  {
    title: "Total Resources",
    value: 10,
    icon: FaRegFileAlt,
    iconColor: "text-[#E7000B]",
    des: "Active OSCE stations",
  },
  {
    title: "Published",
    value: `05`,
    icon: FaRegFileAlt,
    iconColor: "text-[#E7000B]",

    des: "Resources Published",
  },
  {
    title: "Last Upload",
    value: `01`,
    icon: FaRegFileAlt,
    iconColor: "text-[#E7000B]",

    des: "Career Guidence Resources  2025-09-12",
  },
];
const CarrierCard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, idx) => (
          <DashBoardCard key={idx} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default CarrierCard;
