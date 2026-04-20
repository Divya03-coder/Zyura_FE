import MentorOverviewCard from "@/components/reusable/MentorOverviewCard";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  BookOpenText,
  NotepadText,
  Users,
  Video,
} from "lucide-react";
import TotalEarningsChart from "./TotalEarningsChart";
// import { useState } from "react";
import { Link } from "react-router-dom";
// import MentorQuestionBankCard from "./questionBank/MentorQuestionBankCard";
import MentorSessionCard from "./MentorSessionCard";
// import MentorAnswerAndSolutionCard from "./MentorAnswerAndSolutionCard";
import { useGetMentorOverviewQuery } from "@/store/features/mentor/mentor.api";

const MentorDashboard = () => {
  // const [category, setCategory] = useState<string>("advanced");
  const { data: overviewData, isLoading } = useGetMentorOverviewQuery({});

  const data = overviewData?.data;
  const overview = data?.overview;
  const earningsChart = data?.earningsChart || [];
  const toDayClasses = data?.toDayClasses || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl text-[#111827] font-semibold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-7">
        <MentorOverviewCard
          icon={BookOpenText}
          iconColor="text-blue-700"
          iconBg="bg-blue-100"
          value={overview?.questionBank || 0}
          bottomText="Question Bank"
        />
        <MentorOverviewCard
          icon={NotepadText}
          iconColor="text-fuchsia-700"
          iconBg="bg-fuchsia-100"
          value={overview?.totalQuestion || 0}
          bottomText="Total Question"
        />
        <MentorOverviewCard
          icon={Users}
          iconColor="text-violet-700"
          iconBg="bg-violet-50"
          value={overview?.totalStudent || 0}
          bottomText="Total Students"
        />
        <MentorOverviewCard
          icon={Video}
          iconColor="text-green-700"
          iconBg="bg-green-100"
          value={overview?.liveClasses || 0}
          bottomText="Live Classes"
        />
      </div>

      <div>
        <div className="flex items-center justify-between my-5">
          <p className="text-2xl text-[#111827] font-semibold">
            Total Earnings
          </p>
          {/* <div className="grid gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-[120px] bg-blue-main">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="basic">Day</SelectItem>
                <SelectItem value="clinical">Month</SelectItem>
                <SelectItem value="advanced">Year</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>

        <div className="mt-7 mb-12">
          <TotalEarningsChart data={earningsChart} />
        </div>
      </div>

      {/* Question Bank */}
      {/* <div className="mt-16">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-3">
          <div>
            <p className="text-2xl text-[#111827] font-semibold">
              Question bank
            </p>
          </div>
          <div>
            <Link to={""}>
              <p className="text-lg font-medium text-[#0076F5] underline">
                View All
              </p>
            </Link>
          </div>
        </div>

        <div>
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <MentorQuestionBankCard key={i} />
            ))}
        </div>
      </div> */}

      {/* Schedule Classes */}
      <div className="mt-16">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-7">
          <div>
            <p className="text-2xl text-[#111827] font-semibold">
              Schedule Classes
            </p>
          </div>
          <div>
            <Link to={"/mentor/recent-transaction"}>
              <p className="text-lg font-medium text-[#0076F5] underline">
                View All
              </p>
            </Link>
          </div>
        </div>

        {toDayClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {toDayClasses.map((session: any) => (
              <MentorSessionCard key={session._id} session={session} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-gray-500">
            No classes scheduled for today.
          </div>
        )}
      </div>

      {/* Answers & Solutions */}
      {/* <div className="mt-16">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-8">
          <div className="flex items-start gap-3">
            <MessageCircle />
            <div>
              <p className="text-lg font-medium">Answers & Solutions</p>
              <p className="text-lg font-medium">
                Share your knowledge and help fellow students
              </p>
            </div>
          </div>
          <div>
            <Link to={"/mentor/recent-transaction"}>
              <p className="text-lg font-medium text-[#0076F5] underline">
                View All
              </p>
            </Link>
          </div>
        </div>

        <MentorAnswerAndSolutionCard />
      </div> */}
    </div>
  );
};

export default MentorDashboard;
