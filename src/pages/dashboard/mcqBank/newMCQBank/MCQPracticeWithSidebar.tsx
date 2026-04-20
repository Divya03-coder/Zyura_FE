// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useMemo, useState } from "react";
// // import { MCQBankSidebar } from "./MCQBankSidebar";
// // import { Menu, Plus } from "lucide-react";
// // import QuizReportModal from "../../quizGenerator/QuizReportModal";
// // import MCQCard from "./MCQCard";
// // import {
// //   Breadcrumb,
// //   DEMO_MCQ_DATA,
// //   DifficultyFilter,
// //   ExpandedNodes,
// //   FilterControls,
// //   findBreadcrumbPath,
// //   getReadStatusFromStorage,
// //   ReadStatus,
// //   saveReadStatusToStorage,
// //   SelectedAnswers,
// //   ShowAnswers,
// //   SortOption,
// //   TreeNode,
// // } from "@/components/Test";
// // import { useGetMCQBankTreeQuery } from "@/store/features/MCQBank/MCQBank.api";

// // // Helper: map backend data into frontend tree format
// // const mapBackendToTreeData = (backendData: any[]): TreeNode[] => {
// //   return backendData.map((subject) => ({
// //     id: subject._id,
// //     name: subject.subjectName,
// //     type: "subject",
// //     children: subject.systems?.map((system: any) => ({
// //       id: `${subject._id}-${system.name}`,
// //       name: system.name,
// //       type: "system",
// //       // add `topic` level inside each system
// //       children: system.topics?.map((topic: any) => ({
// //         id: `${subject._id}-${system.name}-${topic.topicName}`,
// //         name: topic.topicName,
// //         type: "topic",
// //         children: topic.subTopics?.map((sub: string) => ({
// //           id: `${subject._id}-${system.name}-${topic.topicName}-${sub}`,
// //           name: sub,
// //           type: "subtopic",
// //         })),
// //       })),
// //     })),
// //   }));
// // };

// // const MCQPracticeWithSidebar: React.FC = () => {
// //   // State
// //   const [selectedSubtopic, setSelectedSubtopic] = useState(null);
// //   const { data: mcqData, isLoading: mcqLoading } = useGetMcqBySubtopicQuery(
// //     selectedSubtopic,
// //     {
// //       skip: !selectedSubtopic, // only fetch when user selects
// //     }
// //   );
// //   const { data, isLoading, isError } = useGetMCQBankTreeQuery({});
// //   console.log("MCQ Bank Tree Data:", data?.data);

// //   const handleSubtopicClick = (subject, system, topic, subtopic) => {
// //     setSelectedSubtopic({ subject, system, topic, subtopic });
// //   };

// //   // === Derived Tree Data ===
// //   const treeData = useMemo(() => {
// //     if (!data?.data) return [];
// //     return mapBackendToTreeData(data.data);
// //   }, [data]);

// //   const [selectedMcqBankId, setSelectedMcqBankId] =
// //     useState<string>("mcq-bank-1");
// //   const [breadcrumb, setBreadcrumb] = useState<string[]>([
// //     // "Anatomy",
// //     // "Cardiovascular System",
// //     // "Heart",
// //   ]);
// //   const [expandedNodes, setExpandedNodes] = useState<ExpandedNodes>({
// //     anatomy: true,
// //     cardiovascular: true,
// //   });
// //   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

// //   const [searchQuery, setSearchQuery] = useState<string>("");
// //   const [difficultyFilter, setDifficultyFilter] =
// //     useState<DifficultyFilter>("All");
// //   const [sortBy, setSortBy] = useState<SortOption>("Newest First");

// //   const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
// //   const [showAnswers, setShowAnswers] = useState<ShowAnswers>({});
// //   const [readStatus, setReadStatus] = useState<ReadStatus>(
// //     getReadStatusFromStorage()
// //   );

// //   // const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
// //   // const [reportMcqId, setReportMcqId] = useState<string>("");

// //   // Handlers
// //   const handleToggleExpand = (nodeId: string) => {
// //     setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
// //   };

// //   const handleSelectMcqBank = (id: string) => {
// //     setSelectedMcqBankId(id);
// //     setSidebarOpen(false); // Close sidebar on mobile after selection

// //     // const path = findBreadcrumbPath(DEMO_TREE_DATA, id);
// //     const path = findBreadcrumbPath(treeData, id);
// //     if (path) setBreadcrumb(path);
// //   };

// //   const handleSelectAnswer = (mcqId: string, optionIndex: number) => {
// //     setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
// //   };

// //   const handleToggleAnswer = (mcqId: string) => {
// //     const newShowAnswers = { ...showAnswers, [mcqId]: !showAnswers[mcqId] };
// //     setShowAnswers(newShowAnswers);

// //     if (newShowAnswers[mcqId]) {
// //       const newReadStatus = { ...readStatus, [mcqId]: true };
// //       setReadStatus(newReadStatus);
// //       saveReadStatusToStorage(newReadStatus);
// //     }
// //   };

// //   const handleReport = (mcqId: string) => {
// //     setReportMcqId(mcqId);
// //     setReportModalOpen(true);
// //   };

// //   // Get and filter questions
// //   const currentMcqData =
// //     DEMO_MCQ_DATA[selectedMcqBankId] || DEMO_MCQ_DATA["mcq-bank-1"];
// //   let filteredQuestions = currentMcqData.mcqs || [];

// //   if (searchQuery) {
// //     filteredQuestions = filteredQuestions.filter((q) =>
// //       q.question.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //   }

// //   if (difficultyFilter !== "All") {
// //     filteredQuestions = filteredQuestions.filter(
// //       (q) => q.difficulty === difficultyFilter
// //     );
// //   }

// //   if (sortBy === "Newest First") {
// //     filteredQuestions = [...filteredQuestions].reverse();
// //   }

// //   const totalQuestions = filteredQuestions.length;
// //   const unreadCount = filteredQuestions.filter(
// //     (q) => !readStatus[q.mcqId]
// //   ).length;

// //   // === Loading/Error states ===
// //   if (isLoading) return <p>Loading MCQ Tree...</p>;
// //   if (isError) return <p>Failed to load MCQ Tree</p>;

// //   return (
// //     <div className="flex h-screen bg-slate-50">
// //       {/* Sidebar */}
// //       <MCQBankSidebar
// //         treeData={treeData}
// //         selectedId={selectedMcqBankId}
// //         expandedNodes={expandedNodes}
// //         isOpen={sidebarOpen}
// //         onSelect={handleSelectMcqBank}
// //         onToggleExpand={handleToggleExpand}
// //         onClose={() => setSidebarOpen(false)}
// //       />
// //       {/* <Sidebar
// //         treeData={DEMO_TREE_DATA}
// //         selectedId={selectedMcqBankId}
// //         expandedNodes={expandedNodes}
// //         isOpen={sidebarOpen}
// //         onSelect={handleSelectMcqBank}
// //         onToggleExpand={handleToggleExpand}
// //         onClose={() => setSidebarOpen(false)}
// //       /> */}

// //       {/* Main Content */}
// //       <div className="flex-1 overflow-y-auto">
// //         <div className="p-4 lg:p-6 space-y-6">
// //           {/* Mobile Menu Button */}
// //           <button
// //             onClick={() => setSidebarOpen(true)}
// //             className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
// //           >
// //             <Menu size={20} />
// //             <span>Menu</span>
// //           </button>

// //           {/* Header */}
// //           <div className="flex flex-col lg:flex-row justify-between flex-wrap items-start lg:items-center gap-4">
// //             <div className="flex items-center justify-between flex-wrap w-full">
// //               {/* Breadcrumb */}
// //               <div>
// //                 <p className="text-[#717182] font-normal">Current Location</p>
// //                 <Breadcrumb items={breadcrumb} />
// //               </div>
// //               <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 flex-wrap">
// //                 <span className="flex items-center gap-1 text-[#717182]">
// //                   Total Questions{" "}
// //                   <span className="text-lg text-[#0A0A0A] font-normal">
// //                     {totalQuestions}{" "}
// //                   </span>
// //                 </span>
// //                 <span className="flex items-center gap-1">
// //                   Unread{" "}
// //                   <span className="text-lg text-[#0A0A0A] font-normal">
// //                     {unreadCount}{" "}
// //                   </span>
// //                 </span>
// //                 {/* <span>Uploaded By: {currentMcqData.uploadedBy}</span> */}
// //               </div>
// //             </div>

// //             <div className="w-full flex justify-end">
// //               <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full lg:w-auto">
// //                 <Plus size={20} />
// //                 Create Quiz
// //               </button>
// //             </div>
// //           </div>

// //           {/* Filters */}
// //           <FilterControls
// //             searchQuery={searchQuery}
// //             difficultyFilter={difficultyFilter}
// //             sortBy={sortBy}
// //             onSearchChange={setSearchQuery}
// //             onDifficultyChange={setDifficultyFilter}
// //             onSortChange={setSortBy}
// //           />

// //           {/* Questions */}
// //           {filteredQuestions.length === 0 ? (
// //             <div className="text-center py-12 text-slate-500">
// //               No questions found matching your filters.
// //             </div>
// //           ) : (
// //             filteredQuestions.map((q, idx) => (
// //               <MCQCard
// //                 key={q.mcqId}
// //                 question={q}
// //                 questionNumber={idx + 1}
// //                 totalQuestions={totalQuestions}
// //                 subtopic={currentMcqData.subtopic}
// //                 isRead={readStatus[q.mcqId] || false}
// //                 selectedIndex={selectedAnswers[q.mcqId]}
// //                 showAnswer={showAnswers[q.mcqId] || false}
// //                 onSelectAnswer={(optionIndex) =>
// //                   handleSelectAnswer(q.mcqId, optionIndex)
// //                 }
// //                 onToggleAnswer={() => handleToggleAnswer(q.mcqId)}
// //                 onReport={() => handleReport(q.mcqId)}
// //               />
// //             ))
// //           )}
// //         </div>
// //       </div>

// //       {/* Report Modal */}
// //       {/* <ReportModal
// //         isOpen={reportModalOpen}
// //         mcqId={reportMcqId}
// //         onClose={() => setReportModalOpen(false)}
// //       /> */}
// //       <QuizReportModal
// //       // open={openReportModal}
// //       // setOpen={setOpenReportModal}
// //       // mcqId={mcqId}
// //       // questionBankId={mcqData._id}
// //       />
// //     </div>
// //   );
// // };

// // export default MCQPracticeWithSidebar;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMemo, useState } from "react";
// import { MCQBankSidebar } from "./MCQBankSidebar";
// import { Menu } from "lucide-react";
// // import QuizReportModal from "../../quizGenerator/QuizReportModal";
// import {
//   Breadcrumb,
//   DifficultyFilter,
//   ExpandedNodes,
//   FilterControls,
//   findBreadcrumbPath,
//   // getReadStatusFromStorage,
//   // ReadStatus,
//   // saveReadStatusToStorage,
//   // SelectedAnswers,
//   // ShowAnswers,
//   SortOption,
//   TreeNode,
// } from "@/components/Test";
// import { useGetMCQBankTreeQuery } from "@/store/features/MCQBank/MCQBank.api";
// import { useGetMcqBySubtopicQuery } from "@/store/features/MCQBank/MCQBank.api";
// import Pagination from "@/components/AdminDashboard/Content & Resource_Component/Pagination";
// import QuizReportModal from "../../quizGenerator/QuizReportModal";
// import MCQBankCard from "./MCQBankCard";

// // Helper: map backend data into frontend tree format
// const mapBackendToTreeData = (backendData: any[]): TreeNode[] => {
//   return backendData.map((subject) => ({
//     id: subject._id,
//     name: subject.subjectName,
//     type: "subject",
//     children: subject.systems?.map((system: any) => ({
//       id: `${subject._id}-${system.name}`,
//       name: system.name,
//       type: "system",
//       children: system.topics?.map((topic: any) => ({
//         id: `${subject._id}-${system.name}-${topic.topicName}`,
//         name: topic.topicName,
//         type: "topic",
//         children: topic.subTopics?.map((sub: string) => ({
//           id: `${subject._id}-${system.name}-${topic.topicName}-${sub}`,
//           name: sub,
//           type: "subtopic",
//         })),
//       })),
//     })),
//   }));
// };

// const MCQPracticeWithSidebar: React.FC = () => {
//   // --- Sidebar Tree ---
//   const { data, isLoading, isError } = useGetMCQBankTreeQuery({});
//   const treeData = useMemo(() => {
//     if (!data?.data) return [];
//     return mapBackendToTreeData(data.data);
//   }, [data]);

//   const [expandedNodes, setExpandedNodes] = useState<ExpandedNodes>({});
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
//   const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
//   const [openReportModal, setOpenReportModal] = useState(false);

//   const handleToggleExpand = (nodeId: string) => {
//     setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
//   };

//   // --- Selected Subtopic & MCQs ---
//   const [selectedSubtopic, setSelectedSubtopic] = useState<{
//     subject: string;
//     system: string;
//     topic: string;
//     subtopic: string;
//   } | null>(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 10;

//   const { data: mcqData, isLoading: mcqLoading } = useGetMcqBySubtopicQuery(
//     selectedSubtopic
//       ? {
//           ...selectedSubtopic, // subject, system, topic, subtopic
//           page: currentPage,
//           limit,
//         }
//       : undefined,
//     { skip: !selectedSubtopic }
//   );
//   console.log(mcqData);

//   const meta = mcqData?.meta;
//   // const questions = mcqData?.mcqs || [];

//   const totalPages = meta?.total ? Math.ceil(meta.total / meta.limit) : 1;

//   const handleSubtopicClick = (
//     subject: string,
//     system: string,
//     topic: string,
//     subtopic: string,
//     id: string
//   ) => {
//     setSelectedSubtopic({ subject, system, topic, subtopic });
//     setBreadcrumb([subject, system, topic, subtopic]);
//     setSidebarOpen(false);
//     console.log(id);
//   };

//   // --- MCQ State ---
//   // const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
//   // const [showAnswers, setShowAnswers] = useState<ShowAnswers>({});
//   // const [readStatus, setReadStatus] = useState<ReadStatus>(
//   //   getReadStatusFromStorage()
//   // );

//   // const handleSelectAnswer = (mcqId: string, optionIndex: number) => {
//   //   setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
//   // };

//   // const handleToggleAnswer = (mcqId: string) => {
//   //   const newShowAnswers = { ...showAnswers, [mcqId]: !showAnswers[mcqId] };
//   //   setShowAnswers(newShowAnswers);

//   //   if (newShowAnswers[mcqId]) {
//   //     const newReadStatus = { ...readStatus, [mcqId]: true };
//   //     setReadStatus(newReadStatus);
//   //     saveReadStatusToStorage(newReadStatus);
//   //   }
//   // };

//   // const handleReport = (mcqId: string) => {
//   //   console.log("Report MCQ:", mcqId);
//   //   setOpenReportModal(true);
//   // };

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // --- Filters ---
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [difficultyFilter, setDifficultyFilter] =
//     useState<DifficultyFilter>("All");
//   const [sortBy, setSortBy] = useState<SortOption>("Newest First");

//   // --- Filter MCQs ---
//   let filteredQuestions = mcqData?.data || [];
//   console.log("Filtered Questions:", filteredQuestions)

//   if (searchQuery) {
//     filteredQuestions = filteredQuestions.filter((q: any) =>
//       q.question.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   if (difficultyFilter !== "All") {
//     filteredQuestions = filteredQuestions.filter(
//       (q: any) => q.difficulty === difficultyFilter
//     );
//   }

//   if (sortBy === "Newest First") {
//     filteredQuestions = [...filteredQuestions].reverse();
//   }

//   // const totalQuestions = filteredQuestions.length;
//   // const unreadCount = filteredQuestions.filter(
//   //   (q) => !readStatus[q.mcqId]
//   // ).length;

//   // --- Loading/Error states ---
//   if (isLoading) return <p>Loading MCQ Tree...</p>;
//   if (isError) return <p>Failed to load MCQ Tree</p>;

//   return (
//     <div className="flex h-screen bg-slate-50">
//       {/* Sidebar */}
//       <MCQBankSidebar
//         treeData={treeData}
//         selectedId={
//           selectedSubtopic
//             ? `${selectedSubtopic.subject}-${selectedSubtopic.system}-${selectedSubtopic.topic}-${selectedSubtopic.subtopic}`
//             : ""
//         }
//         expandedNodes={expandedNodes}
//         isOpen={sidebarOpen}
//         onSelect={(id) => {
//           // Find node in tree to get full path
//           const path = findBreadcrumbPath(treeData, id);
//           if (!path) return;
//           // Last 4 levels: subject -> system -> topic -> subtopic
//           if (path.length === 4) {
//             handleSubtopicClick(path[0], path[1], path[2], path[3], id);
//           }
//         }}
//         onToggleExpand={handleToggleExpand}
//         onClose={() => setSidebarOpen(false)}
//       />

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-4 lg:p-6 space-y-6">
//           {/* Mobile Menu */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
//           >
//             <Menu size={20} />
//             <span>Menu</span>
//           </button>

//           {/* Breadcrumb */}
//           <div className="mb-4">
//             <p className="text-[#717182] font-normal">Current Location</p>
//             <Breadcrumb items={breadcrumb} />
//           </div>

//           {/* Filters */}
//           <FilterControls
//             searchQuery={searchQuery}
//             difficultyFilter={difficultyFilter}
//             sortBy={sortBy}
//             onSearchChange={setSearchQuery}
//             onDifficultyChange={setDifficultyFilter}
//             onSortChange={setSortBy}
//           />

//           {/* Questions */}
//           {mcqLoading ? (
//             <p>Loading MCQs...</p>
//           ) : filteredQuestions.length === 0 ? (
//             <div className="text-center py-12 text-slate-500">
//               No questions found matching your filters.
//             </div>
//           ) : (
//             filteredQuestions.map((q: any, idx: number) => (
//               <MCQBankCard key={idx} mcq={q} />
//               // <MCQCard
//               //   key={q.mcqId}
//               //   question={q}
//               //   questionNumber={idx + 1}
//               //   totalQuestions={totalQuestions}
//               //   subtopic={selectedSubtopic?.subtopic || ""}
//               //   isRead={readStatus[q.mcqId] || false}
//               //   selectedIndex={selectedAnswers[q.mcqId]}
//               //   showAnswer={showAnswers[q.mcqId] || false}
//               //   onSelectAnswer={(optionIndex) =>
//               //     handleSelectAnswer(q.mcqId, optionIndex)
//               //   }
//               //   onToggleAnswer={() => handleToggleAnswer(q.mcqId)}
//               //   onReport={() => handleReport(q.mcqId)}
//               // />
//             ))
//           )}
//           {/* Pagination */}
//           <div className="mt-16 mb-32 flex justify-center space-x-5 ">
//             <Pagination
//               totalPages={totalPages}
//               currentPage={currentPage}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Report Modal */}
//       <QuizReportModal
//         open={openReportModal}
//         setOpen={setOpenReportModal}
//         mcqId={"mcqId"}
//         questionBankId={mcqData?._id}
//       />
//     </div>
//   );
// };

// export default MCQPracticeWithSidebar;

/* eslint-disable @typescript-eslint/no-explicit-any */
import GlobalLoader2 from "@/common/GlobalLoader2";
import Pagination from "@/common/custom/Pagination";
import {
  Breadcrumb,
  DifficultyFilter,
  ExpandedNodes,
  FilterControls,
  findBreadcrumbPath,
  SortOption,
  TreeNode,
} from "@/components/Test";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import {
  useGetMCQBankTreeQuery,
  useGetMcqBySubtopicQuery,
  useGetSingleMCQQuery,
} from "@/store/features/MCQBank/MCQBank.api";
import { ArrowLeft, CircleAlert, Menu, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import QuizReportModal from "../../quizGenerator/QuizReportModal";
import MCQBankCard from "./MCQBankCard";
import { MCQBankSidebar } from "./MCQBankSidebar";

// Helper: map backend data into frontend tree format
const mapBackendToTreeData = (backendData: any[]): TreeNode[] => {
  return backendData.map((subject) => ({
    id: subject._id,
    name: subject.subjectName,
    type: "subject",
    children: subject.systems?.map((system: any) => ({
      id: `${subject._id}-${system.name}`,
      name: system.name,
      type: "system",
      children: system.topics?.map((topic: any) => ({
        id: `${subject._id}-${system.name}-${topic.topicName}`,
        name: topic.topicName,
        type: "topic",
        children: topic.subTopics?.map((sub: string) => ({
          id: `${subject._id}-${system.name}-${topic.topicName}-${sub}`,
          name: sub,
          type: "subtopic",
        })),
      })),
    })),
  }));
};

type ViewMode = "banks" | "mcqs";

const MCQPracticeWithSidebar: React.FC = () => {
  // --- Sidebar Tree ---
  const { data, isLoading, isError } = useGetMCQBankTreeQuery({});
  const treeData = useMemo(() => {
    if (!data?.data) return [];
    return mapBackendToTreeData(data.data);
  }, [data]);

  const [expandedNodes, setExpandedNodes] = useState<ExpandedNodes>({});
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [breadcrumb, setBreadcrumb] = useState<string[]>([]);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportMcqId, setReportMcqId] = useState("");

  const handleToggleExpand = (nodeId: string) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // --- View Mode State ---
  const [viewMode, setViewMode] = useState<ViewMode>("banks");
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [selectedBankName, setSelectedBankName] = useState<string>("");

  // --- Selected Node (subject/system/topic/subtopic) ---
  const [selectedNode, setSelectedNode] = useState<{
    subject: string;
    system: string;
    topic: string;
    subtopic: string;
  } | null>(null);

  // --- Pagination ---
  const [banksPage, setBanksPage] = useState(1);
  const [mcqsPage, setMcqsPage] = useState(1);
  const limit = 10;

  // --- API: Fetch MCQ Banks ---
  const { data: banksData, isLoading: banksLoading } = useGetMcqBySubtopicQuery(
    selectedNode
      ? {
          subject: selectedNode.subject,
          ...(selectedNode.system && { system: selectedNode.system }),
          ...(selectedNode.topic && { topic: selectedNode.topic }),
          ...(selectedNode.subtopic && { subtopic: selectedNode.subtopic }),
          page: banksPage,
          limit,
        }
      : undefined,
    { skip: !selectedNode || viewMode !== "banks" }
  );

  const banksMeta = banksData?.meta;
  const mcqBanks = banksData?.data || [];
  const totalBanksPages = banksMeta?.total
    ? Math.ceil(banksMeta.total / banksMeta.limit)
    : 1;

  // --- API: Fetch MCQs from Selected Bank ---
  const { data: mcqsData, isLoading: mcqsLoading } = useGetSingleMCQQuery(
    {
      id: selectedBankId || "",
      page: mcqsPage,
      limit,
    },
    { skip: !selectedBankId || viewMode !== "mcqs" }
  );

  const mcqsMeta = mcqsData?.meta;
  const questions = mcqsData?.data?.mcqs || [];
  const totalMcqsPages = mcqsMeta?.total
    ? Math.ceil(mcqsMeta.total / mcqsMeta.limit)
    : 1;

  // --- Node Selection Handler ---
  const handleNodeClick = (
    subject: string,
    system: string,
    topic: string,
    subtopic: string
  ) => {
    setSelectedNode({ subject, system, topic, subtopic });
    // Filter out empty strings for breadcrumb
    const breadcrumbItems = [subject, system, topic, subtopic].filter(Boolean);
    setBreadcrumb(breadcrumbItems);
    setViewMode("banks");
    setSelectedBankId(null);
    setBanksPage(1);
    setSidebarOpen(false);
  };

  // --- Bank Selection Handler ---
  const handleBankClick = (bankId: string, bankName: string) => {
    setSelectedBankId(bankId);
    setSelectedBankName(bankName);
    setViewMode("mcqs");
    setMcqsPage(1);
  };

  // --- Back to Banks Handler ---
  const handleBackToBanks = () => {
    setViewMode("banks");
    setSelectedBankId(null);
    setSelectedBankName("");
    setMcqsPage(1);
  };

  // --- MCQ State ---
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: number | null;
  }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleSelectAnswer = (mcqId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
  };

  const handleToggleAnswer = (mcqId: string) => {
    setShowAnswers((prev) => ({ ...prev, [mcqId]: !prev[mcqId] }));
  };

  // --- Filters (Only for MCQs) ---
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Oldest First");

  // --- Filter MCQs ---
  let filteredQuestions = [...questions];
  console.log(filteredQuestions[8]);
  if (viewMode === "mcqs") {
    if (searchQuery) {
      filteredQuestions = filteredQuestions.filter((q: any) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (difficultyFilter !== "All") {
      filteredQuestions = filteredQuestions.filter(
        (q: any) => q.difficulty === difficultyFilter
      );
    }

    if (sortBy === "Newest First") {
      filteredQuestions = [...filteredQuestions].reverse();
    }
  }

  // --- Loading/Error states ---
  if (isLoading) return <GlobalLoader2 />;
  if (isError) return <p>Failed to load MCQ Tree</p>;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <MCQBankSidebar
        treeData={treeData}
        selectedId={
          selectedNode
            ? `${selectedNode.subject}-${selectedNode.system}-${selectedNode.topic}-${selectedNode.subtopic}`
            : ""
        }
        expandedNodes={expandedNodes}
        isOpen={sidebarOpen}
        onSelect={(id) => {
          const path = findBreadcrumbPath(treeData, id);
          if (!path) return;

          // Always trigger for any level (1=subject, 2=system, 3=topic, 4=subtopic)
          const subject = path[0] || "";
          const system = path[1] || "";
          const topic = path[2] || "";
          const subtopic = path[3] || "";

          handleNodeClick(subject, system, topic, subtopic);
        }}
        onToggleExpand={handleToggleExpand}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Mobile Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <Menu size={20} />
            <span>Menu</span>
          </button>

          {/* Breadcrumb & Header */}
          <div>
            <p className="text-[#717182] font-normal">Current Location</p>
            <Breadcrumb
              items={
                viewMode === "mcqs" && selectedBankName
                  ? [...breadcrumb, selectedBankName]
                  : breadcrumb
              }
            />
          </div>

          {/* VIEW: MCQ BANKS */}
          {viewMode === "banks" && (
            <>
              <div className="text-center py-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  MCQ Banks
                </h2>
                <p className="text-slate-600 mt-2">
                  Select a bank to start practicing
                </p>
              </div>

              {banksLoading ? (
                <GlobalLoader2 />
              ) : mcqBanks.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No MCQ banks found for this selection.
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {mcqBanks.map((bank: any) => (
                      <MCQBankCard
                        key={bank._id}
                        mcq={bank}
                        onStartClick={() =>
                          handleBankClick(bank._id, bank.title)
                        }
                      />
                    ))}
                  </div>

                  {/* Banks Pagination */}
                  {totalBanksPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination
                        totalPages={totalBanksPages}
                        currentPage={banksPage}
                        onPageChange={setBanksPage}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* VIEW: MCQs */}
          {viewMode === "mcqs" && (
            <>
              {/* Header with Back Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBackToBanks}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {selectedBankName}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {mcqsMeta?.total || 0} Questions | Uploaded By:{" "}
                      {mcqsData?.data?.uploadedBy}
                    </p>
                  </div>
                </div>

                <Link
                  to={"/dashboard/quiz-generator"}
                  className="w-full sm:w-auto"
                >
                  <PrimaryButton
                    bgType="solid"
                    bgColor="bg-blue-btn-1"
                    iconPosition="left"
                    icon={<Plus />}
                    className="h-12 w-full sm:w-auto hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
                  >
                    Create Quiz
                  </PrimaryButton>
                </Link>
              </div>

              {/* Filters - Only visible in MCQ view */}
              <FilterControls
                searchQuery={searchQuery}
                difficultyFilter={difficultyFilter}
                sortBy={sortBy}
                onSearchChange={setSearchQuery}
                onDifficultyChange={setDifficultyFilter}
                onSortChange={setSortBy}
              />

              {/* Questions */}
              {mcqsLoading ? (
                <GlobalLoader2 />
              ) : filteredQuestions.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No questions found matching your filters.
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {filteredQuestions.map((q: any, idx: number) => {
                      const qId = q?.mcqId || `question-${idx}`;
                      const globalQuestionNumber =
                        (mcqsPage - 1) * limit + idx + 1;
                      const selectedIndex = selectedAnswers[qId];

                      return (
                        <div
                          key={qId}
                          className="border border-slate-300 rounded-lg p-5 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                              <p className="text-slate-700 text-sm font-normal">
                                Question {globalQuestionNumber} of{" "}
                                {mcqsMeta?.total || 0}
                              </p>
                              <p className="bg-[#D97706] text-xs font-normal px-3 py-1 text-white rounded-full">
                                {mcqsData?.data?.subtopic}
                              </p>
                              <p className="text-xs font-normal px-3 py-1 bg-white rounded-full border border-slate-200">
                                {q.difficulty}
                              </p>
                            </div>
                            <div
                              className="flex items-center gap-1.5 text-[#F61F1F] cursor-pointer"
                              onClick={() => {
                                setReportMcqId(q?.mcqId);
                                setOpenReportModal(true);
                              }}
                            >
                              <p className="text-sm font-semibold">Report</p>
                              <CircleAlert />
                            </div>
                          </div>

                          <p className="text-slate-900 font-medium">
                            {q.question}
                          </p>

                          {q?.imageDescription && (
                            <img
                              src={q.imageDescription}
                              alt=""
                              className="w-[200px] h-[200px] text-center mx-auto rounded"
                            />
                          )}

                          <div className="space-y-2">
                            {q.options.map((opt: any, optionIdx: number) => {
                              const isSelected = selectedIndex === optionIdx;
                              const isCorrect = opt.option === q.correctOption;
                              const show = showAnswers[qId];

                              let borderClass = "border-none";
                              let bgClass = "";
                              let textClass = "text-slate-800";

                              if (show) {
                                if (isSelected && isCorrect) {
                                  borderClass = "border-green-500";
                                  bgClass = "bg-green-50";
                                  textClass = "text-green-700 font-medium";
                                } else if (isSelected && !isCorrect) {
                                  borderClass = "border-red-500";
                                  bgClass = "bg-red-50";
                                  textClass = "text-red-700 font-medium";
                                } else if (!isSelected && isCorrect) {
                                  borderClass = "border-green-500";
                                  bgClass = "bg-green-50";
                                  textClass = "text-green-700 font-medium";
                                }
                              } else if (isSelected) {
                                borderClass = "border-blue-500";
                                bgClass = "bg-blue-50";
                              }

                              return (
                                <label
                                  key={optionIdx}
                                  className={`block p-2 border rounded cursor-pointer ${borderClass} ${bgClass}`}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${qId}`}
                                    className="mr-2"
                                    onChange={() =>
                                      handleSelectAnswer(qId, optionIdx)
                                    }
                                    checked={isSelected}
                                    disabled={show}
                                  />
                                  <span className={textClass}>
                                    {opt.option}. {opt.optionText}
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          {selectedIndex !== undefined &&
                            selectedIndex !== null && (
                              <button
                                onClick={() => handleToggleAnswer(qId)}
                                className="px-4 py-2 border rounded text-sm font-medium bg-blue-main text-white hover:bg-blue-main/85 cursor-pointer"
                              >
                                {showAnswers[qId]
                                  ? "Hide Answer"
                                  : "Show Answer"}
                              </button>
                            )}

                          {showAnswers[qId] && (
                            <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                              <h4 className="text-lg font-medium mb-2">
                                Explanation
                              </h4>
                              {q.options.map((option: any) => {
                                const isOptionCorrect =
                                  option.option === q.correctOption;
                                return (
                                  <div key={option.option} className="mb-3">
                                    {isOptionCorrect ? (
                                      <p className="font-medium text-green-600">
                                        [Correct - Choice {option.option}]
                                      </p>
                                    ) : (
                                      <p className="font-medium text-red-600">
                                        [Choice {option.option}]
                                      </p>
                                    )}
                                    <p className="text-gray-800">
                                      {option.explanation}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* MCQs Pagination */}
                  {totalMcqsPages > 1 && (
                    <div className="mt-8 mb-16 flex justify-center">
                      <Pagination
                        totalPages={totalMcqsPages}
                        currentPage={mcqsPage}
                        onPageChange={setMcqsPage}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Report Modal */}
      <QuizReportModal
        open={openReportModal}
        setOpen={setOpenReportModal}
        mcqId={reportMcqId}
        questionBankId={selectedBankId || ""}
      />
    </div>
  );
};

export default MCQPracticeWithSidebar;
