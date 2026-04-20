import DashboardHeading from "@/components/reusable/DashboardHeading";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import RecentDownloadsTab from "../downloadNotes/RecentDownloadsTab";

export default function MyResource() {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link to={'/dashboard/resources'} className="mb-7">
                        <ArrowLeft /></Link>
                    <DashboardHeading
                        title="Downloaded Resources"
                        titleSize="text-xl"
                        description="Access comprehensive study materials and career planning tools"
                        className="mt-12 mb-12 space-y-1"
                    />
                </div>
                {/* <Link to={"/dashboard/"}>
                    <PrimaryButton
                        bgType="solid"
                        bgColor="bg-blue-btn-1"
                        className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer">
                        My Resources
                    </PrimaryButton>
                </Link> */}
            </div>

            <div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search resources..."
                        className="w-full md:w-[450px] h-10 pl-10 pr-4 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                </div>
                {/* <PrimaryButton
                    iconPosition="left"
                    icon={<Briefcase className="w-4 h-4" />}
                    className="mt-8"
                >
                    Career Guidance
                </PrimaryButton> */}
            </div>

            <div>
                <RecentDownloadsTab />
            </div>
        </div>
    )
}
