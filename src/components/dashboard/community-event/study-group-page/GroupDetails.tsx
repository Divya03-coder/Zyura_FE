import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import { Link } from "react-router-dom";
import { ArrowLeft, Image, NotebookPen, Play, Users } from "lucide-react";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import GroupMessageSection from "./GroupMessageSection";
import { FaFilePdf } from "react-icons/fa6";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { FileUploadModal } from "./FileUploadModal";
import { useState } from "react";

export default function GroupDetails() {
  const [open, setOpen] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Group details", link: "/dashboard/group-details" },
  ];

  return (
    <div className="my-6">
      {/* Breadcrumb */}
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex items-center gap-3">
        <Link to={"/dashboard/all-communities"} className="mb-20">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="Cardiology study group"
          titleSize="text-xl"
          description="Connect, learn, and grow with the medical education community"
          className="mb-12 space-y-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="col-span-2">
          <GroupMessageSection />
        </div>
        <div className="col-span-1 border border-[#E5E7EB] rounded-[12px] p-5 pr-0">
          <div className="flex items-center gap-1">
            <Users className="w-6 h-6" />
            <p className="text-[#111827] font-medium">Students</p>
          </div>

          <div className="mt-7 space-y-4 h-[500px] overflow-y-auto pr-4">
            {Array(25)
              .fill(null)
              .map((_, idx, arr) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between pb-3 ${
                    idx !== arr.length - 1 ? "border-b border-b-slate-300" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                      }
                      alt="user image"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm text-gray-600">Olivia Rhye</p>
                  </div>
                  <p className="text-xs text-black">poland</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="border border-slate-300 p-6 rounded-[12px] mt-6">
        <div>
          <div className="flex items-center gap-2">
            <NotebookPen />
            <p className="text-[#111827] font-medium">Shared Notes / Files</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-300 rounded-[8px]">
            <div className="flex items-center gap-3">
              <FaFilePdf className="text-[#EF4444]" />
              <p className="text-sm font-medium text-[#111827]">
                OSCE_Respiratory_Notes.pdf
              </p>
            </div>
            <p className="text-sm text-[#2563EB] font-medium">Download</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-300 rounded-[8px]">
            <div className="flex items-center gap-3">
              <div className=" bg-[#3B82F6] p-1 rounded-full">
                <Play className="text-white w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-[#111827]">
                Cardiovascular_Mock_Session.mp4
              </p>
            </div>
            <p className="text-sm text-[#2563EB] font-medium">Watch</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-300 rounded-[8px]">
            <div className="flex items-center gap-3">
              <Image className="w-5 h-5" />
              <p className="text-sm font-medium text-[#111827]">
                Summary_CheatSheet.png
              </p>
            </div>
            <p className="text-sm text-[#2563EB] font-medium">Preview</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 mt-10 md:mt-20">
          <PrimaryButton
            onClick={() => setOpen(true)}
            className="w-full md:w-80 text-white text-sm font-medium bg-teal-700 hover:bg-teal-800 cursor-pointer"
          >
            Upload a file
          </PrimaryButton>
          <PrimaryButton className="w-full md:w-80 text-white text-sm font-medium bg-red-700 hover:bg-red-800 cursor-pointer">
            Leave Group
          </PrimaryButton>
        </div>
      </div>

      <FileUploadModal open={open} setOpen={setOpen} />
    </div>
  );
}
