import Pagination from "@/common/custom/Pagination";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { useGetSingleUserNotesQuery } from "@/store/features/note/NoteAPI";
import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import FlashCardFilterModal from "../flashcard/FlashCardFilterModal";
import AllNotesTab from "./AllNotesTab";
import GeneratedNotes from "./GeneratedNotes";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "@/components/reusable/PrimaryButton";

export default function DownloadNotes() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("allNotes");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const [searchTerm, setSearchTerm] = useState("");
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    system: "",
    topic: "",
  });
  const [page, setPage] = useState(1);
  const limit = 6;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(tempSearchTerm);
      setPage(1); // Reset to first page on search change
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [tempSearchTerm]);

  const tabs = [
    { id: "allNotes", label: "All Notes" },
    { id: "generatedNotes", label: "Generated Notes" },
  ];

  const { data: noteResponse, isLoading: noteLoading } =
    useGetSingleUserNotesQuery({
      searchTerm,
      subject: filters.subject,
      system: filters.system,
      topic: filters.topic,
      page,
      limit,
    });

  const noteData = noteResponse?.data;
  const totalPages = noteResponse?.meta?.totalPages || 1;
  const currentPage = noteResponse?.meta?.page || 1;

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(tempSearchTerm);
      setPage(1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
    setIsFilterOpen(false);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchTerm("");
    setTempSearchTerm("");
    setFilters({ subject: "", system: "", topic: "" });
    setPage(1);
  };

  return (
    <div className="mb-5 px-2">
      <DashboardHeading
        title="High-Yield Medical Study Notes"
        description="Download concise, topic-focused PDF notes for anatomy, pathology, pharmacology, and more."
        className="mt-4 mb-8 space-y-2"
      />

      <div className="md:flex gap-5 space-y-3 justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by condition or keyword"
              value={tempSearchTerm}
              onChange={(e) => setTempSearchTerm(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="w-full md:w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-blue-btn-1 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-btn-1 hover:opacity-80 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
            {(filters.subject || filters.system || filters.topic) && (
              <span className="ml-1 bg-blue-btn-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                •
              </span>
            )}
          </button>
        </div>

        <Link to="/dashboard/create-note">
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            icon={<Plus className="w-4 h-4" />}
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Create Notes
          </PrimaryButton>
        </Link>
      </div>

      {(filters.subject || filters.system || filters.topic || searchTerm) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {searchTerm && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
              Search: {searchTerm}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setTempSearchTerm("");
                  setPage(1);
                }}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.subject && (
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-2">
              Subject: {filters.subject}
              <button
                onClick={() => {
                  setFilters({ ...filters, subject: "" });
                  setPage(1);
                }}
                className="hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.system && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
              System: {filters.system}
              <button
                onClick={() => {
                  setFilters({ ...filters, system: "" });
                  setPage(1);
                }}
                className="hover:text-purple-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.topic && (
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-2">
              Topic: {filters.topic}
              <button
                onClick={() => {
                  setFilters({ ...filters, topic: "" });
                  setPage(1);
                }}
                className="hover:text-orange-900"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSearchTerm("");
              setTempSearchTerm("");
              setFilters({ subject: "", system: "", topic: "" });
              setPage(1);
            }}
            className="px-3 py-1 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      <div>
        <div className="flex gap-4 my-6 md:my-8 text-lg font-semibold leading-7">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-1 text-start transition-colors duration-200 hover:cursor-pointer
              ${activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="">
          {activeTab === "allNotes" && (
            <>
              <AllNotesTab notes={noteData} loading={noteLoading} />
              {!noteLoading && totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
          {activeTab === "generatedNotes" && (
            <GeneratedNotes
              searchTerm={searchTerm}
              subject={filters.subject}
              system={filters.system}
              topic={filters.topic}
            />
          )}
        </div>
      </div>

      {isFilterOpen && (
        <FlashCardFilterModal
          close={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
        />
      )}
    </div>
  );
}
