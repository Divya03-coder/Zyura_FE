import Communities from "@/components/dashboard/community-event/Communities";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import TestOverviewCard from "@/components/reusable/TestOverviewCard";
import { CalendarDays, MessagesSquare, Star, Users } from "lucide-react";

const CommunityEvent = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Community & Event", link: "/dashboard/community-event" },
  ];

  // Dynamic data for the TestOverviewCard components
  const cardData = [
    {
      topText: "847",
      bottomText: "Active Members",
      icon: Users,
      iconColor: "text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      topText: "12",
      bottomText: "Upcoming Events",
      icon: CalendarDays,
      iconColor: "text-green-700",
      iconBg: "bg-green-100",
    },
    {
      topText: "10",
      bottomText: "Forum Posts",
      icon: MessagesSquare,
      iconColor: "text-purple-700",
      iconBg: "bg-purple-100",
    },
    {
      topText: "32",
      bottomText: "Available Mentors",
      icon: Star,
      iconColor: "text-orange-700",
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <div className="my-6 md:my-10">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div>
        <DashboardHeading
          title="Community & Events"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="Connect, learn, and grow with the medical education community"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="my-8"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardData.map((card, index) => (
          <TestOverviewCard
            key={index}
            icon={card.icon}
            iconColor={card.iconColor}
            iconBg={card.iconBg}
            topText={card.topText}
            bottomText={card.bottomText}
          />
        ))}
      </div>

      <div className="my-8 lg:my-10">
        <Communities />
      </div>
    </div>
  );
};

export default CommunityEvent;
