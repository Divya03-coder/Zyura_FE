import { CalendarDays, Video } from "lucide-react";
import { Link } from "react-router-dom";

export default function SessionCard() {
  return (
    <>
      <div className="border border-slate-300 rounded-[8px] bg-[#F9FAFB] p-4 ">
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#0A0A0A] font-medium">
            Cardiovascular System{" "}
          </p>
          <p className="text-[10px] text-slate-600">45 mins</p>
        </div>
        <p className="text-[12px] text-slate-800 mb-[6px]">by Dr. Sarah Chen</p>
        <div className="flex items-center gap-3">
          <CalendarDays />
          <p className="text-sm text-[#4A5565]">
            January 15, 2025 • 5:00 PM GMT
          </p>
        </div>

        {/* <Link to={"/dashboard/create-new-discussion"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            icon={<Video className="w-4 h-4" />}
            className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            See Recordings
          </PrimaryButton>
        </Link> */}
        <Link to={""}>
          <div className="flex items-center gap-3 text-blue-main hover:text-blue-600 mt-10">
            <Video />
            <p className="text-sm">See Recordings</p>
          </div>
        </Link>
      </div>
    </>
  );
}

//  <div className="max-w-sm bg-white rounded-[8px] shadow-md overflow-hidden border border-slate-300">
//         {/* Image Section */}
//         <div className="relative">
//           <img
//             src="https://images.unsplash.com/photo-1652787544912-137c7f92f99b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVkaWNhbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
//             alt="Course Thumbnail"
//             className="w-full h-48 object-cover"
//           />
//           {/* New Badge */}
//           <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-lg">
//             New
//           </span>
//           {/* Duration */}
//           <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
//             <Clock size={14} /> 60m
//           </span>
//         </div>

//         {/* Content Section */}
//         <div className="p-4">
//           <h2 className="font-semibold text-[#0A0A0A]">
//             Cardiovascular System Deep Dive
//           </h2>
//           <p className="text-[#717182] text-sm mt-1 leading-snug">
//             Comprehensive review of cardiovascular anatomy, physiology, and
//             common pathologies
//           </p>
//           <p className="text-sm text-slate-800 mt-3">
//             by <span className="">Dr. Sarah Chen</span> • 1/20/2024
//           </p>

//           {/* Tags */}
//           <div className="flex gap-2 flex-wrap mt-3">
//             <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
//               Cardiology
//             </span>
//             <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
//               Cardiology
//             </span>
//           </div>

//           {/* Watch Button */}
//           <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//             <Play size={16} /> Watch
//           </button>
//         </div>
//       </div>
