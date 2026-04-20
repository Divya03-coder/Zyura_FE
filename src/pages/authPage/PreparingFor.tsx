// // src/components/PreparingFor.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { PreparingForData, preparingForSchema } from "./schemas";

// interface Props {
//   onNext: (data: PreparingForData) => void;
//   onBack: () => void;
//   defaultValues?: Partial<PreparingForData>;
// }

// const examOptions = [
//   {
//     id: "usmle1",
//     title: "USMLE Step 1",
//     description: "Basic science foundation",
//   },
//   {
//     id: "usmle2",
//     title: "USMLE Step 2",
//     description: "Clinical Knowledge and skills",
//   },
//   { id: "nclex", title: "NCLEX", description: "Nursing license exam" },
//   { id: "plab", title: "PLAB", description: "UK medical licensing" },
//   {
//     id: "yearly",
//     title: "Yearly Curriculum",
//     description: "School-specific coursework",
//   },
//   {
//     id: "general",
//     title: "General Studies",
//     description: "Board medical knowledge",
//   },
// ];

// const PreparingFor = ({ onNext, onBack, defaultValues }: Props) => {
//   const [selected, setSelected] = useState<string[]>(
//     defaultValues?.exams ?? []
//   );
//   console.log(selected);
//   useEffect(() => {
//     if (defaultValues?.exams) setSelected(defaultValues.exams);
//   }, [defaultValues]);

//   const toggleOption = (id: string) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
//     );
//   };

//   const handleNext = () => {
//     const result = preparingForSchema.safeParse({ exams: selected });
//     if (!result.success) {
//       // alert(result.error.errors[0].message);
//       alert("Validation failed");
//       return;
//     }
//     onNext({ exams: selected });
//   };

//   return (
//     <div className="max-w-6xl mx-auto mt-8 w-full">
//       <h1 className="text-3xl font-bold text-center mb-2">
//         What Are you Preparing For
//       </h1>
//       <p className="text-center text-gray-500 mb-8">
//         Select your primary goals so our AI can focus on what matters most
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
//         {examOptions.map((option) => {
//           const isSelected = selected.includes(option.id);
//           return (
//             <div
//               key={option.id}
//               onClick={() => toggleOption(option.id)}
//               className={`flex items-center gap-3 w-full border rounded-[8px] p-6 cursor-pointer transition-all ${
//                 isSelected
//                   ? "bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)] border-primary-blue"
//                   : "border-slate-300 hover:bg-[#F4F7FC]"
//               }`}
//             >
//               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
//                 {option.title[0]}
//               </div>
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                   {option.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{option.description}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-between">
//         <button onClick={onBack} className="px-4 py-2 border rounded">
//           Back
//         </button>
//         <button
//           onClick={handleNext}
//           className="px-4 py-2 bg-blue-main text-white rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PreparingFor;

import { useEffect, useState } from "react";
import { PreparingForData, preparingForSchema } from "./schemas";
import { examOptions } from "./constants";

interface Props {
  onNext: (data: PreparingForData) => void;
  onBack: () => void;
  defaultValues?: Partial<PreparingForData>;
}

const PreparingFor = ({ onNext, onBack, defaultValues }: Props) => {
  const [selected, setSelected] = useState<string[]>(
    defaultValues?.exams ?? []
  );

  useEffect(() => {
    if (defaultValues?.exams) setSelected(defaultValues.exams);
  }, [defaultValues]);

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    const result = preparingForSchema.safeParse({ exams: selected });
    if (!result.success) {
      alert("Please select at least one exam");
      return;
    }

    onNext({ exams: selected });
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 w-full">
      <h1 className="text-3xl font-bold text-center mb-2">
        What Are you Preparing For
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Select your primary goals so our AI can focus on what matters most
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {examOptions.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <div
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`flex items-center gap-3 w-full border rounded-[8px] p-6 cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#F4F7FC] shadow-[0_0_24px_0_rgba(49,116,205,0.25)] border-primary-blue"
                  : "border-slate-300 hover:bg-[#F4F7FC]"
              }`}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                {option.examName[0]}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {option.examName}
                </h3>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={selected.length === 0}
          className={`px-4 py-2 bg-blue-main text-white rounded ${
            selected.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PreparingFor;
