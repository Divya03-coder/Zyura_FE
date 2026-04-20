import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { ArrowLeft, CalendarDays, TimerOff, Video } from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Link } from "react-router-dom";
import { useGetMyUpcomingSessionsQuery } from "@/store/features/mentor/mentor.api";
import GlobalLoader from "@/common/GlobalLoader";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Mentors", link: "/dashboard/mentorship" },
  { name: "My Session", link: "/dashboard/my-session" },
];

export default function MySession() {
  const { data: sessions, isLoading } = useGetMyUpcomingSessionsQuery({});

  if (isLoading) return <GlobalLoader />;

  return (
    <div className="mt-6 mb-16">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex items-start gap-1">
        <Link to="/dashboard/mentorship" className="sm:mb-0">
          <ArrowLeft className="mt-3" />
        </Link>
        <DashboardHeading
          title="My Sessions"
          titleColor="text-[#0F172A]"
          titleSize="text-base"
          titleFont="font-medium"
          description="Connect, learn, and grow with the medical education community"
          descColor="text-[#4A5565]"
          descSize="text-sm"
          className="mt-3 mb-5"
        />
        {/* <Link to={"/dashboard/recorded-session"}>
          <Button className="bg-blue-main hover:bg-blue-600 cursor-pointer">
            Recorded Session
          </Button>
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {sessions && sessions.length > 0 ? (
          sessions.map((session: any) => (
            <Link
              key={session._id}
              to={`/dashboard/session-details/${session.sessionId}`}
            >
              <div className="border border-slate-300 rounded-[8px] bg-[#EFF6FF] p-5 h-full flex flex-col">
                <p className="text-sm text-[#0A0A0A] font-medium line-clamp-2">
                  {session.issue || "General Mentorship Session"}
                </p>
                <p className="text-sm text-[#717182] mt-0.5">
                  with
                  <span className="text-sm text-zinc-700 underline ml-1">
                    {session.firstName} {session.lastName}
                  </span>
                </p>

                <div className="mt-4 mb-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    <p className="text-xs text-[#4A5565]">
                      {session.date} • {session.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-gray-500" />
                    <p className="text-xs text-[#4A5565]">Online Session</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <PrimaryButton
                    iconPosition="left"
                    className="w-full bg-blue-main text-white border border-slate-300 transition-colors hover:bg-blue-main hover:text-white"
                    icon={<TimerOff className="h-4 w-4" />}
                  >
                    {session.sessionStatus || "Upcoming"}
                  </PrimaryButton>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No sessions scheduled yet.</p>
            <Link
              to="/dashboard/mentorship"
              className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block"
            >
              Browse Mentors
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
