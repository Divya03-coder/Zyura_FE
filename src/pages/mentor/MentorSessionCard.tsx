import PrimaryButton from "@/components/reusable/PrimaryButton";
import { CalendarDays, Video } from "lucide-react";
import { Link } from "react-router-dom";

export default function MentorSessionCard({ session }: { session: any }) {
  return (
    <div className="border border-slate-300 rounded-[8px] bg-[#EFF6FF] p-5">
      <Link
        to={`/mentor/session-details/${session?._id || 3}`}
        className="hover:bg-white"
      >
        <div className="hover:bg-white rounded p-1">
          <p className="text-sm text-[#0A0A0A] font-medium">
            {session?.title || "USMLE Step 1 Preparation Masterclass"}
          </p>
          <p className="text-sm text-[#717182] mt-0.5">
            with
            <span className="text-sm text-zinc-700 underline ml-1">
              {session?.mentorName || "Dr. James Wilson"}
            </span>
          </p>

          <div className="flex flex-wrap justify-between mt-4 space-y-2">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <p className="text-xs text-[#4A5565]">
                  {session?.date
                    ? new Date(session.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "January 15, 2025"}{" "}
                  • {session?.time || "5:00 PM GMT"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Video size={16} />
                <p className="text-xs text-[#4A5565]">
                  {session?.meetingType || "Zoom"}
                </p>
              </div>
            </div>
            {session?.issueCount > 0 && (
              <p className="text-xs text-[#FBA20C] underline">
                {session.issueCount} Issue
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-3 mt-6">
        <PrimaryButton
          iconPosition="left"
          className="w-full bg-blue-main text-white border border-slate-300 transition-colors hover:bg-blue-600 hover:text-white"
        >
          Accept
        </PrimaryButton>
        <PrimaryButton
          iconPosition="left"
          className="w-full bg-transparent text-red-600 border border-red-600 transition-colors hover:bg-red-600 hover:text-white"
        >
          Reject
        </PrimaryButton>
      </div>
    </div>
  );
}
