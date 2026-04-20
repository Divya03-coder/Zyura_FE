import React from "react";
import {
  ChevronRight,
  ChevronDown,
  Search,
  BookOpen,
  Circle,
} from "lucide-react";
// import { MCQBankSidebar } from "@/pages/dashboard/mcqBank/newMCQBank/MCQBankSidebar";
// import MCQCard from "@/pages/dashboard/mcqBank/newMCQBank/MCQCard";

// ==================== TYPES ====================
export interface TreeNode {
  id: string;
  name: string;
  type: "subject" | "topic" | "subtopic";
  children?: TreeNode[];
}

interface MCQOption {
  option: string;
  optionText: string;
  explanation: string;
}

export interface MCQQuestion {
  mcqId: string;
  question: string;
  options: MCQOption[];
  correctOption: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface MCQBankData {
  _id: string;
  title: string;
  uploadedBy: string;
  subtopic: string;
  mcqs: MCQQuestion[];
}

export type DifficultyFilter = "All" | "Easy" | "Medium" | "Hard";
export type SortOption = "Newest First" | "Oldest First";
export type ExpandedNodes = Record<string, boolean>;
export type SelectedAnswers = Record<string, number>;
export type ShowAnswers = Record<string, boolean>;
export type ReadStatus = Record<string, boolean>;

// ==================== DEMO DATA ====================
export const DEMO_TREE_DATA: TreeNode[] = [
  {
    id: "anatomy",
    name: "Anatomy",
    type: "subject",
    children: [
      {
        id: "cardiovascular",
        name: "Cardiovascular System",
        type: "topic",
        children: [
          { id: "mcq-bank-1", name: "Heart", type: "subtopic" },
          { id: "mcq-bank-2", name: "Blood Vessels", type: "subtopic" },
          { id: "mcq-bank-3", name: "Coronary Circulation", type: "subtopic" },
        ],
      },
      {
        id: "respiratory",
        name: "Respiratory System",
        type: "topic",
        children: [
          { id: "mcq-bank-4", name: "Lungs", type: "subtopic" },
          { id: "mcq-bank-5", name: "Trachea", type: "subtopic" },
        ],
      },
    ],
  },
  {
    id: "physiology",
    name: "Physiology",
    type: "subject",
    children: [
      {
        id: "nervous-system",
        name: "Nervous System",
        type: "topic",
        children: [
          { id: "mcq-bank-6", name: "Brain", type: "subtopic" },
          { id: "mcq-bank-7", name: "Spinal Cord", type: "subtopic" },
        ],
      },
    ],
  },
];

export const DEMO_MCQ_DATA: Record<string, MCQBankData> = {
  "mcq-bank-1": {
    _id: "mcq-bank-1",
    title: "Heart - Cardiovascular System",
    uploadedBy: "Dr. Smith",
    subtopic: "Heart",
    mcqs: [
      {
        mcqId: "mcq-1-1",
        question:
          "Which chamber of the heart receives oxygenated blood from the lungs?",
        options: [
          {
            option: "A",
            optionText: "Right atrium",
            explanation:
              "The right atrium receives deoxygenated blood from the body.",
          },
          {
            option: "B",
            optionText: "Left atrium",
            explanation:
              "Correct! The left atrium receives oxygenated blood from the pulmonary veins.",
          },
          {
            option: "C",
            optionText: "Right ventricle",
            explanation:
              "The right ventricle pumps deoxygenated blood to the lungs.",
          },
          {
            option: "D",
            optionText: "Left ventricle",
            explanation:
              "The left ventricle pumps oxygenated blood to the body.",
          },
        ],
        correctOption: "B",
        difficulty: "Easy",
      },
      {
        mcqId: "mcq-1-2",
        question: "What is the normal resting heart rate for adults?",
        options: [
          {
            option: "A",
            optionText: "40-50 bpm",
            explanation: "This is below normal resting heart rate.",
          },
          {
            option: "B",
            optionText: "60-100 bpm",
            explanation:
              "Correct! The normal resting heart rate for adults is 60-100 beats per minute.",
          },
          {
            option: "C",
            optionText: "100-120 bpm",
            explanation: "This is considered tachycardia at rest.",
          },
          {
            option: "D",
            optionText: "120-140 bpm",
            explanation: "This is abnormally high for resting heart rate.",
          },
        ],
        correctOption: "B",
        difficulty: "Easy",
      },
      {
        mcqId: "mcq-1-3",
        question:
          "Which valve prevents backflow of blood from the aorta to the left ventricle?",
        options: [
          {
            option: "A",
            optionText: "Mitral valve",
            explanation:
              "The mitral valve is between the left atrium and left ventricle.",
          },
          {
            option: "B",
            optionText: "Tricuspid valve",
            explanation:
              "The tricuspid valve is between the right atrium and right ventricle.",
          },
          {
            option: "C",
            optionText: "Aortic valve",
            explanation:
              "Correct! The aortic valve prevents backflow from the aorta to the left ventricle.",
          },
          {
            option: "D",
            optionText: "Pulmonary valve",
            explanation:
              "The pulmonary valve is between the right ventricle and pulmonary artery.",
          },
        ],
        correctOption: "C",
        difficulty: "Medium",
      },
    ],
  },
  "mcq-bank-2": {
    _id: "mcq-bank-2",
    title: "Blood Vessels - Cardiovascular System",
    uploadedBy: "Dr. Johnson",
    subtopic: "Blood Vessels",
    mcqs: [
      {
        mcqId: "mcq-2-1",
        question:
          "Which type of blood vessel carries blood away from the heart?",
        options: [
          {
            option: "A",
            optionText: "Veins",
            explanation: "Veins carry blood toward the heart.",
          },
          {
            option: "B",
            optionText: "Arteries",
            explanation: "Correct! Arteries carry blood away from the heart.",
          },
          {
            option: "C",
            optionText: "Capillaries",
            explanation:
              "Capillaries connect arteries and veins for gas exchange.",
          },
          {
            option: "D",
            optionText: "Venules",
            explanation:
              "Venules are small veins that carry blood toward the heart.",
          },
        ],
        correctOption: "B",
        difficulty: "Easy",
      },
    ],
  },
};

// ==================== UTILITY FUNCTIONS ====================
export const getReadStatusFromStorage = (): ReadStatus => {
  try {
    const stored = localStorage.getItem("mcq-read-status");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const saveReadStatusToStorage = (status: ReadStatus): void => {
  localStorage.setItem("mcq-read-status", JSON.stringify(status));
};

export const findBreadcrumbPath = (
  nodes: TreeNode[],
  targetId: string,
  path: string[] = []
): string[] | null => {
  for (const node of nodes) {
    const newPath = [...path, node.name];
    if (node.id === targetId) return newPath;
    if (node.children) {
      const found = findBreadcrumbPath(node.children, targetId, newPath);
      if (found) return found;
    }
  }
  return null;
};

// ==================== COMPONENTS ====================

// Breadcrumb Component
interface BreadcrumbProps {
  items: string[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <div className="flex items-center gap-2 text-sm text-[#0A0A0A] flex-wrap">
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <span> &gt; </span>}
        <span
          className={
            idx === items.length - 1 ? "font-semibold text-slate-900" : ""
          }
        >
          {item}
        </span>
      </React.Fragment>
    ))}
  </div>
);

// Tree Node Component
interface TreeNodeProps {
  node: TreeNode;
  level: number;
  selectedId: string;
  expandedNodes: ExpandedNodes;
  onSelect: (id: string, name: string) => void;
  onToggleExpand: (id: string) => void;
}

export const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectedId,
  expandedNodes,
  onSelect,
  onToggleExpand,
}) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes[node.id];
  const isSelected = selectedId === node.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleExpand(node.id);
  };

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand(node.id);
    }
    // if (node.type === "subtopic") {
    //   onSelect(node.id, node.name);
    // }
    onSelect(node.id, node.name);
  };

  const getIcon = () => {
    if (node.type === "subject")
      return <BookOpen size={16} className="text-blue-600" />;
    if (node.type === "topic")
      return <Circle size={12} className="text-slate-400" />;
    return <Circle size={8} className="text-slate-300" />;
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-slate-100 rounded transition-colors ${
          isSelected ? "bg-blue-50 border-l-4 border-blue-500" : ""
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={handleClick}
      >
        {hasChildren ? (
          <button
            onClick={handleToggle}
            className="p-0 hover:bg-slate-200 rounded"
          >
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        ) : (
          <div className="w-4" />
        )}

        {getIcon()}

        <span
          className={`text-sm ${
            isSelected ? "font-semibold text-blue-700" : "text-slate-700"
          }`}
        >
          {node.name}
        </span>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expandedNodes={expandedNodes}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Sidebar Component
// interface SidebarProps {
//   treeData: TreeNode[];
//   selectedId: string;
//   expandedNodes: ExpandedNodes;
//   isOpen: boolean;
//   onSelect: (id: string, name: string) => void;
//   onToggleExpand: (id: string) => void;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   treeData,
//   selectedId,
//   expandedNodes,
//   isOpen,
//   onSelect,
//   onToggleExpand,
//   onClose,
// }) => (
//   <>
//     {/* Mobile Overlay */}
//     {isOpen && (
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//         onClick={onClose}
//       />
//     )}

//     {/* Sidebar */}
//     <div
//       className={`
//       fixed lg:relative top-0 left-0 h-full
//       w-80 bg-white border-r border-slate-200 
//       overflow-y-auto z-50
//       transform transition-transform duration-300 ease-in-out
//       ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//     `}
//     >
//       <div className="p-4 border-b border-slate-200 flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold text-slate-800">MCQ Bank</h2>
//           <p className="text-xs text-slate-500 mt-1">
//             Select a topic to practice
//           </p>
//         </div>
//         <button
//           onClick={onClose}
//           className="lg:hidden p-1 hover:bg-slate-100 rounded"
//         >
//           <X size={20} />
//         </button>
//       </div>
//       <div className="p-2">
//         {treeData.map((node) => (
//           <TreeNodeComponent
//             key={node.id}
//             node={node}
//             level={0}
//             selectedId={selectedId}
//             expandedNodes={expandedNodes}
//             onSelect={onSelect}
//             onToggleExpand={onToggleExpand}
//           />
//         ))}
//       </div>
//     </div>
//   </>
// );

// Filter Controls Component
interface FilterControlsProps {
  searchQuery: string;
  difficultyFilter: DifficultyFilter;
  sortBy: SortOption;
  onSearchChange: (value: string) => void;
  onDifficultyChange: (value: DifficultyFilter) => void;
  onSortChange: (value: SortOption) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  difficultyFilter,
  sortBy,
  onSearchChange,
  onDifficultyChange,
  onSortChange,
}) => (
  <div className="flex flex-col lg:flex-row gap-4">
    <div className="flex-1 relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <select
      value={difficultyFilter}
      onChange={(e) => onDifficultyChange(e.target.value as DifficultyFilter)}
      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="All">All Difficulty</option>
      <option value="Basics">Basics</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advance">Advance</option>
    </select>

    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value as SortOption)}
      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="Newest First">Newest First</option>
      <option value="Oldest First">Oldest First</option>
    </select>
  </div>
);

// MCQ Card Component
// interface MCQCardProps {
//   question: MCQQuestion;
//   questionNumber: number;
//   totalQuestions: number;
//   subtopic: string;
//   isRead: boolean;
//   selectedIndex: number | undefined;
//   showAnswer: boolean;
//   onSelectAnswer: (optionIndex: number) => void;
//   onToggleAnswer: () => void;
//   onReport: () => void;
// }

// const MCQCard: React.FC<MCQCardProps> = ({
//   question,
//   questionNumber,
//   totalQuestions,
//   subtopic,
//   isRead,
//   selectedIndex,
//   showAnswer,
//   onSelectAnswer,
//   onToggleAnswer,
//   onReport,
// }) => {
//   const getOptionStyles = (optionIndex: number, isCorrect: boolean) => {
//     const isSelected = selectedIndex === optionIndex;

//     if (showAnswer) {
//       if (isSelected && isCorrect) {
//         return "border-green-500 bg-green-50 text-green-700 font-medium";
//       } else if (isSelected && !isCorrect) {
//         return "border-red-500 bg-red-50 text-red-700 font-medium";
//       } else if (!isSelected && isCorrect) {
//         return "border-green-500 bg-green-50 text-green-700 font-medium";
//       }
//     } else if (isSelected) {
//       return "border-blue-500 bg-blue-50";
//     }

//     return "border-slate-200";
//   };

//   return (
//     <div className="border border-slate-300 rounded-lg p-5 space-y-4 bg-white">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//         <div className="flex items-center gap-3 flex-wrap">
//           {isRead ? (
//             <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
//           ) : (
//             <Circle size={20} className="text-orange-500 flex-shrink-0" />
//           )}
//           <p className="text-slate-700 text-sm font-normal">
//             Question {questionNumber} of {totalQuestions}
//           </p>
//           <span className="bg-orange-500 text-xs font-normal px-3 py-1 text-white rounded-full">
//             {subtopic}
//           </span>
//           <span className="text-xs font-normal px-3 py-1 bg-white rounded-full border border-slate-200">
//             {question.difficulty}
//           </span>
//         </div>
//         <button
//           className="flex items-center gap-1.5 text-red-500 hover:text-red-700 self-start sm:self-center"
//           onClick={onReport}
//         >
//           <p className="text-sm font-semibold">Report</p>
//           <CircleAlert size={20} />
//         </button>
//       </div>

//       <p className="text-slate-900 font-medium">{question.question}</p>

//       <div className="space-y-2">
//         {question.options.map((opt, optionIdx) => {
//           const isCorrect = opt.option === question.correctOption;
//           const styleClasses = getOptionStyles(optionIdx, isCorrect);

//           return (
//             <label
//               key={optionIdx}
//               className={`block p-3 border rounded cursor-pointer transition-colors ${styleClasses}`}
//             >
//               <input
//                 type="radio"
//                 name={`question-${question.mcqId}`}
//                 className="mr-2"
//                 onChange={() => onSelectAnswer(optionIdx)}
//                 checked={selectedIndex === optionIdx}
//                 disabled={showAnswer}
//               />
//               <span>
//                 {opt.option}. {opt.optionText}
//               </span>
//             </label>
//           );
//         })}
//       </div>

//       {selectedIndex !== undefined && selectedIndex !== null && (
//         <button
//           onClick={onToggleAnswer}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
//         >
//           {showAnswer ? "Hide Answer" : "Show Answer"}
//         </button>
//       )}

//       {showAnswer && (
//         <div className="mt-4 p-4 bg-slate-100 rounded-lg">
//           <h4 className="text-lg font-medium mb-2">Explanation</h4>
//           {question.options.map((option) => {
//             const isOptionCorrect = option.option === question.correctOption;
//             return (
//               <div key={option.option} className="mb-3">
//                 <p
//                   className={`font-medium ${
//                     isOptionCorrect ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {isOptionCorrect ? "[Correct - Choice " : "[Choice "}
//                   {option.option}]
//                 </p>
//                 <p className="text-gray-800">{option.explanation}</p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// Report Modal Component
// interface ReportModalProps {
//   isOpen: boolean;
//   mcqId: string;
//   onClose: () => void;
// }

// const ReportModal: React.FC<ReportModalProps> = ({
//   isOpen,
//   mcqId,
//   onClose,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full">
//         <h3 className="text-lg font-semibold mb-4">Report Question</h3>
//         <p className="text-sm text-slate-600 mb-4">Report MCQ ID: {mcqId}</p>
//         <textarea
//           className="w-full border border-slate-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows={4}
//           placeholder="Describe the issue..."
//         />
//         <div className="flex gap-2 justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               alert("Report submitted!");
//               onClose();
//             }}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//           >
//             Submit Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// ==================== MAIN COMPONENT ====================
// const MCQPracticeWithSidebar: React.FC = () => {
//   // State
//   const [selectedMcqBankId, setSelectedMcqBankId] =
//     useState<string>("mcq-bank-1");
//   const [breadcrumb, setBreadcrumb] = useState<string[]>([
//     "Anatomy",
//     "Cardiovascular System",
//     "Heart",
//   ]);
//   const [expandedNodes, setExpandedNodes] = useState<ExpandedNodes>({
//     anatomy: true,
//     cardiovascular: true,
//   });
//   const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [difficultyFilter, setDifficultyFilter] =
//     useState<DifficultyFilter>("All");
//   const [sortBy, setSortBy] = useState<SortOption>("Newest First");

//   const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
//   const [showAnswers, setShowAnswers] = useState<ShowAnswers>({});
//   const [readStatus, setReadStatus] = useState<ReadStatus>(
//     getReadStatusFromStorage()
//   );

//   const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
//   const [reportMcqId, setReportMcqId] = useState<string>("");

//   // Handlers
//   const handleToggleExpand = (nodeId: string) => {
//     setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
//   };

//   const handleSelectMcqBank = (id: string) => {
//     setSelectedMcqBankId(id);
//     setSidebarOpen(false); // Close sidebar on mobile after selection

//     const path = findBreadcrumbPath(DEMO_TREE_DATA, id);
//     if (path) setBreadcrumb(path);
//   };

//   const handleSelectAnswer = (mcqId: string, optionIndex: number) => {
//     setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
//   };

//   const handleToggleAnswer = (mcqId: string) => {
//     const newShowAnswers = { ...showAnswers, [mcqId]: !showAnswers[mcqId] };
//     setShowAnswers(newShowAnswers);

//     if (newShowAnswers[mcqId]) {
//       const newReadStatus = { ...readStatus, [mcqId]: true };
//       setReadStatus(newReadStatus);
//       saveReadStatusToStorage(newReadStatus);
//     }
//   };

//   const handleReport = (mcqId: string) => {
//     setReportMcqId(mcqId);
//     setReportModalOpen(true);
//   };

//   // Get and filter questions
//   const currentMcqData =
//     DEMO_MCQ_DATA[selectedMcqBankId] || DEMO_MCQ_DATA["mcq-bank-1"];
//   let filteredQuestions = currentMcqData.mcqs || [];

//   if (searchQuery) {
//     filteredQuestions = filteredQuestions.filter((q) =>
//       q.question.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   if (difficultyFilter !== "All") {
//     filteredQuestions = filteredQuestions.filter(
//       (q) => q.difficulty === difficultyFilter
//     );
//   }

//   if (sortBy === "Newest First") {
//     filteredQuestions = [...filteredQuestions].reverse();
//   }

//   const totalQuestions = filteredQuestions.length;
//   const unreadCount = filteredQuestions.filter(
//     (q) => !readStatus[q.mcqId]
//   ).length;

//   return (
//     <div className="flex h-screen bg-slate-50">
//       {/* Sidebar */}
//       <MCQBankSidebar
//         treeData={DEMO_TREE_DATA}
//         selectedId={selectedMcqBankId}
//         expandedNodes={expandedNodes}
//         isOpen={sidebarOpen}
//         onSelect={handleSelectMcqBank}
//         onToggleExpand={handleToggleExpand}
//         onClose={() => setSidebarOpen(false)}
//       />
//       {/* <Sidebar
//         treeData={DEMO_TREE_DATA}
//         selectedId={selectedMcqBankId}
//         expandedNodes={expandedNodes}
//         isOpen={sidebarOpen}
//         onSelect={handleSelectMcqBank}
//         onToggleExpand={handleToggleExpand}
//         onClose={() => setSidebarOpen(false)}
//       /> */}

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-4 lg:p-6 space-y-6">
//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
//           >
//             <Menu size={20} />
//             <span>Menu</span>
//           </button>

//           {/* Header */}
//           <div className="flex flex-col lg:flex-row justify-between flex-wrap items-start lg:items-center gap-4">
//             <div className="flex items-center justify-between flex-wrap w-full">
//               {/* Breadcrumb */}
//               <div>
//                 <p className="text-[#717182] font-normal">Current Location</p>
//                 <Breadcrumb items={breadcrumb} />
//               </div>
//               <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 flex-wrap">
//                 <span className="flex items-center gap-1 text-[#717182]">
//                   Total Questions{" "}
//                   <span className="text-lg text-[#0A0A0A] font-normal">
//                     {totalQuestions}{" "}
//                   </span>
//                 </span>
//                 <span className="flex items-center gap-1">
//                   Unread{" "}
//                   <span className="text-lg text-[#0A0A0A] font-normal">
//                     {unreadCount}{" "}
//                   </span>
//                 </span>
//                 {/* <span>Uploaded By: {currentMcqData.uploadedBy}</span> */}
//               </div>
//             </div>

//             <div className="w-full flex justify-end">
//               <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full lg:w-auto">
//                 <Plus size={20} />
//                 Create Quiz
//               </button>
//             </div>
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
//           {filteredQuestions.length === 0 ? (
//             <div className="text-center py-12 text-slate-500">
//               No questions found matching your filters.
//             </div>
//           ) : (
//             filteredQuestions.map((q, idx) => (
//               <MCQCard
//                 key={q.mcqId}
//                 question={q}
//                 questionNumber={idx + 1}
//                 totalQuestions={totalQuestions}
//                 subtopic={currentMcqData.subtopic}
//                 isRead={readStatus[q.mcqId] || false}
//                 selectedIndex={selectedAnswers[q.mcqId]}
//                 showAnswer={showAnswers[q.mcqId] || false}
//                 onSelectAnswer={(optionIndex) =>
//                   handleSelectAnswer(q.mcqId, optionIndex)
//                 }
//                 onToggleAnswer={() => handleToggleAnswer(q.mcqId)}
//                 onReport={() => handleReport(q.mcqId)}
//               />
//               // <MCQCard
//               //   key={q.mcqId}
//               //   question={q}
//               //   questionNumber={idx + 1}
//               //   totalQuestions={totalQuestions}
//               //   subtopic={currentMcqData.subtopic}
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
//         </div>
//       </div>

//       {/* Report Modal */}
//       <ReportModal
//         isOpen={reportModalOpen}
//         mcqId={reportMcqId}
//         onClose={() => setReportModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default MCQPracticeWithSidebar;
