import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import { Search } from "lucide-react";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import MyMentorCard from "./MyMentorCard";
import Pagination from "@/common/custom/Pagination";
import { useState } from "react";
import { useGetAllMentorQuery } from "@/store/features/mentor/mentor.api";
import GlobalLoader from "@/common/GlobalLoader";
import { Mentor } from "../types";

export default function MyMentorPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Mentor", link: "/dashboard/mentorship" },
    { name: "My Mentor", link: "/dashboard/my-mentor" },
  ];

  const { data: mentorsData, isLoading } = useGetAllMentorQuery({});
  const mentors: Mentor[] = mentorsData?.data || [];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll] = useState(false);

  // Config
  const productsPerPage = 12; // Adjusted to match grid layout (4 cols * 3 rows) usually looks better
  const totalProducts = mentors.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Showing range
  const start = (currentPage - 1) * productsPerPage;
  const end = showAll
    ? totalProducts
    : Math.min(currentPage * productsPerPage, totalProducts);

  const currentMentors = showAll ? mentors : mentors.slice(start, end);

  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex items-start gap-3 mt-6">
        <DashboardHeading
          title="My Mentors"
          titleColor="text-[#0A0A0A]"
          titleSize="text-xl"
          description="Take your medical Experience from Expertise"
          descColor="text-[#4A5565]"
          descSize="text-sm"
          className=""
        />
      </div>

      {/* Search Input with Icon */}
      <div className="relative mt-6">
        <input
          type="text"
          placeholder="Search by condition or keyword"
          className="w-full md:w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {currentMentors.length > 0 ? (
          currentMentors.map((mentor) => (
            <MyMentorCard key={mentor._id} mentor={mentor} />
          ))
        ) : (
          <p>No mentors found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center space-x-5 ">
        {!showAll && mentors.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
