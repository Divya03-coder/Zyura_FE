import { Calendar, Video, TimerOff } from "lucide-react";
import { BreadcrumbItem } from "../../gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

export default function SessionDetails() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Mentor", link: "/dashboard/mentorship" },
    { name: "My Session", link: "/dashboard/my-session" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Breadcrumb */}
      <Breadcrumb breadcrumbs={breadcrumbs} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">My Sessions</h1>
        <p className="text-gray-500">
          Connect, learn, and grow with the medical education community
        </p>
      </div>

      {/* Session Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              USMLE Step 1 Preparation Masterclass
            </h2>
            <p className="text-gray-600">with Dr. James Wilson</p>
            <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>January 15, 2025 • 5:00 PM GMT</span>
              </div>
              <div className="flex items-center gap-1">
                <Video size={16} />
                <span>Zoom</span>
              </div>
            </div>
          </div>
          <button className="mt-4 md:mt-0 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            <TimerOff size={16} />
            Session Timed Out
          </button>
        </div>

        {/* Issues Section */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Issues</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            The patient reports that the pain began gradually around 6 hours ago
            as a dull ache around the umbilical area. Over the past 2–3 hours,
            the pain has migrated to the right lower quadrant and become
            increasingly severe and constant. She describes the current pain as
            sharp and stabbing, rated 8/10 in intensity. The pain is worsened by
            movement, coughing, or walking. She has experienced nausea and
            vomited twice in the past 2 hours, initially containing food
            particles and later just bile. The patient denies diarrheal but
            reports decreased appetite since yesterday. She has not had a bowel
            movement since yesterday morning. She denies urinary symptoms,
            vaginal discharge, or recent sexual activity. Her last menstrual
            period was 2 weeks ago and was normal. She is not currently taking
            any medications and denies any known allergies.
          </p>
        </div>

        {/* Mentor's Instruction Section */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Mentor's Instruction
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            The patient reports that the pain began gradually around 6 hours ago
            as a dull ache around the umbilical area. Over the past 2–3 hours,
            the pain has migrated to the right lower quadrant and become
            increasingly severe and constant. She describes the current pain as
            sharp and stabbing, rated 8/10 in intensity. The pain is worsened by
            movement, coughing, or walking. She has experienced nausea and
            vomited twice in the past 2 hours, initially containing food
            particles and later just bile. The patient denies diarrheal but
            reports decreased appetite since yesterday. She has not had a bowel
            movement since yesterday morning. She denies urinary symptoms,
            vaginal discharge, or recent sexual activity. Her last menstrual
            period was 2 weeks ago and was normal. She is not currently taking
            any medications and denies any known allergies.
          </p>
        </div>
      </div>
    </div>
  );
}
