/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  ArrowRight,
  Filter,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteMyContentMutation } from "@/store/features/content/content.api";
import {
  useGetAllClinicalCaseQuery,
  useGetAllGeneratedClinicalCasesQuery,
} from "@/store/features/clinicalCase/clinicalCase.api";
import { ClinicalCaseData } from "@/types/clinicalCase";
import ClinicalCasesFilterModal from "./ClinicalCasesFilterModal";
import Pagination from "@/common/custom/Pagination";

type TabType = "All Cases" | "AI Generated" | "Complete Cases";

const AllClinicalCases: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    subject: "",
    system: "",
    topic: "",
  });
  const [activeTab, setActiveTab] = useState<TabType>("All Cases");
  const [currentPage, setCurrentPage] = useState(1);
  const [caseToDelete, setCaseToDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const [deleteContent, { isLoading: isDeletingContent }] =
    useDeleteMyContentMutation();

  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch Standard Cases
  const { data: standardData, isFetching: isFetchingStandard } =
    useGetAllClinicalCaseQuery(
      {
        searchTerm: searchTerm.trim() !== "" ? searchTerm : undefined,
        subject: filters.subject !== "" ? filters.subject : undefined,
        system: filters.system !== "" ? filters.system : undefined,
        topic: filters.topic !== "" ? filters.topic : undefined,
        page: currentPage,
        limit: 12,
      },
      {
        skip: activeTab === "AI Generated",
      },
    );

  // Fetch AI Generated Cases
  const { data: generatedData, isFetching: isFetchingGenerated } =
    useGetAllGeneratedClinicalCasesQuery(
      {
        searchTerm: searchTerm.trim() !== "" ? searchTerm : undefined,
        subject: filters.subject !== "" ? filters.subject : undefined,
        system: filters.system !== "" ? filters.system : undefined,
        topic: filters.topic !== "" ? filters.topic : undefined,
        page: currentPage,
        limit: 6,
      },
      {
        skip: activeTab !== "AI Generated",
      },
    );

  // Determine which data to display
  const clinicalCases: ClinicalCaseData[] = useMemo(() => {
    if (activeTab === "AI Generated") {
      return generatedData?.data || [];
    }
    return standardData?.data || [];
  }, [activeTab, standardData, generatedData]);

  const isFetching =
    activeTab === "AI Generated" ? isFetchingGenerated : isFetchingStandard;
  const meta =
    activeTab === "AI Generated" ? generatedData?.meta : standardData?.meta;
  const totalPages = meta?.totalPages || 1;
  const paginatedCases = clinicalCases;

  const handleApplyFilter = (filterData: {
    subject: string;
    system: string;
    topic: string;
  }) => {
    setFilters(filterData);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const handleDeleteConfirm = async () => {
    if (!caseToDelete) return;
    try {
      await deleteContent({ id: caseToDelete, key: "clinicalcase" }).unwrap();
      setCaseToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const CaseCard = ({ caseData }: { caseData: ClinicalCaseData }) => {
    const handleStartCase = () => {
      // Appends ?type=generated if we are in the generated tab
      const query = activeTab === "AI Generated" ? "?type=generated" : "";
      navigate(`/dashboard/clinical-case/${caseData._id}${query}`);
    };

    return (
      <div className="flex flex-col justify-between bg-blue-50 rounded-lg border border-blue-300 p-6 hover:shadow-md transition-shadow">
        <div>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-600">
                {caseData?.topic}
              </span>
              {caseData?.difficultyLevel && (
                <span className="px-2 py-1 text-xs font-medium border rounded-full text-purple-600">
                  {caseData?.difficultyLevel}
                </span>
              )}
              {caseData?.isComplete && (
                <span className="px-2 py-1 text-xs font-medium border rounded-full text-green-800 bg-green-100 border-green-200">
                  Completed
                </span>
              )}
            </div>
            {activeTab === "AI Generated" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCaseToDelete(caseData._id);
                }}
                disabled={isDeletingContent}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeletingContent && caseToDelete === caseData._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-4">
            {caseData.caseTitle}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {caseData?.patientPresentation}
          </p>
        </div>

        <PrimaryButton
          onClick={handleStartCase}
          className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium flex items-center gap-2 ${caseData?.isComplete ? "bg-green-800 hover:bg-green-900" : ""}`}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {caseData?.isComplete ? "View Case" : "Start Case"}
        </PrimaryButton>
      </div>
    );
  };

  return (
    <div className="mb-3">
      <h1 className="text-xl font-semibold mb-6 mt-10">All Cases</h1>

      {/* Search and Filter */}
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by condition or keyword"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-[450px] pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-gray-600">{meta?.total || 0} cases found</p>
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {(["All Cases", "AI Generated"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Cases Grid */}
      {isFetching ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedCases.map((caseData, idx: number) => (
              <CaseCard key={idx} caseData={caseData} />
            ))}
          </div>

          {paginatedCases.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No cases found matching your criteria.
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}

      {/* <div className="mt-4 text-center text-sm text-gray-500">
        Showing {meta?.total || 0} cases
      </div> */}

      {/* Filter Modal */}
      {isFilterOpen && (
        <ClinicalCasesFilterModal
          close={() => setIsFilterOpen(false)}
          onApply={handleApplyFilter}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!caseToDelete}
        onOpenChange={(open) => !open && setCaseToDelete(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertCircle className="w-6 h-6" />
              <DialogTitle>Delete Clinical Case</DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to delete this AI-generated clinical case?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setCaseToDelete(null)}
              disabled={isDeletingContent}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeletingContent}
              className="cursor-pointer flex items-center gap-2"
            >
              {isDeletingContent ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Case"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllClinicalCases;
