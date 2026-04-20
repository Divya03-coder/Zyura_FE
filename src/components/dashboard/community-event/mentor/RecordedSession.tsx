import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { BreadcrumbItem } from "../../gamified-learning/types";
import SessionCard from "./SessionCard";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Mentors", link: "/dashboard/mentorship" },
  { name: "My Session", link: "/dashboard/my-session" },
];

export default function RecordedSession() {
  return (
    <div className="mt-6 mb-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DashboardHeading
        title="My Sessions"
        titleColor="text-[#0F172A]"
        titleSize="text-base"
        titleFont="font-medium"
        description="Connect, learn, and grow with the medical education community"
        descColor="text-[#4A5565]"
        descSize="text-sm"
        className="mt-8 mb-5"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {Array(4)
          .fill(null)
          .map(() => (
            <SessionCard />
          ))}
      </div>
    </div>
  );
}
