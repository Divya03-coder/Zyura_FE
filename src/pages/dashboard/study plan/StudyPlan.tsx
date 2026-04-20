import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { BookOpenText, CalendarDays, Clock, Plus, Target } from "lucide-react";
import { Link } from "react-router-dom";
import TestOverviewCard from '@/components/reusable/TestOverviewCard';
import TopicCoverageCard from "./TopicCoverageCard";
import { Progress } from "@/components/ui/progress";
import TodaysSchedule from "./TodaysSchedule";

export default function StudyPlan() {
    return (
        <div>
            <div className="md:flex justify-between items-center">
                <DashboardHeading
                    title="Medical Study Platform"
                    titleSize="text-xl"
                    titleColor="text-black"
                    description="Welcome back, Omar! Ready to continue your Gastroenterology preparation?"
                    descColor="text-slate-700"
                    className="mt-12 mb-8"
                />
                <div className="flex items-center gap-6">
                    <Link to={"/dashboard/my-plan"}>
                        <PrimaryButton
                            bgType="solid"
                            bgColor="bg-teal-700"
                            className="h-12 mb-4 hover:bg-teal-700/90 hover:opacity-80 cursor-pointer">
                            My Plan
                        </PrimaryButton>
                    </Link>
                    <Link to={"/dashboard/create-study-plan"}>
                        <PrimaryButton
                            bgType="solid"
                            bgColor="bg-blue-btn-1"
                            iconPosition="left"
                            icon={<Plus className="w-4 h-4" />}
                            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer">
                            Create new plan
                        </PrimaryButton>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <TestOverviewCard
                    icon={Clock}
                    iconColor="text-blue-700"
                    iconBg="bg-blue-100"
                    topText="1.2 hr"
                    bottomText="Today's Study"
                />
                <TestOverviewCard
                    icon={Target}
                    iconColor="text-green-700"
                    iconBg="bg-[#DCFCE7]"
                    topText="60%"
                    bottomText="Avg.Score"
                />
                <TestOverviewCard
                    icon={BookOpenText}
                    iconColor="text-yellow-600"
                    iconBg="bg-[#FFEDD4]"
                    topText="2/5"
                    bottomText="Topic Complete"
                />
                <TestOverviewCard
                    icon={CalendarDays}
                    iconColor="text-purple-700"
                    iconBg="bg-[#F3E8FF]"
                    topText="10"
                    bottomText="Days to Exam"
                />
            </div>


            <div className="md:flex items-center gap-5">
                <div className="w-full bg-white border border-slate-300 px-5 py-8 mt-10 rounded-[8px]">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <p className="bg-violet-100 p-3 rounded-[8px]">
                                <BookOpenText className="text-violet-800" />
                            </p>
                            <h3 className="text-lg font-medium text-[#111827]">MCQ Practice Sessions</h3>
                        </div>
                        <p className="text-sm font-medium text-[#1D4ED8] bg-[#DBEAFE] px-2 py-1 rounded-full">Open Module</p>
                    </div>

                        <p className="text-xl text-[#6B7280] mt-7">Take practice quizzes and track your progress</p>
                </div>
                <div className="w-full bg-white border border-slate-300 px-5 py-8 mt-10 rounded-[8px]">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <p className="bg-violet-100 p-3 rounded-[8px]">
                                <BookOpenText className="text-violet-800" />
                            </p>
                            <h3 className="text-lg font-medium text-[#111827]">MCQ Practice Sessions</h3>
                        </div>
                        <p className="text-sm font-medium text-[#1D4ED8] bg-[#DBEAFE] px-2 py-1 rounded-full">Open Module</p>
                    </div>

                        <p className="text-xl text-[#6B7280] mt-7">Take practice quizzes and track your progress</p>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-10">
                <div className="col-span-2 bg-white border border-slate-300 rounded-[8px] pt-7 px-6">
                    <TodaysSchedule />
                </div>
                <div className="col-span-1">
                    <TopicCoverageCard />

                    {/* Study Progress */}
                    <div className="bg-white border border-slate-300 p-4 mt-10 rounded-[8px]">
                        <h3 className="text-[#111827] font-medium">Study Progress</h3>
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-[#4B5563]">Overall Progress</p>
                                <p className="text-sm text-black">18%</p>
                            </div>
                            <Progress value={18} className="[&>div]:bg-[#2563EB]" />
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-[#4B5563]">This Week</p>
                                <p className="text-sm text-black">60%</p>
                            </div>
                            <Progress value={60} className="[&>div]:bg-[#22C55E]" />
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-[#4B5563]">Study Hours</p>
                                <p className="text-sm font-medium text-black">8.5 / 21 hrs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
