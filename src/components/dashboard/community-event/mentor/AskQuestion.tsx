/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { ArrowLeft, BadgeHelp, SendHorizonal } from "lucide-react";
import {
  useGetMentorsQuestionWithAnswersQuery,
  useSocialQuestionPostMutation,
} from "@/store/features/mentor-dashboard/question/question.api";
import {
  IAnswer,
  IQuestion,
} from "@/store/features/mentor-dashboard/question/question.type";
import { Link, useParams } from "react-router-dom";
import GlobalLoader from "@/common/GlobalLoader";
import { toast } from "sonner";
import { useGetSingleMentorQuery } from "@/store/features/mentor/mentor.api";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Mentor", link: "/dashboard/mentorship" },
  { name: "Ask Question", link: "/dashboard/ask-question" },
];

export default function AskQuestion() {
  const { id: mentorAccountId } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<string>("");

  // Fetch mentor profile to get the correct profileId
  const { data: mentorResponse } = useGetSingleMentorQuery(mentorAccountId, {
    skip: !mentorAccountId,
  });
  const mentorProfileId = mentorResponse?.data?.profile_id?._id;

  const { data, isLoading, refetch } = useGetMentorsQuestionWithAnswersQuery(
    mentorProfileId,
    {
      skip: !mentorProfileId,
    }
  );

  const [socialQuestionPost, { isLoading: isPosting }] =
    useSocialQuestionPostMutation();
  const questions = data || [];

  const handleCreateQuestion = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question!");
      return;
    }

    if (!mentorProfileId) {
      toast.error("Mentor profile not found!");
      return;
    }

    try {
      await socialQuestionPost({
        question,
        mentorAccountId: mentorProfileId,
      }).unwrap();
      setQuestion("");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to post question");
      console.error("Error posting question:", error);
    }
  };

  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="mt-6 mb-8 px-2">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex items-start gap-1">
        <Link
          to={`/dashboard/mentor-profile/${mentorAccountId}`}
          className="sm:mb-0"
        >
          <ArrowLeft className="" />
        </Link>
        <DashboardHeading
          title="Ask Question"
          titleColor="text-[#0F172A]"
          titleSize="text-base"
          titleFont="font-medium"
          description="Connect, learn, and grow with the medical education community"
          descColor="text-[#4A5565]"
          descSize="text-sm"
          className=""
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 mt-5 mb-3">
        <div>
          <DashboardHeading
            title="Your Asked Questions"
            titleSize="text-base"
            titleFont="font-semibold"
            titleColor="text-[#0A0A0A]"
            description=""
          />
        </div>
        <p className="flex items-center gap-1 text-slate-800 cursor-pointer">
          <BadgeHelp className="w-4 h-4" />
          {questions.length} Question{questions.length !== 1 && "s"}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {questions.map((question: IQuestion, idx: number) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <p className="text-slate-800 font-medium mb-4">
              Q: {question?.question}
            </p>

            <div className="space-y-4">
              {question.answers && question.answers.length > 0 ? (
                question.answers.map((ans: IAnswer) => (
                  <div
                    key={ans._id}
                    className="flex items-start gap-3 bg-slate-50 rounded-lg p-3"
                  >
                    <img
                      src={
                        ans.photo ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {ans.name || "Anonymous"}
                      </p>
                      <p className="text-gray-600 text-sm">{ans.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No answers yet</p>
              )}
            </div>
          </div>
        ))}

        <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm mt-8">
          <p className="text-slate-800 font-semibold mb-4">
            Ask a New Question
          </p>

          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleCreateQuestion();
                }
              }}
              placeholder="Type your question..."
              className="w-full h-16 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isPosting}
            />

            {isPosting ? (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 animate-spin">
                <SendHorizonal className="w-5 h-5 opacity-70" />
              </div>
            ) : (
              <SendHorizonal
                onClick={handleCreateQuestion}
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer transition ${
                  question.trim()
                    ? "text-blue-600 hover:text-blue-800"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
