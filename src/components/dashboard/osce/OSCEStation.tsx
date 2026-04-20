/* eslint-disable @typescript-eslint/no-explicit-any */
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import OSCECard from "@/components/dashboard/osce/OSCECard";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
// import PrimaryButton from "@/components/reusable/PrimaryButton";
import { useGetAllOsceQuery } from "@/store/features/adminDashboard/ContentResources/Osce/osceApi";
import { Search } from "lucide-react";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { OsceItem } from "@/store/features/adminDashboard/ContentResources/Osce/types/getOsce";
import GlobalLoader2 from "@/common/GlobalLoader2";

export default function OSCEStation() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "OSCE Station", link: "/dashboard/osce" },
  ];

  const { data: osce, isLoading: isOsceLoading } = useGetAllOsceQuery({});
  const osceList: OsceItem[] = osce?.data?.data || [];

  const [search, setSearch] = useState("");

  const filtered = osceList.filter((item: any) => {
    const text = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(text) ||
      item.subject?.toLowerCase().includes(text) ||
      item.system?.toLowerCase().includes(text) ||
      item.topic?.toLowerCase().includes(text) ||
      item.subtopic?.toLowerCase().includes(text)
    );
  });

  const handleWatchTutorial = (tutorial: string[]) => {
    console.log("Tutorial list:", tutorial);
  };

  const handlePractice = (id: string) => {
    console.log("Practice for:", id);
  };

  return (
    <div className="my-6 px-2">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="flex items-start gap-3">
        {/* <Link to={"/dashboard/osce"} className="mt-1.5">
          <ArrowLeft />
        </Link> */}
        <DashboardHeading
          title="OSCE station"
          titleSize="text-xl"
          description="Choose a station to practise your clinical skills"
          className="mb- space-y-1"
        />
      </div>

      {/* Search Box */}
      <div className="relative mt-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e,g cardiovascular"
          className="w-full h-11 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
      </div>

      <div className="flex items-center justify-between mt-12">
        <h3 className="text-xl font-semibold text-slate-800">History</h3>
        {/* <PrimaryButton
          icon={<Filter className="w-4 h-4" />}
          bgType="solid"
          iconPosition="left"
          bgColor="bg-blue-btn-1"
          className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
        >
          Filter
        </PrimaryButton> */}
      </div>

      {/* OSCE Cards */}
      {isOsceLoading ? (
        <GlobalLoader2 />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((item: any) => (
            <OSCECard
              key={item._id}
              id={item._id}
              title={item.name}
              subtitle={item.subject}
              description={item.description}
              scenario={item.scenario}
              steps={`${item.tasks.length} steps`}
              videos={`${item.tutorial.length} videos`}
              duration={item.timeLimit}
              isComplete={item.isComplete}
              onWatchTutorial={() => handleWatchTutorial(item.tutorial)}
              onPractice={() => handlePractice(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
