import Spinner from "@/common/button/Spinner";
import Pagination from "@/common/custom/Pagination";
import TableContent, {
  TOCItem,
} from "@/components/AdminDashboard/Content&Resources/content/medical/studyMode/TableContentForStudy";
import Tabs from "@/components/AdminDashboard/reuseable/Tabs";
import { useGetStudyModeAllContentQuery } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import {
  AllContentMCQList,
  ClinicalCaseTreeResponse,
  NotesTreeResponse,
  OsceTreeResponse,
} from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import {
  ContentType,
  setContentType,
  setUniversalSelectNode,
} from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { skipToken } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ClinicalCaseBank from "../../bank/ClinicalBank/ClinicalCaseBank";
import FlashCardBank from "../../bank/FlashCardBank/FlashCardBank";
import MCQBank from "../../bank/MCQBank/MCQBank";
import NotesBank from "../../bank/NotesBank/NotesBank";
import OSCEBank from "../../bank/OSCEBank/OSCEBank";
import { tabs } from "../../MultipleTap";
import AddSubjectModal from "./AddSubjectModal";
import { useDebounce } from "@/common/custom/useDebounce";
import { IoSearchOutline } from "react-icons/io5";

export type SelectedNode = {
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
};

const StudyMode = () => {
  const dispatch = useAppDispatch();

  const { contentType, contentFor, profileType } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const [selectedNode, setSelectedNode] = useState<SelectedNode>({
    subject: "",
    system: "",
    topic: "",
    subtopic: "",
  });

  // ✅ SINGLE SEARCH STATE
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const isValidSelection =
    selectedNode.subject.trim() !== "" ||
    selectedNode.system.trim() !== "" ||
    selectedNode.topic.trim() !== "" ||
    selectedNode.subtopic.trim() !== "";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 5;
  const navigate = useNavigate();

  // ✅ RESET ON TAB CHANGE
  useEffect(() => {
    setSearch("");
    setCurrentPage(1);
    setBankId("");

    setSelectedNode({
      subject: "",
      system: "",
      topic: "",
      subtopic: "",
    });
  }, [contentType]);

  
  // ✅ DYNAMIC PLACEHOLDER
  const getPlaceholder = () => {
    switch (contentType) {
      case "MCQ":
        return "Search by bank, subject, system, topic...";
      case "ClinicalCase":
        return "Search by title, symptoms, diagnosis...";
      case "OSCE":
        return "Search by scenario, station, task...";
      case "Notes":
        return "Search notes...";
      default:
        return "Search...";
    }
  };

  // ✅ API QUERY
  const queryArg =
    isValidSelection || debouncedSearch.trim() !== ""
      ? {
          key: contentType,
          contentFor,
          profileType: profileType.trim() || undefined,
          subject: selectedNode.subject.trim(),
          system: selectedNode.system.trim(),
          topic: selectedNode.topic.trim(),
          subtopic: selectedNode.subtopic.trim(),
          searchTerm: debouncedSearch,
          page: currentPage,
          limit,
        }
      : skipToken;

  const { data: mcqBank, isLoading } = useGetStudyModeAllContentQuery(
    queryArg,
    { refetchOnMountOrArgChange: true },
  );

  const [bankId, setBankId] = useState<string>("");

  // ✅ HANDLE BANK ID — clears global search when opening a bank
  const handleSetBankId = (id: string) => {
    setBankId(id);
    if (id !== "") {
      setSearch("");
    }
  };

  const totalPages = mcqBank?.meta?.totalPages || 1;

  const [initialContent, setInitialContent] = useState<TOCItem | null>(null);

  const mcqBankLength = mcqBank?.data?.length === 0;

  const handleOpenSubjectModal = () => {
    setIsSubjectModalOpen(true);
    setInitialContent(null);
  };

  const addButtonLabels: Record<ContentType, string> = {
    MCQ: "Add MCQ",
    Flashcard: "Add Flashcard",
    ClinicalCase: "Add Clinical Case",
    OSCE: "Add OSCE",
    Notes: "Add Notes",
  };

  return (
    <div>
      <div className="w-[calc(100vw-356px)] flex items-start gap-6 pb-6">
        <TableContent
          openModal={handleOpenSubjectModal}
          setSelectedNode={(node) => {
            setSelectedNode(node);
            setBankId("");
            dispatch(setUniversalSelectNode(node));
          }}
          selectedNode={selectedNode}
          initialContent={initialContent}
          setInitialContent={setInitialContent}
        />

        <div className="w-full flex flex-col gap-6 overflow-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Tabs
                tabs={tabs}
                active={contentType}
                onChange={(value) =>
                  dispatch(setContentType(value as ContentType))
                }
              />
              <button
                onClick={() => navigate("create-content")}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
              >
                + {addButtonLabels[contentType]}
              </button>
            </div>

            {/* ✅ GLOBAL SEARCH BAR — only visible when NOT inside a bank */}
            {bankId === "" && (
              <div className="flex items-center gap-2 bg-[#EFF6FF] border border-[#fff] rounded-md p-3 w-full">
                <IoSearchOutline className="w-5 h-5 text-gray-500" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  type="text"
                  placeholder={getPlaceholder()}
                  className="w-full outline-none bg-transparent text-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            {!isValidSelection ? (
              // ✅ CASE 1: NO SELECTION → EMPTY UI
              <div className="flex items-center justify-center h-[300px] text-gray-400 text-sm">
                Select a subject/system/topic to view {contentType}
              </div>
            ) : isLoading ? (
              <Spinner />
            ) : mcqBankLength ? (
              <p>No {contentType} found</p>
            ) : (
              <div>
                {/* ✅ CASE 2: VALID SELECTION → SHOW DATA */}

                {contentType === "MCQ" && mcqBank && (
                  <MCQBank
                    mcqBank={mcqBank as AllContentMCQList}
                    bankId={bankId}
                    setBankId={handleSetBankId}
                  />
                )}

                {contentType === "Flashcard" && mcqBank && (
                  <FlashCardBank
                    mcqBank={mcqBank as AllContentMCQList}
                    bankId={bankId}
                    setBankId={handleSetBankId}
                  />
                )}

                {contentType === "ClinicalCase" &&
                  (mcqBank as ClinicalCaseTreeResponse) && (
                    <ClinicalCaseBank
                      mcqBank={mcqBank as ClinicalCaseTreeResponse}
                      bankId={bankId}
                      setBankId={setBankId}
                      searchTerm={debouncedSearch}
                    />
                  )}

                {contentType === "OSCE" && (mcqBank as OsceTreeResponse) && (
                  <OSCEBank
                    mcqBank={mcqBank as OsceTreeResponse}
                    bankId={bankId}
                    setBankId={setBankId}
                    searchTerm={debouncedSearch}
                  />
                )}

                {contentType === "Notes" && (mcqBank as NotesTreeResponse) && (
                  <NotesBank
                    mcqBank={mcqBank as NotesTreeResponse}
                    bankId={bankId}
                    setBankId={setBankId}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isSubjectModalOpen && (
        <AddSubjectModal
          onClose={() => setIsSubjectModalOpen(false)}
          initialContent={initialContent}
        />
      )}

      {totalPages > 1 && mcqBank?.data.length !== 0 && bankId === "" && (
        <div className="my-10 w-full flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default StudyMode;