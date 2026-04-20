import { useGetFlashCardBankQuery } from "@/store/features/flashCard/flashCard.api";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import AllGeneratedFlashCard from "./AllGeneratedFlashCard";
import GeneratedFlashCard from "./GeneratedFlashCard";
import FlashCardFilterModal from "./FlashCardFilterModal";

export default function FlashCardCollection() {
  const tabs = [
    { id: "all", label: "All" },
    { id: "generated", label: "Generated" },
  ];

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    system: "",
    topic: "",
  });
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const { data: flashcardData, isLoading: flashcardBankLoading } =
    useGetFlashCardBankQuery({
      searchTerm,
      ...filters,
      page,
      limit: 12,
    });

  const flashcardBank = flashcardData?.data;
  const meta = flashcardData?.meta;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 mt-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by condition or keyword"
            className="w-full md:w-112.5 h-12 pl-10 pr-4 border border-slate-300 rounded"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset page
            }}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        </div>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 ... bg-slate-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div>
        {/* Tab Buttons */}
        <div className="flex gap-4 my-6 items-end">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-[60px] text-center py-1 text-lg font-semibold leading-7 transition-colors duration-200 cursor-pointer border p-1 rounded 
              ${
                activeTab === tab.id
                  ? " border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "all" && (
            <AllGeneratedFlashCard
              flashcardBanks={flashcardBank}
              flashcardBankLoading={flashcardBankLoading}
              meta={meta}
              page={page}
              setPage={setPage}
            />
          )}
          {activeTab === "generated" && (
            <GeneratedFlashCard searchTerm={searchTerm} filters={filters} />
          )}
        </div>
      </div>

      {/* <div className="bg-white border border-slate-300 p-5 rounded-[8px]">
        <h3 className="font-medium mb-6">Today's Generated Flashcards</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {flashcardBank?.map((flashcard: IFlashcardBank, idx: number) => (
            <FlashCard key={idx} {...flashcard} />
          ))}
        </div>
      </div>

      <div className="mt-12 bg-white border border-slate-300 p-5 rounded-[8px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">Generated Cards</h3>
          <Link
            to={"/dashboard/all-flash-card"}
            className="text-blue-main text-sm font-medium border border-slate-200 rounded-[6px] py-2 px-4"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          {flashcardBank?.map((flashcard: IFlashcardBank, idx: number) => (
            <FlashCard key={idx} {...flashcard} />
          ))}
        </div>
      </div> */}
      {isFilterOpen && (
        <FlashCardFilterModal
          close={() => setIsFilterOpen(false)}
          onApply={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
            setIsFilterOpen(false);
          }}
        />
      )}
    </div>
  );
}
