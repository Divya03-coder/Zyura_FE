/* eslint-disable @typescript-eslint/no-explicit-any */
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
// import mcqBankImg from "@/assets/dashboard/MCQ Bank img.png";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import {
  FileText,
  Filter,
  Plus,
  Search,
} from "lucide-react";
// import TestOverviewCard from "@/components/reusable/TestOverviewCard";
import GlobalLoader from "@/common/GlobalLoader";
import { TMCQBank } from "@/types";
import { QuizGeneratorDialog } from "../quizGenerator/QuizGenerateModal";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@/common/custom/Pagination";
import McqBankFilterModal from "./McqBankFilterModal";
import { useGetAllMCQBankQuery } from "@/store/features/MCQBank/MCQBank.api";

const McqBankCard = ({ mcq }: { mcq: any }) => {
  const [localCompletedCount, setLocalCompletedCount] = useState(0);

  useEffect(() => {
    const storageKey = `mcq_practice_data_${mcq._id}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const results = parsed.results || {};
        setLocalCompletedCount(Object.keys(results).length);
      } catch (e) {
        console.error("Error parsing mcq progress", e);
      }
    }
  }, [mcq._id]);

  // Priority logic: isComplete from API, then local storage
  const isCompleted = mcq.isComplete || (localCompletedCount >= mcq.totalMcq && mcq.totalMcq > 0);
  const inProgress = !isCompleted && localCompletedCount > 0;

  // Display count logic: if completed, show full count. Else show local storage count.
  const displayCount = isCompleted ? mcq.totalMcq : localCompletedCount;

  let cardBg = "bg-white border-slate-300 hover:border-blue-300";
  let badgeClasses = "bg-white text-black border border-slate-100";
  let statusText = `Not Started _ / ${mcq.totalMcq}`;
  let actionText = "Start";

  if (isCompleted) {
    cardBg = "bg-green-100 border-green-300";
    badgeClasses = "bg-green-600 text-white transition-all";
    statusText = `Completed ${mcq.totalMcq}/${mcq.totalMcq}`;
    actionText = "Start Again";
  } else if (inProgress) {
    cardBg = "bg-blue-100 border-blue-300";
    badgeClasses = "bg-blue-500 text-white transition-all";
    statusText = `In Progress ${displayCount}/${mcq.totalMcq}`;
    actionText = "Continue";
  }

  // const hierarchy = [mcq.subject, mcq.system, mcq.topic].filter(Boolean).join(" → ");

  return (
    <div className={`group relative ${cardBg} border rounded-[16px] p-4 transition-all duration-300 flex flex-col h-full min-h-[160px]`}>
      <div className="flex justify-between items-start mb-3">
        {/* Top Badges */}
        <div className="flex flex-wrap gap-2">
          {mcq.profileType && (
            <span className="px-2 py-0.5 bg-white text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-tight border border-slate-200">
              {mcq.profileType}
            </span>
          )}
          {mcq.type && (
            <span className="px-2 py-0.5 bg-white text-violet-500 text-[10px] font-bold rounded-full uppercase tracking-tight border border-violet-300">
              {mcq.type}
            </span>
          )}
        </div>

        {/* Status Badge */}
        <span className={`px-4 py-1.5 rounded-full text-[12px] font-normal whitespace-nowrap flex items-center h-fit ${badgeClasses}`}>
          {statusText}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="font-medium text-slate-900 leading-tight transition-colors">
          {mcq.title}
        </h4>
      </div>

      <div className="mt-auto">
        <Link
          to={`/dashboard/practice-mcq/${mcq._id}`}
          className="text-[#007BFF] font-medium underline underline-offset-8 decoration-2 decoration-blue-200 hover:decoration-blue-600 transition-all"
        >
          {actionText}
        </Link>
      </div>
    </div>
  );
};

const McqBank = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "MCQ Bank", link: "/dashboard/mcq-bank" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    subject: "",
    system: "",
    topic: "",
  });

  const { data, isFetching } = useGetAllMCQBankQuery({
    searchTerm: searchTerm || undefined,
    subject: filters.subject || undefined,
    system: filters.system || undefined,
    topic: filters.topic || undefined,
    page,
    limit: 10,
  });
  const MCQBank = data?.data;
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleApplyFilter = (filterData: {
    subject: string;
    system: string;
    topic: string;
  }) => {
    setFilters(filterData);
    setPage(1); // Reset to first page when filters change
    setIsFilterOpen(false);
  };

  return (
    <div className="my-3 px-2">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DashboardHeading
          title="MCQ Bank"
          titleSize="text-2xl"
          titleColor="text-slate-900"
          description="Access targeted question banks to sharpen your medical knowledge with AI assistance."
          descColor="text-slate-500"
          descFont="text-sm"
          className="mb-0"
        />
        <PrimaryButton
          icon={<Plus className="w-5 h-5" />}
          bgType="solid"
          iconPosition="left"
          bgColor="bg-blue-600"
          className="h-11 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all rounded-[8px] cursor-pointer w-full sm:w-auto px-6 font-bold"
          onClick={() => setOpenModal(true)}
        >
          Create Custom Quiz
        </PrimaryButton>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full md:w-[450px]">
            <input
              type="text"
              placeholder="Search by condition, subject or keyword..."
              className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-[8px] shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // reset page
              }}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
          <p className="text-sm text-slate-500 font-medium">
            <span className="text-slate-900 font-bold">{meta?.total || 0}</span> MCQ Banks available
          </p>
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 border border-slate-200 text-white px-6 py-2 h-12 rounded-[8px] cursor-pointer hover:bg-blue-700 hover:border-slate-300 transition-all w-full lg:w-auto font-bold shadow-sm"
        >
          <Filter className="w-4 h-4 text-white" />
          Filter
        </button>
      </div>

      {isFetching ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <GlobalLoader />
        </div>
      ) : (
        <>
          <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {MCQBank?.length > 0 ? (
              MCQBank?.map((mcq: TMCQBank) => (
                <McqBankCard key={mcq?._id} mcq={mcq} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold text-lg">No MCQ Banks found</p>
                <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <QuizGeneratorDialog open={openModal} setOpen={setOpenModal} />
      {isFilterOpen && (
        <McqBankFilterModal
          close={() => setIsFilterOpen(false)}
          onApply={handleApplyFilter}
        />
      )}
    </div>
  );
};

export default McqBank;
