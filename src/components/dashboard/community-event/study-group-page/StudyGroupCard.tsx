import { FaClock } from "react-icons/fa";
import groupBanner from "@/assets/dashboard/medical-group-banner.jpg";

export default function StudyGroupCard() {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Banner with overlay text */}
      <div className="relative">
        <img
          src={groupBanner}
          alt="Group banner"
          className="h-32 w-full object-cover"
        />
        <p className="absolute top-1/2 transform -translate-y-1/2 left-3 text-white font-medium">
          Cardiology study group
        </p>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Cardiology study group
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Collaborative learning for future cardiologists.
        </p>

        {/* Members + Count */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center -space-x-2">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="member"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="member"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://randomuser.me/api/portraits/men/46.jpg"
              alt="member"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <span className="text-sm text-slate-500">12 members</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <FaClock className="w-4 h-4" />
            <span>12 days ago</span>
          </div>
          <span className="px-3 py-2 bg-emerald-600 text-white text-xs font-medium rounded">
            Joined
          </span>
        </div>
      </div>
    </div>
  );
}
