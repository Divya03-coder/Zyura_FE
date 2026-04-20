import profileImage from "@/assets/dashboard/profileImage.png";
import profileBg from "@/assets/dashboard/profileBg.png";

import blueBadge from "@/assets/dashboard/blue-badge.png";
import oranBadge from "@/assets/dashboard/orange-badge.png";
import osce from "@/assets/dashboard/osce.png";
import dailyStreak from "@/assets/dashboard/daily-streak.png";
import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { FileBadge2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";

export default function StudentProfile() {
  const user = useSelector(selectUser);

  return (
    <div className="my-8 md:my-10">
      {/* Background Image */}
      <img src={profileBg} alt="Profile Background" className="w-full" />

      {/* Bottom Boxes (stick 50px below image) */}
      <div className=" grid md:grid-cols-3 gap-4 md:gap-6 justify-between px-1 -mt-5">
        <div className="bg-white border border-slate-300 rounded-[8px] p-4 md:p-6">
          <div className="text-center">
            <img
              src={user?.profile?.profile_photo || profileImage}
              alt="Profile"
              className="mx-auto w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
            />
            <h3 className="text-xl font-semibold text-black mt-2">
              {user?.profile?.firstName} {user?.profile?.lastName}
            </h3>
            <p className="text-slate-700">
              {user?.account?.role === "STUDENT"
                ? user?.profile?.studentType || "Medical Student"
                : user?.profile?.professionName || "Professional"}
            </p>
          </div>

          <div className="mt-6 space-y-4 ml-7 ">
            {user?.account?.role === "STUDENT" ? (
              <>
                <p>University : {user?.profile?.university || "N/A"}</p>
                <p>Year of Study : {user?.profile?.year_of_study || "N/A"}</p>
                <p>
                  Preparing For :{" "}
                  {user?.profile?.preparingFor?.length
                    ? user.profile.preparingFor
                        .map((exam) => exam.examName)
                        .join(", ")
                    : "N/A"}
                </p>
              </>
            ) : (
              <>
                <p>Institution : {user?.profile?.institution || "N/A"}</p>
                <p>Experience : {user?.profile?.experience || "N/A"}</p>
                <p>Post Graduate : {user?.profile?.post_graduate || "N/A"}</p>
              </>
            )}
          </div>
          <Link to={"/dashboard/edit-student-profile"}>
            <Button className="w-full bg-blue-main hover:bg-blue-600 h-auto py-3 cursor-pointer mt-4">
              Personal Information
            </Button>
          </Link>
        </div>

        {/* Badge Earn */}
        <div className="bg-white border border-slate-300 rounded-[8px] px-4 pt-5 pb-4">
          <div
            className={`flex items-center gap-2 text-xl font-medium border-b border-b-slate-300 pb-2`}
          >
            <img src={blueBadge} alt="" />
            <h2 className="text-slate-800">Badge Earn</h2>
          </div>

          <div className="flex items-center justify-between mt-3 border border-slate-300 py-5 pl-5 pr-2 rounded-[8px]">
            <div className={`flex items-center gap-2 text-xl font-medium`}>
              <img src={oranBadge} alt="" />
              <h2 className="text-[#F99916]">Quiz Master</h2>
            </div>
            <p className="text-slate-700">90%+ on 10 quizzes</p>
          </div>

          <div className="flex items-center justify-between mt-3 border border-slate-300 py-5 pl-5 pr-2 rounded-[8px]">
            <div className={`flex items-center gap-2 text-xl font-medium`}>
              <img src={osce} alt="" />
              <h2 className="text-slate-800">Osce Hero</h2>
            </div>
            <p className="text-slate-700">90%+ on 10 quizzes</p>
          </div>

          <div className="flex items-center justify-between mt-3 border border-slate-300 py-5 pl-5 pr-2 rounded-[8px]">
            <div className={`flex items-center gap-2 text-xl font-medium`}>
              <img src={dailyStreak} alt="" />
              <h2 className="text-slate-800">Daily Streak</h2>
            </div>
            <p className="text-slate-700">90%+ on 10 quizzes</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white border border-slate-300 rounded-[8px] px-7 pt-6">
          <PrimaryHeading
            title="Achievements"
            icon={<FileBadge2 size={26} className="text-blue-main" />}
            iconColor="text-yellow-500"
          />
          <p className="bg-[#1D4ED80F] py-3 px-4 rounded mt-6">Scoreboard</p>

          <div className="mt-9 space-y-9 mb-4">
            <div className="flex items-center justify-between">
              <p className="">Complete quiz</p>
              <p>100</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="">Complete Flashcard</p>
              <p>200</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="">Complete Case</p>
              <p>50</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="">Badge Earn</p>
              <p>10</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-7">
        {/* Quiz Performance */}
        <div className="md:col-span-2 border border-slate-300 rounded-[8px] py-6">
          <PrimaryHeading
            title="Quiz Performance"
            icon={<FileBadge2 size={24} />}
            iconColor="text-yellow-500"
            className="ml-6"
          />
          <table className="w-full border-collapse mt-6">
            <thead>
              <tr className="bg-slate-300">
                <th className="text-left text-[#374151] font-bold px-4 py-3">
                  Quiz Name
                </th>
                <th className="text-left text-[#374151] font-bold px-4 py-3">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-b-slate-400">
                <td className="text-[#374151] px-4 py-4">
                  Cardiovascular System
                </td>
                <td className="flex items-center gap-2 px-4 py-4">
                  <div className="relative w-40 h-2 bg-red-600 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-green-500"
                      style={{ width: `96%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">48/50</span>
                </td>
              </tr>

              <tr className="border-b border-b-slate-400">
                <td className="text-[#374151] px-4 py-4">Anatomy System</td>
                <td className="flex items-center gap-2 px-4 py-4">
                  <div className="relative w-40 h-2 bg-red-600 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-green-500"
                      style={{ width: `80%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">40/50</span>
                </td>
              </tr>

              <tr>
                <td className="text-[#374151] px-4 py-4">
                  Microbiology System
                </td>
                <td className="flex items-center gap-2 px-4 py-4">
                  <div className="relative w-40 h-2 bg-red-600 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-green-500"
                      style={{ width: `60%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">30/50</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Activity in this Week */}
        {/* <div className="">
          <div className="border border-slate-300 rounded-[8px]">
            <PrimaryHeading
              title="Activity in this Week"
              icon={<Activity size={24} />}
              iconColor="text-blue-main"
              className="border-b border-b-slate-400 px-5 py-6"
            />

            <div className="flex items-center justify-center gap-2 mt-5">
              <AiFillFire className="w-9 h-9 text-[#E46417]" />
              <AiFillFire className="w-9 h-9 text-[#E46417]" />
              <AiFillFire className="w-9 h-9 text-[#E46417]" />
              <AiFillFire className="w-9 h-9 text-[#E46417]" />
              <AiFillFire className="w-9 h-9 text-[#E46417]" />
              <AiFillFire className="w-9 h-9 text-[#E46417]" />
              <AiFillFire className="w-9 h-9 text-blue-main" />
            </div>

            <div className="flex items-center justify-evenly mt-12 mb-6">
              <div className="flex items-center gap-3 text-lg text-[#111827]">
                In-Active
                <p className="w-4 h-4 rounded-full bg-slate-200"></p>
              </div>
              <div className="flex items-center gap-3 text-lg text-[#111827]">
                <p className="w-4 h-4 rounded-full bg-[#E46417]"></p>
                Active
              </div>
              <div className="flex items-center gap-3 text-lg text-[#111827]">
                <p className="w-4 h-4 rounded-full bg-blue-main"></p>
                Active
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-7 gap-7">
        {/* Clinical Case Performance */}
        {/* <div className="col-span-2 bg-white p-10 border border-slate-300 rounded-[8px]">
          <div className="flex items-center justify-between mb-10">
            <PrimaryHeading
              title="Clinical Case Performance"
              icon={<BriefcaseMedical size={24} />}
              iconColor="text-yellow-500"
              className="ml-6"
            />

            <button className="flex items-center gap-2 text-sm text-green-600">
              <CircleCheck />
              Excellent Work
            </button>
          </div>

          <div className="flex items-center justify-between">
            <CircularProgress
              correctPercentage={85}
              incorrectPercentage={15}
              label="Diagnostic Accuracy"
            />

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <h2 className="text-xl font-medium text-zinc-700">
                  Diagnostic Accuracy
                </h2>
                <div className="flex items-center gap-6">
                  <Progress value={90} />
                  90%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <h2 className="text-xl font-medium text-zinc-700">
                  Treatment Selection
                </h2>
                <div className="flex items-center gap-6">
                  <Progress value={90} />
                  90%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <h2 className="text-xl font-medium text-zinc-700">
                  Risk Assessment
                </h2>
                <div className="flex items-center gap-6">
                  <Progress value={90} />
                  90%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <h2 className="text-xl font-medium text-zinc-700">
                  Follow-up Planning
                </h2>
                <div className="flex items-center gap-6">
                  <Progress value={90} />
                  90%
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Strong Areas */}
        {/* <div className="max-w-[700px] bg-white border border-slate-300 p-4 rounded-[8px]">
          <p className="flex items-center gap-2 text-lg font-medium text-[#111827]">
            <BrainCog className="w-6 h-6 text-blue-main" /> Areas to Improve
          </p>
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="min-w-[150px]">
                <h4 className="text-black font-medium">Cardiology</h4>
                <p>65% accuracy</p>
              </div>
              <Progress value={60} className="[&>div]:bg-[#7F56D9]" />
            </div>

            <div className="flex items-center justify-between">
              <div className="min-w-[150px]">
                <h4 className="text-black font-medium">Immunology</h4>
                <p>65% accuracy</p>
              </div>
              <Progress value={60} className="[&>div]:bg-[#7F56D9]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="min-w-[150px]">
                <h4 className="text-black font-medium">Neurology</h4>
                <p>65% accuracy</p>
              </div>
              <Progress value={60} className="[&>div]:bg-[#7F56D9]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="min-w-[150px]">
                <h4 className="text-black font-medium">Immunology</h4>
                <p>65% accuracy</p>
              </div>
              <Progress value={60} className="[&>div]:bg-[#7F56D9]" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
