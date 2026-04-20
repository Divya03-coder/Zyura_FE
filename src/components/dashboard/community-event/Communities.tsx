import CommunityEventHomeCard from "@/components/reusable/CommunityEventHomeCard";
import {
  Calendar,
  Users,
  UserCheck,
  MessageSquare,
  BookOpen,
  Search,
  UserPlus,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Communities = () => {
  const navigate = useNavigate();

  const cardConfigs = [
    {
      icon: CalendarDays,
      title: "Events",
      description: "Join webinars, workshops, and medical conferences",
      stats: [
        { label: "This Week", value: "5 events" },
        { label: "Free Events", value: "8" },
      ],
      buttonText: "View Events",
      buttonIcon: Calendar,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
      buttonColor: "bg-blue-800 hover:bg-blue-700",
    },
    {
      icon: Users,
      title: "Study Groups",
      description:
        "Find or create study groups with peers in your specialty and year",
      stats: [{ label: "Active Groups", value: "23" }],
      buttonText: "Browse Groups",
      buttonIcon: Search,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
      buttonColor: "bg-blue-800 hover:bg-blue-700",
    },
    {
      icon: UserCheck,
      title: "Mentorship",
      description:
        "Connect with experienced doctors and residents for guidance",
      stats: [{ label: "Available Mentors", value: "45" }],
      buttonText: "Find Mentor",
      buttonIcon: UserPlus,
      iconColor: "text-emerald-600",
      iconBgColor: "bg-emerald-50",
      buttonColor: "bg-blue-800 hover:bg-blue-700",
    },
    {
      icon: MessageSquare,
      title: "Social Feed",
      description: "Join discussions and get help from the community",
      stats: [{ label: "Today's Posts", value: "18" }],
      buttonText: "Browse Social Feed",
      buttonIcon: MessageCircle,
      iconColor: "text-orange-600",
      iconBgColor: "bg-orange-50",
      buttonColor: "bg-blue-800 hover:bg-blue-700",
    },
    {
      icon: BookOpen,
      title: "Forums",
      description: "Join discussions and get help from the community",
      stats: [
        { label: "Active Topics", value: "234" },
        { label: "Today's Posts", value: "18" },
      ],
      buttonText: "Browse Forums",
      buttonIcon: MessageCircle,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
      buttonColor: "bg-blue-800 hover:bg-blue-700",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow medical students and professionals",
      stats: [
        { label: "Active Members", value: "1,247" },
        { label: "Online Now", value: "89" },
      ],
      buttonText: "Join Community",
      buttonIcon: UserPlus,
      iconColor: "text-indigo-600",
      iconBgColor: "bg-indigo-50",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
    },
  ];

  const handleCardClick = () => {
    navigate("/dashboard/all-communities");
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardConfigs.map((config, index) => (
          <CommunityEventHomeCard
            key={index}
            {...config}
            onClick={() => handleCardClick()}
          />
        ))}
      </div>
    </div>
  );
};

export default Communities;
