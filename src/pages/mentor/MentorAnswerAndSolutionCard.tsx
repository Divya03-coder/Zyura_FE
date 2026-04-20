import { useState } from "react";

export default function MentorAnswerAndSolutionCard() {
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
    <div>
      <div className="bg-white border border-[#0000001A] rounded-[6px] p-5">
        <div>
          <div className="flex flex-wrap justify-start gap-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="profile image"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-[#0A0A0A]">Alex Thompson</p>
              <p className="text-sm text-[#717182] mt-2">. 4 hours ago</p>
            </div>
            <p className="flex items-center px-2 py-1 bg-[#030213] rounded-full text-white">
              MS3 Student
            </p>
          </div>
          <p className="text-sm text-[#0A0A0A] mt-4 mb-7">
            I highly recommend 'The ECG Made Easy' by John Hampton. It's concise
            but comprehensive. Also, try the ECG Tutor app - it has great
            practice cases with step-by-step explanations. For blocks
            specifically, focus on understanding the PR interval, QRS width, and
            rhythm patterns. Practice with real cases daily! 240
          </p>
        </div>
        <div className="flex flex-col">
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
              className="text-sm bg-blue-main text-white py-2 px-8 rounded mt-5 disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
