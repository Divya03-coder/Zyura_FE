// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FileText } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function MCQBankCard(mcq: any) {
//     console.log("MCQBankCard:", mcq)
//   return (
//     <div
//       key={mcq?.mcq?._id}
//       className="border border-slate-300 rounded-lg py-4 px-5"
//     >
//       <div className="flex items-end justify-between">
//         <div className="sm:flex items-center gap-10">
//           {/* Icon */}
//           <div className="sm:border-r-2 border-r-slate-300 pr-4">
//             <FileText className="w-12 h-12 mx-auto text-slate-600" />
//           </div>

//           {/* Content */}
//           <div className="space-y-2">
//             <h4 className="text-lg text-slate-900 font-medium">{mcq?.mcq?.title}</h4>
//             <div className="flex flex-wrap items-center gap-4">
//               <p className="text-slate-600">{mcq?.mcq?.totalMcq}</p>
//               <div className="flex flex-wrap items-center gap-2">
//                 {/* {mcq.tags.map((tag, idx) => ( */}
//                 <p
//                   // key={idx}
//                   className="border border-slate-300 rounded-full px-2"
//                 >
//                   {mcq?.mcq?.topic}
//                 </p>
//                 {/* ))} */}
//               </div>
//             </div>
//             <p className="text-sm text-slate-700 mt-2">
//               Uploaded By: {mcq?.mcq?.uploadedBy}
//             </p>
//           </div>
//         </div>
//         <Link to={`/dashboard/practice-mcq/${mcq?.mcq?._id}`}>
//           <button className="text-blue-main font-medium hover:underline cursor-pointer">
//             Start Now
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileText } from "lucide-react";

interface MCQBankCardProps {
  mcq: any;
  onStartClick: () => void;
}

export default function MCQBankCard({ mcq, onStartClick }: MCQBankCardProps) {
  return (
    <div className="border border-slate-300 rounded-lg py-4 px-5">
      <div className="flex items-end justify-between">
        <div className="sm:flex items-center gap-10">
          {/* Icon */}
          <div className="sm:border-r-2 border-r-slate-300 pr-4">
            <FileText className="w-12 h-12 mx-auto text-slate-600" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h4 className="text-lg text-slate-900 font-medium">
              {mcq?.title}
            </h4>
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-slate-600">{mcq?.totalMcq} Questions</p>
              <div className="flex flex-wrap items-center gap-2">
                <p className="border border-slate-300 rounded-full px-2">
                  {mcq?.topic}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-700 mt-2">
              Uploaded By: {mcq?.uploadedBy}
            </p>
          </div>
        </div>

        <button
          onClick={onStartClick}
          className="text-blue-main font-medium hover:underline cursor-pointer"
        >
          Start Now
        </button>
      </div>
    </div>
  );
}