import { useState } from "react";
import {
  ArrowLeft,
  BadgeHelp,
  Languages,
  Link as LinkIcon,
  MapPin,
  MessageCircleQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectionRequestModal } from "./ConnectionRequestModal";
import { SessionSelectionModal } from "./SessionSelectionModal";
import { BreadcrumbItem } from "../../gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { Link, useParams } from "react-router-dom";
import { useGetSingleMentorQuery } from "@/store/features/mentor/mentor.api";
import { useGetMentorsQuestionWithAnswersQuery } from "@/store/features/mentor-dashboard/question/question.api";
import { IQuestion } from "@/store/features/mentor-dashboard/question/question.type";
import DashboardHeading from "@/components/reusable/DashboardHeading";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "All Mentor", link: "/dashboard/all-mentor" },
  { name: "Mentor Profile", link: "/dashboard/mentor-profile" },
];

export default function MentorProfile() {
  const { id } = useParams<{ id: string }>();
  const { data: mentorResponse, isLoading } = useGetSingleMentorQuery(id);
  const mentor = mentorResponse?.data?.profile_id;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeModal, setActiveModal] = useState<
    "session" | "connection" | null
  >(null);

  // Fetch questions for this mentor
  const { data: questionsData, isLoading: questionsLoading } =
    useGetMentorsQuestionWithAnswersQuery(mentor?._id, {
      skip: !mentor?._id,
    });
  const questions = questionsData || [];

  const handleBookSession = (sessionId: string) => {
    console.log("Session booked:", sessionId);
    setActiveModal(null);
  };

  const handleSendRequest = () => {
    // Your logic to send connection request
    console.log("Connection request sent!");
    setIsModalOpen(false);
  };

  // const [skills] = useState([
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "EHR/EMR",
  //   "Physician - Internal Medicine",
  //   "Physician - Internal Medicine",
  // ]);

  if (isLoading) {
    return <div className="p-6">Loading mentor profile...</div>;
  }

  if (!mentor) {
    return <div className="p-6">Mentor data not found.</div>;
  }

  return (
    <div className="my-6">
      {/* Breadcrumb */}
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <Link to="/dashboard/all-mentor" className="sm:mb-0">
        <button className="flex items-center gap-1 border border-gray-300 px-3 py-2 rounded cursor-pointer mb-2 -mt-3">
          <ArrowLeft className="w-5 h-4" /> Back
        </button>
      </Link>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-blue-900 h-52 w-full"></div>
        <div className="flex items-center justify-between -mt-24 px-10">
          <div className="flex items-center gap-5">
            <img
              src={
                mentor.profile_photo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYgW4c4mScN4iMaoZM2YNPO2iV7aaxtmDVg&s"
              }
              alt="mentor"
              className="w-28 h-28 rounded-full border-2 border-white shadow object-cover mt-6"
            />
            {mentor.profileVerification === "VERIFIED" && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Verified Mentor
              </span>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {/* <Button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-white border rounded-lg text-blue-700 font-medium hover:bg-blue-50 mb-7 cursor-pointer"
            >
              <Link />
              Connect
            </Button> */}
          </div>
        </div>

        <div className="p-6">
          <div className="md:flex items-center justify-between">
            {/* Profile Header */}
            <div className="max-w-lg flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-2xl text-[#0F172A] font-semibold mt-2">
                  {mentor?.firstName} {mentor?.lastName}
                </h1>
                <p className="text-[#0F172A] font-medium mb-1">
                  {mentor?.currentRole}
                </p>

                <div className="w-2/3">
                  <Button
                    onClick={() => setActiveModal("session")}
                    className="w-full bg-white border rounded text-blue-main font-medium hover:bg-blue-50 my-1 cursor-pointer"
                  >
                    <LinkIcon />
                    Book For Session
                  </Button>

                  <div className="flex items-center gap-1">
                    <Link
                      to={`/dashboard/ask-question/${mentor?.accountId}`}
                      className=""
                    >
                      <Button className=" bg-white border border-indigo-500 rounded text-violet-700 font-medium hover:bg-blue-50 my-1 cursor-pointer">
                        <MessageCircleQuestion />
                        Ask a Question
                      </Button>
                    </Link>
                    <Link to={""} className="">
                      <Button
                        onClick={() => setActiveModal("session")}
                        className=" bg-orange-400 border rounded text-white font-medium hover:bg-orange-600 my-1 cursor-pointer"
                      >
                        Massage
                      </Button>
                    </Link>
                  </div>
                </div>

                <p className="text-[#118577] hover:underline mb-5">
                  {mentor?.specialty} - {mentor?.hospitalOrInstitute}
                  <br />
                  {mentor?.professionalExperience} Years of Experience
                </p>
                <div className="mt-3 text-sm text-gray-600 space-y-3">
                  <p className="flex items-center gap-2 text-[#475569]">
                    <MapPin className="w-5 h-5 text-emerald-600" />{" "}
                    {mentor?.country}
                  </p>
                  <p className="flex items-center gap-2 text-[#475569]">
                    <Languages className="w-5 h-5 text-emerald-600" /> Speaks{" "}
                    {mentor?.languages?.join(", ") || "English"}
                  </p>
                  {/* <p className="flex items-center gap-2 text-[#475569]">
                    <Star className="w-5 h-5 text-emerald-600" />
                    5.0 (60 reviews)
                  </p>
                  <p className="flex items-center gap-2 text-[#475569]">
                    <Clock12 className="w-5 h-5 text-emerald-600" />
                    Active today
                  </p> */}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="max-w-96 mt-6">
              <h2 className="text-[#0F172A] font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {mentor?.skills
                  ?.slice(0, 5)
                  .map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 border border-slate-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                {mentor?.skills?.length > 5 && (
                  <span className="px-3 py-1 text-gray-700 text-sm border-b border-b-[#334155]">
                    + {mentor?.skills?.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="my-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg text-[#0F172A]  font-medium">
                Asked Question
              </h3>
              <Link
                to={`/dashboard/ask-question/${mentor?.accountId}`}
                className="text-sm font-semibold text-blue-main underline"
              >
                View All
              </Link>
            </div>
            <div className="border border-[#0000001A] p-4 rounded-[8px]">
              {questionsLoading ? (
                <p className="text-center py-4 text-gray-500">
                  Loading questions...
                </p>
              ) : questions.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-3 text-center md:text-left gap-6 border-b pb-4">
                    <div>
                      <DashboardHeading
                        title="Your Asked Question"
                        titleSize="text-base"
                        titleFont="font-normal"
                        titleColor="text-[#0A0A0A]"
                        description="Access your Question sessions, for getting your answer"
                        descColor="text-[#717182]"
                        descFont="text-sm"
                        className="space-y-2"
                      />
                    </div>
                    <p className="flex items-center gap-1 text-slate-800 cursor-pointer">
                      <BadgeHelp className="w-4 h-4" />
                      {questions.length} Question{questions.length !== 1 && "s"}
                    </p>
                  </div>
                  {questions.slice(0, 3).map((q: IQuestion) => (
                    <div key={q._id} className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-gray-800 font-medium text-sm">
                        Q: {q.question}
                      </p>
                      {q.answers && q.answers.length > 0 ? (
                        <div className="mt-2 ml-4 border-l-2 border-blue-200 pl-3">
                          <p className="text-gray-600 text-xs italic">
                            Latest Answer:
                          </p>
                          <p className="text-gray-700 text-sm">
                            {q.answers[0].answer}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-400 text-xs italic ml-4 mt-1">
                          No answers yet
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">
                    No questions asked to this mentor yet.
                  </p>
                  <Link
                    to={`/dashboard/ask-question/${mentor?.accountId}`}
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block font-medium"
                  >
                    Be the first to ask!
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Completed Session Section*/}
          {/* <div className="my-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg text-[#0F172A]  font-medium">
                Completed Session
              </h3>
            </div>
            <div className="border border-[#0000001A] p-4 rounded-[8px]">
              <div className="flex flex-col md:flex-row justify-between items-center mb-3 text-center md:text-left gap-6">
                <div>
                  <DashboardHeading
                    title="Recorded Session"
                    titleSize="text-base"
                    titleFont="font-normal"
                    titleColor="text-[#0A0A0A]"
                    description="Access your recorded study sessions, mentorship calls, and educational content"
                    descColor="text-[#4A5565]"
                    descFont="text-sm"
                    className="space-y-2"
                  />
                </div>
                <PrimaryButton
                  icon={<Video className="w-4 h-4" />}
                  iconPosition="left"
                  className="bg-white text-slate-800 border border-slate-300 cursor-pointer"
                >
                  6 Recordings
                </PrimaryButton>
              </div>
            </div>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array(4)
              .fill(null)
              .map(() => (
                <SessionCard />
              ))}
          </div> */}
        </div>

        <ConnectionRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleSendRequest}
        />

        <SessionSelectionModal
          isOpen={activeModal === "session"}
          onClose={() => setActiveModal(null)}
          onBookNow={handleBookSession}
          mentor={mentor}
        />
      </div>
    </div>
  );
}
