import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ForumsCard from "./forums/ForumsCard";

const ForumsPage = () => {
  return (
    <div>
      <DashboardHeading
        title="Forums"
        titleSize="text-xl"
        titleColor="text-[#0A0A0A]"
        description="Connect, learn, and grow with the medical education community"
        descSize="text-sm"
        descColor="text-[#4A5565]"
        className="mb-8 space-y-1"
      />

      <div className="md:flex gap-5 space-y-3 justify-between items-center">
        <div className="flex items-center gap-6">
          {/* Search Input with Icon */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by condition or keyword"
              className="w-full md:w-[450px] h-12 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>

          {/* Dropdown */}
          <select className="h-12 px-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
          </select>
        </div>
        <Link to={"/dashboard/create-new-discussion"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            icon={<Plus className="w-4 h-4" />}
            className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            New Discussion
          </PrimaryButton>
        </Link>
      </div>

      <div className="mt-12 space-y-5">
        {Array(3)
          .fill(null)
          .map(() => (
            <ForumsCard />
          ))}
      </div>
    </div>
  );
};

export default ForumsPage;
