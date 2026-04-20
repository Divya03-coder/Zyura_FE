// import React, { useState } from "react";
// import { Target, Calendar, Clock } from "lucide-react";

// // Types
// interface Subject {
//   name: string;
//   systems: string[];
// }

// interface SelectedSubject {
//   subjectName: string;
//   systemNames: string[];
//   fullSubject: boolean;
// }

// interface FormData {
//   goalName: string;
//   studyHoursPerDay: number;
//   startDate: string;
//   endDate: string;
// }

// interface Goal extends FormData {
//   selectedSubjects: SelectedSubject[];
//   accuracy: number;
//   completed: number;
//   daysRemaining: number;
//   totalHours: number;
// }

// interface StepIndicatorProps {
//   currentStep: number;
// }

// interface EmptyStateProps {
//   onSetGoal: () => void;
// }

// interface DashboardProps {
//   goal: Goal;
//   onChangeGoal: () => void;
// }

// interface ModalProps {
//   showModal: boolean;
//   currentStep: number;
//   onClose: () => void;
//   children: React.ReactNode;
// }

// interface Step1Props {
//   formData: FormData;
//   onFormDataChange: (data: FormData) => void;
//   onNext: () => void;
//   onCancel: () => void;
// }

// interface Step2Props {
//   availableSubjects: Subject[];
//   selectedSubjects: SelectedSubject[];
//   onSubjectToggle: (subjectName: string) => void;
//   onFullSubjectToggle: (subjectName: string) => void;
//   onSystemToggle: (subjectName: string, systemName: string) => void;
//   onPrevious: () => void;
//   onNext: () => void;
// }

// interface Step3Props {
//   formData: FormData;
//   selectedSubjects: SelectedSubject[];
//   availableSubjects: Subject[];
//   calculateDuration: () => number;
//   calculateTotalStudyHours: () => number;
//   calculateHoursPerSystem: () => string;
//   onPrevious: () => void;
//   onCreate: () => void;
// }

// // Step Indicator Component
// const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
//   return (
//     <div className="flex items-center justify-center mb-6">
//       <div className="flex items-center">
//         <div
//           className={`w-8 h-8 rounded-full flex items-center justify-center ${
//             currentStep >= 1 ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           1
//         </div>
//         <div
//           className={`w-16 h-1 ${
//             currentStep >= 2 ? "bg-blue-500" : "bg-gray-200"
//           }`}
//         ></div>
//         <div
//           className={`w-8 h-8 rounded-full flex items-center justify-center ${
//             currentStep >= 2 ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           2
//         </div>
//         <div
//           className={`w-16 h-1 ${
//             currentStep >= 3 ? "bg-blue-500" : "bg-gray-200"
//           }`}
//         ></div>
//         <div
//           className={`w-8 h-8 rounded-full flex items-center justify-center ${
//             currentStep >= 3 ? "bg-blue-500 text-white" : "bg-gray-200"
//           }`}
//         >
//           3
//         </div>
//       </div>
//     </div>
//   );
// };

// Empty State Component
// const EmptyState: React.FC<EmptyStateProps> = ({ onSetGoal }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4">
//       <h1 className="text-2xl font-semibold mb-7">
//         Good Morning, Emma Harrison!
//       </h1>

//       <div className="flex flex-col items-center justify-center space-y-4">
//         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//           <Target className="w-8 h-8 text-gray-400" />
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold text-[#171717] mb-1 text-center">
//             No Goal Set
//           </h2>
//           <p className="text-gray-600 text-center">
//             Create your first study goal to start tracking your
//             <br />
//             medical studies progress
//           </p>
//         </div>
//         <button
//           onClick={onSetGoal}
//           className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
//         >
//           Set your goal
//         </button>
//       </div>
//     </div>
//   );
// };

// // Dashboard Component
// const Dashboard: React.FC<DashboardProps> = ({ goal, onChangeGoal }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Good Morning, Emma Harrison!</h1>
//         <button
//           onClick={onChangeGoal}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
//         >
//           ✏️ Change Goal
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-6 mb-8">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//             <Target className="w-6 h-6 text-purple-600" />
//           </div>
//           <div>
//             <div className="text-sm text-gray-600">Your goal:</div>
//             <div className="font-semibold">{goal.goalName}</div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//             <Calendar className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <div className="text-sm text-gray-600">Time Left</div>
//             <div className="font-semibold">
//               {goal.daysRemaining} days remaining ({goal.totalHours} hrs)
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//             <Clock className="w-6 h-6 text-purple-600" />
//           </div>
//           <div>
//             <div className="text-sm text-gray-600">Daily Target</div>
//             <div className="font-semibold">
//               {goal.studyHoursPerDay} hrs/ 5 hrs
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mb-4">
//         <div className="flex justify-between items-center mb-2">
//           <span className="text-sm font-medium">Progress %</span>
//           <div className="flex gap-4 text-sm">
//             <span className="flex items-center gap-1">
//               <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
//               Accuracy {goal.accuracy}%
//             </span>
//             <span className="flex items-center gap-1">
//               <span className="w-3 h-3 bg-blue-300 rounded-full"></span>
//               Completed {goal.completed}%
//             </span>
//           </div>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
//           <div className="h-full flex">
//             <div
//               className="bg-blue-500 h-full"
//               style={{ width: `${goal.accuracy}%` }}
//             ></div>
//             <div
//               className="bg-blue-300 h-full"
//               style={{ width: `${goal.completed - goal.accuracy}%` }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Modal Component
// const Modal: React.FC<ModalProps> = ({
//   showModal,
//   currentStep,
//   onClose,
//   children,
// }) => {
//   if (!showModal) return null;

//   return (
//     <div
//       className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Create Your Goal</h2>

//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="px-6 py-4">
//           <StepIndicator currentStep={currentStep} />
//         </div>

//         {children}
//       </div>
//     </div>
//   );
// };

// // Step 1 Component
// const Step1: React.FC<Step1Props> = ({
//   formData,
//   onFormDataChange,
//   onNext,
//   onCancel,
// }) => {
//   const isValid =
//     formData.goalName &&
//     formData.studyHoursPerDay > 0 &&
//     formData.startDate &&
//     formData.endDate;

//   return (
//     <div className="p-6">
//       <h3 className="text-lg font-semibold mb-4">Setup Duration</h3>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">Goal name</label>
//         <input
//           type="text"
//           placeholder="e.g., Final Year MBBS Preparation"
//           value={formData.goalName}
//           onChange={(e) =>
//             onFormDataChange({ ...formData, goalName: e.target.value })
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-2">
//           Study hours per day
//         </label>
//         <input
//           type="number"
//           min="0"
//           value={formData.studyHoursPerDay}
//           onChange={(e) =>
//             onFormDataChange({
//               ...formData,
//               studyHoursPerDay: Number(e.target.value),
//             })
//           }
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">Start Date</label>
//           <input
//             type="date"
//             value={formData.startDate}
//             onChange={(e) =>
//               onFormDataChange({ ...formData, startDate: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-2">End Date</label>
//           <input
//             type="date"
//             value={formData.endDate}
//             onChange={(e) =>
//               onFormDataChange({ ...formData, endDate: e.target.value })
//             }
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={onCancel}
//           className="px-4 py-2 text-gray-600 hover:text-gray-800"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onNext}
//           disabled={!isValid}
//           className={`px-6 py-2 rounded-lg ${
//             isValid
//               ? "bg-blue-500 text-white hover:bg-blue-600"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// // Subject Item Component
// const SubjectItem: React.FC<{
//   subject: Subject;
//   selected: SelectedSubject | undefined;
//   onSubjectToggle: (name: string) => void;
//   onFullSubjectToggle: (name: string) => void;
//   onSystemToggle: (subjectName: string, systemName: string) => void;
// }> = ({
//   subject,
//   selected,
//   onSubjectToggle,
//   onFullSubjectToggle,
//   onSystemToggle,
// }) => {
//   const isSelected = !!selected;

//   return (
//     <div className="border border-gray-200 rounded-lg p-4">
//       <div className="flex items-start justify-between">
//         <div className="flex items-start gap-3 flex-1">
//           <input
//             type="checkbox"
//             checked={isSelected}
//             onChange={() => onSubjectToggle(subject.name)}
//             className="mt-1 w-4 h-4"
//           />
//           <div className="flex-1">
//             <div className="font-medium">{subject.name}</div>
//             <div className="text-sm text-gray-500">
//               {subject.systems.length} systems
//             </div>

//             {isSelected && selected && (
//               <>
//                 <div className="mt-3 flex items-center justify-between bg-gray-50 p-2 rounded">
//                   <span className="text-sm">Cover Full Subject</span>
//                   <label className="relative inline-block w-12 h-6">
//                     <input
//                       type="checkbox"
//                       checked={selected.fullSubject}
//                       onChange={() => onFullSubjectToggle(subject.name)}
//                       className="opacity-0 w-0 h-0 peer"
//                     />
//                     <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-all peer-checked:bg-blue-500">
//                       <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
//                     </span>
//                   </label>
//                 </div>

//                 {!selected.fullSubject && (
//                   <div className="mt-3">
//                     <button
//                       onClick={() => {
//                         const elem = document.getElementById(
//                           `systems-${subject.name}`
//                         );
//                         if (elem) elem.classList.toggle("hidden");
//                       }}
//                       className="text-sm text-blue-500 hover:text-blue-600"
//                     >
//                       Select Systems ({selected.systemNames.length}/
//                       {subject.systems.length} selected)
//                     </button>
//                     <div
//                       id={`systems-${subject.name}`}
//                       className="hidden mt-2 space-y-2 pl-4"
//                     >
//                       {subject.systems.map((system) => (
//                         <label
//                           key={system}
//                           className="flex items-center gap-2 text-sm"
//                         >
//                           <input
//                             type="checkbox"
//                             checked={selected.systemNames.includes(system)}
//                             onChange={() =>
//                               onSystemToggle(subject.name, system)
//                             }
//                             className="w-4 h-4"
//                           />
//                           {system}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Step 2 Component
// const Step2: React.FC<Step2Props> = ({
//   availableSubjects,
//   selectedSubjects,
//   onSubjectToggle,
//   onFullSubjectToggle,
//   onSystemToggle,
//   onPrevious,
//   onNext,
// }) => {
//   const getTotalSystemsSelected = () => {
//     return selectedSubjects.reduce(
//       (total, subject) => total + subject.systemNames.length,
//       0
//     );
//   };

//   const isValid = selectedSubjects.length > 0 && getTotalSystemsSelected() > 0;

//   return (
//     <div className="p-6">
//       <h3 className="text-lg font-semibold mb-2">Select Subjects</h3>
//       <p className="text-sm text-gray-600 mb-4">
//         Choose subjects and decide whether to cover them fully or select
//         specific systems
//       </p>

//       <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm">
//         <span className="font-medium">
//           {selectedSubjects.length} subjects selected
//         </span>
//         <span className="mx-2">·</span>
//         <span className="font-medium">
//           {getTotalSystemsSelected()} systems total
//         </span>
//       </div>

//       <div className="max-h-80 overflow-y-auto mb-4 space-y-3">
//         {availableSubjects.map((subject) => {
//           const selected = selectedSubjects.find(
//             (s) => s.subjectName === subject.name
//           );
//           return (
//             <SubjectItem
//               key={subject.name}
//               subject={subject}
//               selected={selected}
//               onSubjectToggle={onSubjectToggle}
//               onFullSubjectToggle={onFullSubjectToggle}
//               onSystemToggle={onSystemToggle}
//             />
//           );
//         })}
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={onPrevious}
//           className="px-4 py-2 text-gray-600 hover:text-gray-800"
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={onNext}
//           disabled={!isValid}
//           className={`px-6 py-2 rounded-lg ${
//             isValid
//               ? "bg-blue-500 text-white hover:bg-blue-600"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// // Step 3 Component
// const Step3: React.FC<Step3Props> = ({
//   formData,
//   selectedSubjects,
//   availableSubjects,
//   calculateDuration,
//   calculateTotalStudyHours,
//   calculateHoursPerSystem,
//   onPrevious,
//   onCreate,
// }) => {
//   return (
//     <div className="p-6">
//       <h3 className="text-lg font-semibold mb-4">Goal Overview</h3>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="bg-gray-50 p-3 rounded-lg">
//           <div className="text-sm text-gray-600">Goal Name</div>
//           <div className="font-medium">{formData.goalName}</div>
//         </div>
//         <div className="bg-gray-50 p-3 rounded-lg">
//           <div className="text-sm text-gray-600">Study Hours/Day</div>
//           <div className="font-medium">{formData.studyHoursPerDay} hours</div>
//         </div>
//         <div className="bg-gray-50 p-3 rounded-lg">
//           <div className="text-sm text-gray-600">Total Duration</div>
//           <div className="font-medium">{calculateDuration()} days</div>
//         </div>
//         <div className="bg-gray-50 p-3 rounded-lg">
//           <div className="text-sm text-gray-600">Total Study Hours</div>
//           <div className="font-medium">{calculateTotalStudyHours()} hours</div>
//         </div>
//       </div>

//       <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm">
//         Each system will receive approximately{" "}
//         <span className="font-semibold">{calculateHoursPerSystem()} hours</span>
//       </div>

//       <div className="max-h-60 overflow-y-auto space-y-4 mb-6">
//         {selectedSubjects.map((subject) => {
//           return (
//             <div
//               key={subject.subjectName}
//               className="border-l-4 border-blue-500 pl-4"
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <div className="font-medium text-lg">{subject.subjectName}</div>
//                 <div className="text-sm text-gray-600">
//                   {subject.fullSubject
//                     ? "Full Subject"
//                     : `${subject.systemNames.length} systems`}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {subject.systemNames.map((system) => (
//                   <span
//                     key={system}
//                     className="text-xs bg-gray-100 px-2 py-1 rounded"
//                   >
//                     {system}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={onPrevious}
//           className="px-4 py-2 text-gray-600 hover:text-gray-800"
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={onCreate}
//           className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Create Goal
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Component
// const MedicalStudyGoalTracker: React.FC = () => {
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const [goal, setGoal] = useState<Goal | null>(null);

//   const [formData, setFormData] = useState<FormData>({
//     goalName: "",
//     studyHoursPerDay: 0,
//     startDate: "",
//     endDate: "",
//   });

//   const availableSubjects: Subject[] = [
//     {
//       name: "Pathology",
//       systems: [
//         "General Pathology",
//         "Systemic Pathology",
//         "Clinical Pathology",
//         "Hematology",
//         "Immunology",
//         "Genetics",
//         "Neoplasia",
//         "Inflammation",
//         "Cell Injury",
//         "Hemodynamics",
//       ],
//     },
//     {
//       name: "Pharmacology",
//       systems: [
//         "General Pharmacology",
//         "Autonomic Drugs",
//         "CNS Drugs",
//         "Cardiovascular Drugs",
//         "Antibiotics",
//         "Chemotherapy",
//         "Endocrine Drugs",
//         "GI Drugs",
//         "Respiratory Drugs",
//         "Toxicology",
//       ],
//     },
//     {
//       name: "Microbiology",
//       systems: [
//         "Bacteriology",
//         "Virology",
//         "Mycology",
//         "Parasitology",
//         "Immunology",
//         "Infection Control",
//         "Gram Positive",
//         "Gram Negative",
//         "Anaerobes",
//         "Mycobacteria",
//       ],
//     },
//     {
//       name: "Biochemistry",
//       systems: [
//         "Carbohydrates",
//         "Proteins",
//         "Lipids",
//         "Nucleic Acids",
//         "Enzymes",
//         "Vitamins",
//         "Minerals",
//         "Metabolism",
//         "Clinical Biochemistry",
//         "Molecular Biology",
//       ],
//     },
//     {
//       name: "Anatomy",
//       systems: [
//         "Cardiovascular",
//         "Respiratory",
//         "Digestive",
//         "Urinary",
//         "Reproductive",
//         "Endocrine",
//         "Nervous",
//         "Musculoskeletal",
//         "Lymphatic",
//         "Integumentary",
//       ],
//     },
//     {
//       name: "Physiology",
//       systems: [
//         "Cardiovascular",
//         "Respiratory",
//         "Nervous",
//         "Digestive",
//         "Renal",
//         "Endocrine",
//         "Reproductive",
//         "Musculoskeletal",
//         "Blood",
//         "Special Senses",
//       ],
//     },
//   ];

//   const [selectedSubjects, setSelectedSubjects] = useState<SelectedSubject[]>(
//     []
//   );

//   const handleSubjectToggle = (subjectName: string) => {
//     const subject = availableSubjects.find((s) => s.name === subjectName);
//     const existingIndex = selectedSubjects.findIndex(
//       (s) => s.subjectName === subjectName
//     );

//     if (existingIndex >= 0) {
//       setSelectedSubjects(
//         selectedSubjects.filter((s) => s.subjectName !== subjectName)
//       );
//     } else {
//       setSelectedSubjects([
//         ...selectedSubjects,
//         { subjectName, systemNames: [], fullSubject: false },
//       ]);
//     }
//   };

//   const handleFullSubjectToggle = (subjectName: string) => {
//     const subject = availableSubjects.find((s) => s.name === subjectName);
//     if (!subject) return;

//     const existingIndex = selectedSubjects.findIndex(
//       (s) => s.subjectName === subjectName
//     );

//     if (existingIndex >= 0) {
//       const updated = [...selectedSubjects];
//       const currentFullSubject = updated[existingIndex].fullSubject;

//       if (currentFullSubject) {
//         updated[existingIndex] = {
//           subjectName,
//           systemNames: [],
//           fullSubject: false,
//         };
//       } else {
//         updated[existingIndex] = {
//           subjectName,
//           systemNames: [...subject.systems],
//           fullSubject: true,
//         };
//       }
//       setSelectedSubjects(updated);
//     }
//   };

//   const handleSystemToggle = (subjectName: string, systemName: string) => {
//     const subject = availableSubjects.find((s) => s.name === subjectName);
//     if (!subject) return;

//     const existingIndex = selectedSubjects.findIndex(
//       (s) => s.subjectName === subjectName
//     );

//     if (existingIndex >= 0) {
//       const updated = [...selectedSubjects];
//       const systemIndex =
//         updated[existingIndex].systemNames.indexOf(systemName);

//       if (systemIndex >= 0) {
//         updated[existingIndex].systemNames = updated[
//           existingIndex
//         ].systemNames.filter((s) => s !== systemName);
//       } else {
//         updated[existingIndex].systemNames = [
//           ...updated[existingIndex].systemNames,
//           systemName,
//         ];
//       }

//       updated[existingIndex].fullSubject =
//         updated[existingIndex].systemNames.length === subject.systems.length;
//       setSelectedSubjects(updated);
//     }
//   };

//   const calculateDuration = (): number => {
//     if (!formData.startDate || !formData.endDate) return 0;
//     const start = new Date(formData.startDate);
//     const end = new Date(formData.endDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   const calculateTotalStudyHours = (): number => {
//     return calculateDuration() * formData.studyHoursPerDay;
//   };

//   const calculateHoursPerSystem = (): string => {
//     const totalSystems = selectedSubjects.reduce(
//       (total, subject) => total + subject.systemNames.length,
//       0
//     );
//     if (totalSystems === 0) return "0";
//     return (calculateTotalStudyHours() / totalSystems).toFixed(1);
//   };

//   const handleCreateGoal = () => {
//     const goalData: Goal = {
//       ...formData,
//       selectedSubjects: selectedSubjects.map((s) => ({
//         subjectName: s.subjectName,
//         systemNames: s.systemNames,
//         fullSubject: s.fullSubject,
//       })),
//       accuracy: 75,
//       completed: 65,
//       daysRemaining: 36,
//       totalHours: calculateTotalStudyHours(),
//     };

//     console.log("Creating goal:", goalData);
//     setGoal(goalData);
//     handleCloseModal();
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCurrentStep(1);
//     setFormData({
//       goalName: "",
//       studyHoursPerDay: 0,
//       startDate: "",
//       endDate: "",
//     });
//     setSelectedSubjects([]);
//   };

//   const handleChangeGoal = () => {
//     setGoal(null);
//     setShowModal(true);
//   };

//   return (
//     <div className="bg-gray-50 mb-12">
//       <div className="">
//         {!goal ? (
//           <EmptyState onSetGoal={() => setShowModal(true)} />
//         ) : (
//           <Dashboard goal={goal} onChangeGoal={handleChangeGoal} />
//         )}

//         <Modal
//           showModal={showModal}
//           currentStep={currentStep}
//           onClose={handleCloseModal}
//         >
//           {currentStep === 1 && (
//             <Step1
//               formData={formData}
//               onFormDataChange={setFormData}
//               onNext={() => setCurrentStep(2)}
//               onCancel={handleCloseModal}
//             />
//           )}
//           {currentStep === 2 && (
//             <Step2
//               availableSubjects={availableSubjects}
//               selectedSubjects={selectedSubjects}
//               onSubjectToggle={handleSubjectToggle}
//               onFullSubjectToggle={handleFullSubjectToggle}
//               onSystemToggle={handleSystemToggle}
//               onPrevious={() => setCurrentStep(1)}
//               onNext={() => setCurrentStep(3)}
//             />
//           )}
//           {currentStep === 3 && (
//             <Step3
//               formData={formData}
//               selectedSubjects={selectedSubjects}
//               availableSubjects={availableSubjects}
//               calculateDuration={calculateDuration}
//               calculateTotalStudyHours={calculateTotalStudyHours}
//               calculateHoursPerSystem={calculateHoursPerSystem}
//               onPrevious={() => setCurrentStep(2)}
//               onCreate={handleCreateGoal}
//             />
//           )}
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default MedicalStudyGoalTracker;
