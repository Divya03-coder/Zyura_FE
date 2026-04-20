// import { Clock } from "lucide-react";
// import { Stats } from "./type";

// interface StatsRowProps {
//   stats: Stats;
// }

// const StatsRow: React.FC<StatsRowProps> = ({ stats }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 w-full">
//       <div className="bg-white p-4 rounded-lg shadow text-center">
//         <p className="text-purple-600 font-semibold">{stats.completed}</p>
//         <p className="text-sm text-gray-600">Completed</p>
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow text-center">
//         <p className="text-green-600 font-semibold">{stats.correct}</p>
//         <p className="text-sm text-gray-600">Correct</p>
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow text-center">
//         {stats.wrong || stats.incorrect ? (
//           <>
//             <p className="text-red-600 font-semibold">
//               {stats.wrong || stats.incorrect}
//             </p>
//             <p className="text-sm text-gray-600">Wrong</p>
//           </>
//         ) : (
//           <>
//             <div className="flex justify-center items-center">
//               <Clock className="mr-1 text-blue-600" size={16} />
//               {stats.timePerQuestion}
//             </div>
//             <p className="text-sm text-gray-600">Time per question</p>
//           </>
//         )}
//       </div>
//       <div className="bg-white p-4 rounded-lg shadow text-center">
//         <div className="flex justify-center items-center">
//           <Clock className="mr-1 text-blue-600" size={16} />
//           {stats.totalTime}
//         </div>
//         <p className="text-sm text-gray-600">Total time spent</p>
//       </div>
//     </div>
//   );
// };

// export default StatsRow;



import { Clock } from "lucide-react";
import { Stats } from "./type";

interface StatsRowProps {
  stats: Stats;
}

const StatsRow: React.FC<StatsRowProps> = ({ stats }) => {
  const hasWrong = stats.wrong || stats.incorrect;

  const thirdCardClasses = hasWrong
    ? "bg-red-50 border border-red-200"
    : "bg-blue-50 border border-blue-200";

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 w-full">
      {/* Completed */}
      <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-center">
        <p className="text-purple-700 font-semibold">{stats.completed}</p>
        <p className="text-sm text-purple-600">Completed</p>
      </div>

      {/* Correct */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
        <p className="text-green-700 font-semibold">{stats.correct}</p>
        <p className="text-sm text-green-600">Correct</p>
      </div>

      {/* Wrong OR Time per question */}
      <div className={`p-4 rounded-lg text-center ${thirdCardClasses}`}>
        {hasWrong ? (
          <>
            <p className="text-red-700 font-semibold">{hasWrong}</p>
            <p className="text-sm text-red-600">Wrong</p>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center text-blue-700 font-semibold">
              <Clock className="mr-1 text-blue-600" size={16} />
              {stats.timePerQuestion}
            </div>
            <p className="text-sm text-blue-600">Time per question</p>
          </>
        )}
      </div>

      {/* Total Time */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
        <div className="flex justify-center items-center text-blue-700 font-semibold">
          <Clock className="mr-1 text-blue-600" size={16} />
          {stats.totalTime}
        </div>
        <p className="text-sm text-blue-600">Total time spent</p>
      </div>
    </div>
  );
};

export default StatsRow;
