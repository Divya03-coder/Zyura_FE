import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { BreadcrumbItem } from "../gamified-learning/types";
import drugImg from "@/assets/dashboard/drug img.png";
import { FaBookmark, FaShare } from "react-icons/fa";

export default function YourDrugCard() {
    const breadcrumbs: BreadcrumbItem[] = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Diagram Explorer", link: "/dashboard/diagram-explorer" },
    ];

    return (
        <div className="my-6">
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <DashboardHeading
                title="Diagram Explorer"
                titleSize="text-xl"
                titleColor="text-[#0A0A0A]"
                description="Concept for Medical Learning Platform"
                descColor="text-[#4A5565]"
                descFont="text-sm"
                className="mb-8"
            />

            <h3 className="font-medium mb-5">Your Drug Card</h3>
            <div className="space-y-5">
                {Array(5)
                    .fill(null)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="border border-slate-300 px-5 py-6 rounded-lg"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                {/* Left section (Image + Text) */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                                    <div className="bg-[#DCFCE7] p-3 rounded-lg flex-shrink-0">
                                        <img
                                            src={drugImg}
                                            alt="drug"
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl text-[#111827] font-bold">
                                            Insulin Glargine
                                        </h3>
                                        <p className="text-[#4B5563] text-sm md:text-base">
                                            AI-Generated Drug Card
                                        </p>
                                    </div>
                                </div>

                                {/* Right section (Icons) */}
                                <div className="flex items-center gap-3 self-end sm:self-auto">
                                    <FaBookmark className="text-[#4B5563] text-lg md:text-xl cursor-pointer" />
                                    <FaShare className="text-[#4B5563] text-lg md:text-xl cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
