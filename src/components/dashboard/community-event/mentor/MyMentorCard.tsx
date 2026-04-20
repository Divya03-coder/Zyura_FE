import { Button } from "@/components/ui/button";
import { Files, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Mentor } from "../types";

interface MyMentorCardProps {
  mentor: Mentor;
}

import { useState } from "react";
import { SessionSelectionModal } from "./SessionSelectionModal";

export default function MyMentorCard({ mentor }: MyMentorCardProps) {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  const handleBookSession = (sessionId: string) => {
    console.log("Session booked from card:", sessionId);
    setIsSessionModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col justify-between bg-[#F9FAFB] border border-slate-300 rounded-[8px] p-3">
        <Link
          to={`/dashboard/mentor-profile/${mentor?.accountId}`}
          state={{ mentor }}
          className=""
        >
          <div className="flex items-start justify-between gap-3 flex-wrap hover:bg-white hover:shadow-2xs px-2 py-4 rounded">
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={
                  mentor?.profile_photo ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYgW4c4mScN4iMaoZM2YNPO2iV7aaxtmDVg&s"
                }
                alt={`${mentor?.firstName} ${mentor?.lastName}`}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="space-y-[6px]">
                <h3 className="font-medium text-nowrap">
                  {mentor?.firstName} {mentor?.lastName}
                </h3>
                <p className="text-sm text-[#6B7280] text-nowrap">
                  {mentor?.specialty} •{" "}
                  {mentor?.languages?.join(", ") || "English"}
                </p>
              </div>
            </div>
          </div>
        </Link>

        <div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button className="w-full bg-white text-slate-800 hover:text-white hover:bg-blue-main border border-slate-300 rounded pt-2 px-4 cursor-pointer">
              <Link
                to={`/dashboard/ask-question/${mentor?.accountId}`}
                className="flex items-center gap-2"
              >
                <Files />
                Ask Question
              </Link>
            </Button>

            <Button
              onClick={() => setIsSessionModalOpen(true)}
              className="w-full bg-white text-slate-800 hover:text-white hover:bg-blue-main border border-slate-300 rounded pt-2 px-4 cursor-pointer"
            >
              <Plus />
              New Session
            </Button>
          </div>
        </div>
      </div>

      <SessionSelectionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        onBookNow={handleBookSession}
        mentor={mentor}
      />
    </>
  );
}
