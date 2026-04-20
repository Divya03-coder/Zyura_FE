import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useState } from "react";
import Pagination from "@/common/custom/Pagination";
import MyMentorCard from "./MyMentorCard";
import { useGetAllMentorQuery } from "@/store/features/mentor/mentor.api";
import { Mentor } from "../types";
import GlobalLoader from "@/common/GlobalLoader";

export default function AllMentorPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Mentor", link: "/dashboard/mentorship" },
    { name: "All Mentor", link: "/dashboard/all-mentor" },
  ];

  const { data: mentorsData, isLoading } = useGetAllMentorQuery({});
  const mentors: Mentor[] = mentorsData?.data || [];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll] = useState(false);

  // Config
  const productsPerPage = 12; // 4 columns * 3 rows
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
      <DashboardHeading
        title="All Mentor"
        titleSize="text-xl"
        titleColor="text-[#0A0A0A]"
        description="Connect, learn, and grow with the medical education community"
        descSize="text-sm"
        descColor="text-[#4A5565]"
        className="mb-8 space-y-1"
      />

      <div className="md:flex gap-5 space-y-3 justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Search Input with Icon */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by condition or keyword"
              className="w-full md:w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>

          {/* Dropdown */}
          <select className="h-12 px-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option value="all">ALL</option>
            <option value="pending">Pending Request</option>
            {/* <option value="orthopedics">Orthopedics</option> */}
          </select>
        </div>
        <Link to={"/dashboard/my-mentor"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            // icon={<Plus className="w-4 h-4" />}
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            My Mentors
          </PrimaryButton>
        </Link>
      </div>

      <div className="">
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentMentors.length > 0 ? (
            currentMentors.map((mentor) => (
              <MyMentorCard key={mentor._id} mentor={mentor} />
            ))
          ) : (
            <p>No mentors found.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center space-x-5 ">
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
