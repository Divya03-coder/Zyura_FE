// import DashboardHeading from "@/components/reusable/DashboardHeading";
// import PrimaryButton from "@/components/reusable/PrimaryButton";
// import { BookOpen, BookUser, Brain, Briefcase, Notebook, Search, Target } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import ResidencyGuideCard from "./ResidencyGuideCard";
// import AllResourceTab from "./AllResourceTab";
// import ResourceCard from "@/components/reusable/ResourceCard";

// export default function CareerResourcePage() {

//     const [activeTab, setActiveTab] = useState("all")
//     const tabs = [
//         { id: "all", label: "All Resources", icon: <BookOpen /> },
//         { id: "roadmap", label: "Residency Roadmap", icon: <BookUser /> },
//         { id: "cv", label: "CV Template", icon: <Target /> },
//         { id: "statement", label: "Personal Statement", icon: <Notebook /> },
//         { id: "research", label: "Research", icon: <Brain /> },
//         { id: "preparation", label: "Interview preparation", icon: <BookOpen /> },
//     ]

//     return (
//         <div>
//             <div className="flex justify-between items-center">
//                 <DashboardHeading
//                     title="Career Resources"
//                     titleSize="text-xl"
//                     titleColor="text-[#0A0A0A]"
//                     description="Access comprehensive study materials and career planning tools"
//                     descColor="text-[#4A5565]"
//                     descFont="text-sm"
//                     className="mt-12 mb-8"
//                 />
//                 <Link to={"/dashboard/my-resources"}>
//                     <PrimaryButton
//                         bgType="solid"
//                         bgColor="bg-blue-btn-1"
//                         className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer">
//                         My Resources
//                     </PrimaryButton>
//                 </Link>
//             </div>

//             <div>
//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="Search resources..."
//                         className="w-full md:w-[450px] h-10 pl-10 pr-4 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
//                 </div>
//                 <PrimaryButton
//                     iconPosition="left"
//                     icon={<Briefcase className="w-4 h-4" />}
//                     className="mt-8 cursor-pointer hover:bg-blue-btn-1"
//                 >
//                     Career Guidance
//                 </PrimaryButton>
//             </div>

//             {/* Tab */}
//             <div>
//                 <DashboardHeading
//                     title="Career Guidance"
//                     titleSize="text-sm"
//                     titleColor="text-[#0A0A0A]"
//                     description="Plan your medical career with actionable resources and guidance"
//                     descColor="text-[#4A5565]"
//                     descFont="text-sm"
//                     className="mt-12 mb-8"
//                 />
//             </div>
//             <div>
//                 {/* Tab Button */}
//                 <div className="flex flex-wrap items-center gap-3">
//                     {
//                         tabs.map(tab => <button onClick={() => setActiveTab(tab.id)}
//                             className={`flex items-center gap-1 text-lg text-[#0A0A0A] p-3 border border-slate-300 rounded cursor-pointer ${activeTab === tab.id && "bg-blue-main text-white border-transparent"}`}
//                         >{tab.icon}{tab.label}</button>)
//                     }
//                 </div>
//                 {/* Tab Content */}
//                 <div className="mt-12">
//                     <ResidencyGuideCard />
//                     <div className="mt-12">
//                         {
//                             activeTab === "all" && (
//                                 <>
//                                     <AllResourceTab />
//                                 </>
//                             )
//                         }
//                         {
//                             activeTab === "roadmap" && (
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {Array.from({ length: 6 }).map(() => (
//                                         <ResourceCard
//                                             title="Medical Residency Application Guide - USA"
//                                             description="Complete roadmap for applying to US residency programs including ERAS, USMLE, and visa requirements"
//                                             categories={["USA", "Residency Disease"]}
//                                             downloads="2,847"
//                                             buttonText="Go to Resources"
//                                             buttonLink="#"
//                                         />
//                                     ))}
//                                 </div>
//                             )
//                         }
//                         {
//                             activeTab === "cv" && (
//                                 <p>This is CV Tab</p>
//                             )
//                         }
//                         {
//                             activeTab === "statement" && (
//                                 <p>This is Statement Tab</p>
//                             )
//                         }
//                         {
//                             activeTab === "research" && (
//                                 <p>This is Research Tab</p>
//                             )
//                         }
//                         {
//                             activeTab === "preparation" && (
//                                 <p>This is Preparation Tab</p>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { BookOpen, Briefcase, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
// import ResidencyGuideCard from "./ResidencyGuideCard";
// import AllResourceTab from "./AllResourceTab";
import ResourceCard from "@/components/reusable/ResourceCard";
import { CareerResource } from "@/types/careerResource";
import { useGetAllCareerResourcesQuery } from "@/store/features/careerResources/careerResources.api";
import GlobalLoader2 from "@/common/GlobalLoader2";

// assume already fetched via RTK / react-query / fetch
// import { useGetCareerResourcesQuery } from "@/store/api/careerApi";

export default function CareerResourcePage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const { data, isLoading: isLoadingResources } =
    useGetAllCareerResourcesQuery();

  const resources: CareerResource[] = data?.data ?? [];

  // derive tabs dynamically (DESIGN SAME)
  const dynamicTabs = useMemo(() => {
    const categories = Array.from(new Set(resources.map((r) => r.category)));

    return [
      { id: "all", label: "All Resources", icon: <BookOpen /> },
      ...categories.map((cat) => ({
        id: cat,
        label: cat,
        icon: <BookOpen />,
      })),
    ];
  }, [resources]);

  // filter by tab
  const filteredResources =
    activeTab === "all"
      ? resources
      : resources.filter((r) => r.category === activeTab);

  return (
    <div>
      {/* HEADER — unchanged */}
      <div className="flex justify-between items-center">
        <DashboardHeading
          title="Career Resources"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="Access comprehensive study materials and career planning tools"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-12 mb-8"
        />
        <Link to={"/dashboard/my-resources"}>
          <PrimaryButton
            bgType="solid"
            bgColor="bg-blue-btn-1"
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            My Resources
          </PrimaryButton>
        </Link>
      </div>

      {/* SEARCH — unchanged */}
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full md:w-[450px] h-10 pl-10 pr-4 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        </div>
        <PrimaryButton
          iconPosition="left"
          icon={<Briefcase className="w-4 h-4" />}
          className="mt-8 cursor-pointer hover:bg-blue-btn-1"
        >
          Career Guidance
        </PrimaryButton>
      </div>

      {/* TITLE — unchanged */}
      <DashboardHeading
        title="Career Guidance"
        titleSize="text-sm"
        titleColor="text-[#0A0A0A]"
        description="Plan your medical career with actionable resources and guidance"
        descColor="text-[#4A5565]"
        descFont="text-sm"
        className="mt-12 mb-8"
      />

      {/* TABS — SAME DESIGN, NOW DYNAMIC */}
      <div className="flex flex-wrap items-center gap-3">
        {dynamicTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1 text-lg text-[#0A0A0A] p-3 border border-slate-300 rounded cursor-pointer ${
              activeTab === tab.id &&
              "bg-blue-main text-white border-transparent"
            }`}
          >
            {/* {tab.icon} */}
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT — SAME GRID & CARD DESIGN */}
      <div className="mt-12">
        {/* <ResidencyGuideCard /> */}

        {isLoadingResources ? (
          <GlobalLoader2 />
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource._id}
                title={resource.resourceName}
                description={resource.description}
                categories={resource.tags}
                downloads="0"
                buttonText="Go to Resource"
                buttonLink={resource.mediaLink} 
                category={resource.category} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
