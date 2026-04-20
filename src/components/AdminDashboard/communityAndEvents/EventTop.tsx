import CommonSpace from "@/common/space/CommonSpace";
import { EventsOverview } from "@/store/features/adminDashboard/ContentResources/event/types/allEvent";
import { FC } from "react";
import { RiCalendarTodoLine } from "react-icons/ri";
import DashBoardCard from "../reuseable/DashBoardCard";
import DashboardTopSection from "../reuseable/DashboardTopSection";

interface EventTopProps {
  handleCreateEvent: () => void;
  overview: EventsOverview;
}

const EventTop: FC<EventTopProps> = ({ handleCreateEvent, overview }) => {
  const dashboardStats = [
    {
      title: "Total Events",
      value: overview.totalEvents ?? 0,
      subtitle: "+12.3% from last month",
      icon: RiCalendarTodoLine,
      subtitleColor: "text-[#000]",
      iconColor: "!text-[#14B8A6]",
    },
    {
      title: "Total Registrations",
      value: overview.totalRegisteredEvents ?? 0,

      icon: RiCalendarTodoLine,
      iconColor: "text-[#14B8A6]",
      subtitleColor: "text-[##15803D]",
      subtitle: "+12% from last month",
    },
    {
      title: "Total Revenue",
      value: overview.totalRevenueGenerated ?? 0,
      subtitle: "01 New this month",

      icon: RiCalendarTodoLine,
      iconColor: "!text-[#14B8A6]",
      subtitleColor: "text-[#000]",
    },
  ];
  return (
    <div>
      <DashboardTopSection
        title="Event Management"
        description="Create and manage online events, seminars, and workshops"
        buttonText="Create Events"
        action={() => handleCreateEvent()}
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

export default EventTop;
