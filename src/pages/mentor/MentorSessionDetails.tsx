import { useState } from "react";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { CalendarDays, Video } from "lucide-react";
// import { Calendar, TimerOff, Video } from "lucide-react";

export default function MentorSessionDetails() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Mentor", link: "/mentor" },
    { name: "Classes", link: "/mentor/classes" },
  ];

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError("Answer cannot be empty.");
      return;
    }
    console.log(answer);
    setLoading(false);
    setError(null);
    setSuccess(false);
    // try {
    //

    //   // Example API call — replace with your endpoint
    //   const res = await fetch("/api/mentor/session/answer", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ answer }),
    //   });

    //   if (!res.ok) {
    //     throw new Error("Failed to submit answer");
    //   }

    //   setSuccess(true);
    //   setAnswer(""); // clear textarea
    // } catch (err: any) {
    //   setError(err.message || "Something went wrong.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen px-6">
      {/* Breadcrumb */}
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div>
        <div className="max-w-[350px] border border-slate-300 rounded-[8px] bg-[#EFF6FF] p-5">
          <p className="text-sm text-[#0A0A0A] font-medium">
            USMLE Step 1 Preparation Masterclass
          </p>
          <p className="text-sm text-[#717182] mt-0.5">
            with
            <span className="text-sm text-zinc-700 underline ml-1">
              Dr. James Wilson
            </span>
          </p>

          <div className="flex flex-wrap justify-between mt-4 mb-6 space-y-2">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays />
                <p className="text-xs text-[#4A5565]">
                  January 15, 2025 • 5:00 PM GMT
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Video />
                <p className="text-xs text-[#4A5565]">Zoom</p>
              </div>
            </div>
            <p className="text-xs text-[#FBA20C] underline">1 Issue</p>
          </div>

          <div className="flex flex-col gap-3">
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
      </div>

      <div>
        {/* Issues Section */}
        <div className="mb-6 mt-5">
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
            Give Answer
          </h3>

          <div className="bg-white border border-[#0000001A] rounded-[6px] p-5 flex flex-col">
            <p className="text-[#0A0A0A] font-medium mb-2">Your Answer</p>

            <textarea
              className="w-full h-[120px] border border-gray-300 rounded-lg p-3 text-sm resize-none 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         bg-[#F3F3F5] text-gray-800 placeholder-[#717182]"
              placeholder="What's on your mind? Share a study tip, ask a question, or start a discussion..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm mt-2">
                ✅ Answer submitted successfully!
              </p>
            )}

            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="text-sm bg-blue-main text-white py-3 px-8 rounded mt-5 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
