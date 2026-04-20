// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
// import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
// import DashboardHeading from "@/components/reusable/DashboardHeading";
// import PrimaryButton from "@/components/reusable/PrimaryButton";
// import { ClipboardList, Search } from "lucide-react";
// import { useEffect, useState } from "react";
// import { FaBookmark, FaShare } from "react-icons/fa";
// import img1 from "@/assets/dashboard/AI Recommendation.png"
// import { Link } from "react-router-dom";

// // Dummy JSON (simulate API)
// const dummyData: any = {
//     name: "Insulin Glargine",
//     subtitle: "AI-Generated Drug Card",
//     basicInfo: {
//         generic: "Insulin Glargine",
//         brands: "Lantus, Toujeo, Basaglar",
//         class: "Long-acting Insulin",
//     },
//     pharmacokinetics: {
//         onset: "1-2 hours",
//         peak: "No pronounced peak",
//         duration: "20-24 hours",
//     },
//     indications: [
//         "Type 1 Diabetes Mellitus",
//         "Type 2 Diabetes Mellitus (glycemic control)",
//     ],
//     mechanism:
//         "Recombinant human insulin analog that forms microprecipitates after subcutaneous injection, leading to slow and prolonged release with no pronounced peak. Binds to insulin receptors to lower blood glucose.",
//     adverseEffects: [
//         "Hypoglycemia",
//         "Injection site reactions",
//         "Lipodystrophy",
//     ],
//     nursingConsiderations: [
//         "Administer once daily at the same time each day (evening is common)",
//         "Do NOT mix with other insulins or solutions",
//         "Do NOT administer IV",
//         "Monitor blood glucose regularly",
//         "Educate patient on symptoms of hypoglycemia and management",
//         "Assess injection sites",
//     ],
//     relatedInsulin: [
//         { name: "Insulin Lispro", type: "Rapid-acting" },
//         { name: "NPH Insulin", type: "Intermediate-acting" },
//         { name: "Regular Insulin", type: "Short-acting" },
//     ],
//     aiRecommendations: [
//         {
//             title: "Skill Review Needed",
//             desc: "Review 'Subcutaneous Injection Technique' video tutorial",
//             action: "Take Quiz →",
//         },
//         {
//             title: "Case Study",
//             desc: "Apply knowledge in DKA management scenario",
//             action: "Start Case →",
//         },
//     ],
// };

// export default function DrugCard() {
//     const breadcrumbs: BreadcrumbItem[] = [
//         { name: "Dashboard", link: "/dashboard" },
//         { name: "OSCE Station", link: "/dashboard/osce" },
//     ];

//     const [drugData, setDrugData] = useState<any>(null);

//     useEffect(() => {
//         // Simulate API call
//         setTimeout(() => {
//             setDrugData(dummyData);
//         }, 500);
//     }, []);

//     if (!drugData) return <p className="text-center mt-10">Loading...</p>;

//     return (
//         <div className="my-6">
//             <Breadcrumb breadcrumbs={breadcrumbs} />
//             <div className="flex flex-col md:flex-row justify-between items-center mb-5 text-center md:text-left gap-6">
//                 <div >
//                     <DashboardHeading
//                         title="Search Drug"
//                         titleSize="text-xl"
//                         titleColor="text-[#000000]"
//                         description="Search by generic name, brand name, or drug class"
//                         descColor="text-slate-700"
//                         descFont="text-sm"
//                     />
//                 </div>
//                 <Link to={"/dashboard/your-drug-cards"}>
//                     <PrimaryButton>
//                         View Cards
//                     </PrimaryButton>
//                 </Link>
//             </div>
//             <div className="relative">
//                 <input
//                     type="text"
//                     placeholder="e,g cardiovascular"
//                     className="w-full h-11 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
//             </div>

//             <div className="max-w-6x mx-auto grid lg:grid-cols-3 gap-6 mt-10">
//                 {/* Left Section */}
//                 <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 space-y-6">
//                     {/* Title */}
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800">{drugData.name}</h1>
//                             <p className="text-sm text-gray-500">{drugData.subtitle}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <FaBookmark className="text-[#4B5563] text-xl cursor-pointer" />
//                             <FaShare className="text-[#4B5563] text-xl cursor-pointer" />
//                         </div>
//                     </div>

//                     {/* Basic Info */}
//                     <section className="border-l-4 border-blue-600 pl-3">
//                         <h2 className="font-semibold text-blue-600 flex items-center gap-2">
//                             Basic Information
//                         </h2>
//                         <ul className="mt-2 text-gray-700 text-sm space-y-1">
//                             <li>Generic Name: {drugData.basicInfo.generic}</li>
//                             <li>Brand Names: {drugData.basicInfo.brands}</li>
//                             <li>Drug Class: {drugData.basicInfo.class}</li>
//                         </ul>
//                     </section>

//                     {/* Pharmacokinetics */}
//                     <section className="border-l-4 border-purple-600 pl-3">
//                         <h2 className="font-semibold text-purple-600 flex items-center gap-2">
//                             Pharmacokinetics
//                         </h2>
//                         <ul className="mt-2 text-gray-700 text-sm space-y-1">
//                             <li>Onset: {drugData.pharmacokinetics.onset}</li>
//                             <li>Peak: {drugData.pharmacokinetics.peak}</li>
//                             <li>Duration: {drugData.pharmacokinetics.duration}</li>
//                         </ul>
//                     </section>

//                     {/* Indications */}
//                     <section className="border-l-4 border-green-600 pl-3">
//                         <h2 className="font-semibold text-green-600">Indications</h2>
//                         <ul className="list-disc list-inside text-sm mt-2 text-gray-700 space-y-1">
//                             {drugData.indications.map((ind: any, i: number) => (
//                                 <li key={i}>{ind}</li>
//                             ))}
//                         </ul>
//                     </section>

//                     {/* Mechanism */}
//                     <section className="border-l-4 border-orange-600 pl-3">
//                         <h2 className="font-semibold text-orange-600">Mechanism of Action</h2>
//                         <p className="text-sm mt-2 text-gray-700">{drugData.mechanism}</p>
//                     </section>

//                     {/* Adverse Effects */}
//                     <section className="border-l-4 border-red-600 pl-3">
//                         <h2 className="font-semibold text-red-600">Key Adverse Effects</h2>
//                         <ul className="list-disc list-inside text-sm mt-2 text-gray-700 space-y-1">
//                             {drugData.adverseEffects.map((effect: any, i: number) => (
//                                 <li key={i}>{effect}</li>
//                             ))}
//                         </ul>
//                     </section>

//                     {/* Nursing Considerations */}
//                     <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
//                         <h2 className="font-semibold text-yellow-700 flex items-center gap-2">
//                             <ClipboardList size={18} /> Nursing Considerations
//                         </h2>
//                         <ul className="list-disc list-inside text-sm mt-2 text-[#854D0E] space-y-1">
//                             {drugData.nursingConsiderations.map((item: any, i: number) => (
//                                 <li key={i}>{item}</li>
//                             ))}
//                         </ul>
//                     </section>
//                 </div>

//                 {/* Right Section */}
//                 <div className="space-y-6">
//                     {/* Related Insulin Types */}
//                     <div className="bg-white rounded-xl shadow p-6">
//                         <h2 className="text-lg font-semibold text-[#111827] mb-3">
//                             Related Insulin Types
//                         </h2>
//                         <div className="space-y-2">
//                             {drugData.relatedInsulin.map((ins: any, i: number) => (
//                                 <div
//                                     key={i}
//                                     className="p-3 rounded-lg bg-[#F9FAFB] hover:bg-gray-100 transition"
//                                 >
//                                     <p className="font-medium text-gray-700">{ins.name}</p>
//                                     <p className="text-sm text-gray-500">{ins.type}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* AI Recommendations */}
//                     <div className="bg-gradient-to-r from-[#FAF5FF] to-[#FDF2F8] rounded-xl shadow p-6">
//                         <div className="flex items-center gap-3">
//                             <img src={img1} alt="" className="mb-3 bg-[#F3E8FF] p-3 px-2 rounded-lg" />
//                             <h2 className="font-semibold text-[#581C87] mb-3">
//                                 AI Recommendations
//                             </h2>
//                         </div>
//                         <div className="space-y-3">
//                             {drugData.aiRecommendations.map((rec: any, i: number) => (
//                                 <div
//                                     key={i}
//                                     className="p-3 bg-white rounded-lg border border-[#E9D5FF] shadow-sm hover:shadow-md transition"
//                                 >
//                                     <h3 className="font-medium text-[#6B21A8]">{rec.title}</h3>
//                                     <p className="text-sm text-[#7E22CE]">{rec.desc}</p>
//                                     <button className="mt-2 text-sm text-[#9333EA] font-semibold hover:underline">
//                                         {rec.action}
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

import { useState } from "react";
import {
  useGetDrugDetailsQuery,
  useSearchDrugQuery,
  useSearchOpenFdaQuery,
  useGetAdverseEventsQuery,
  useGetRecallsQuery,
} from "@/store/features/drugApi/drugApi";
import { Search, ClipboardList, AlertTriangle, Activity } from "lucide-react";
import { FaBookmark, FaShare } from "react-icons/fa";
import drugImg from "@/assets/dashboard/AI Recommendation.png";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import { Link } from "react-router-dom";
import PrimaryButton from "@/components/reusable/PrimaryButton";

export default function DrugCard() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "OSCE Station", link: "/dashboard/osce" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRxcui, setSelectedRxcui] = useState<string | null>(null);
  const [activeDrugName, setActiveDrugName] = useState("");

  // Search suggestions
  const { data: searchResults, isLoading: searchLoading } = useSearchDrugQuery(
    searchTerm,
    { skip: !searchTerm }
  );

  // Core drug details
  const { data: drugDetails, isLoading: detailsLoading } =
    useGetDrugDetailsQuery(selectedRxcui!, { skip: !selectedRxcui });

  // OpenFDA Label data
  const { data: openFdaData, isLoading: fdaLoading } = useSearchOpenFdaQuery(
    { name: activeDrugName, rxcui: selectedRxcui! },
    { skip: !selectedRxcui || !activeDrugName }
  );

  // Adverse Events data
  const { data: adverseEvents, isLoading: eventsLoading } = useGetAdverseEventsQuery(
    activeDrugName,
    { skip: !activeDrugName || !selectedRxcui }
  );

  // Recalls data
  const { data: recalls, isLoading: recallsLoading } = useGetRecallsQuery(
    activeDrugName,
    { skip: !activeDrugName || !selectedRxcui }
  );

  const drugData = drugDetails
    ? mapApiToDrugCard(drugDetails, activeDrugName, openFdaData)
    : null;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedRxcui(null);
  };

  const handleSelectDrug = (rxcui: string, name: string) => {
    setSelectedRxcui(rxcui);
    setSearchTerm(name);
    setActiveDrugName(name);
  };

  const isLoading = searchLoading || detailsLoading || fdaLoading || eventsLoading || recallsLoading;

  return (
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 text-center md:text-left gap-6">
        <div>
          <DashboardHeading
            title="Search Drug"
            titleSize="text-xl"
            titleColor="text-[#000000]"
            description="Search by generic name, brand name, or drug class"
            descColor="text-slate-700"
            descFont="text-sm"
          />
        </div>
        <Link to={"/dashboard/your-drug-cards"}>
          <PrimaryButton>View Cards</PrimaryButton>
        </Link>
      </div>

      {/* Enhanced Search */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="e.g. Insulin Glargine, Metformin, Aspirin"
          className="w-full h-11 pl-10 pr-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />

        {/* Search Suggestions */}
        {searchResults?.drugGroup?.conceptGroup &&
          searchTerm &&
          !selectedRxcui && (
            <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-80 overflow-auto">
              {searchResults.drugGroup.conceptGroup.flatMap((group: any) =>
                group.conceptProperties ? group.conceptProperties : []
              ).length > 0 ? (
                searchResults.drugGroup.conceptGroup
                  .flatMap((group: any) =>
                    group.conceptProperties ? group.conceptProperties : []
                  )
                  .slice(0, 10)
                  .map((prop: any) => (
                    <div
                      key={prop.rxcui}
                      onClick={() => handleSelectDrug(prop.rxcui, prop.name)}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                    >
                      <p className="font-medium text-gray-800">{prop.name}</p>
                      {prop.synonym && (
                        <p className="text-xs text-gray-500 italic">
                          {prop.synonym}
                        </p>
                      )}
                      <p className="text-xs text-blue-500 mt-1">
                        RxCUI: {prop.rxcui} | Type: {prop.tty}
                      </p>
                    </div>
                  ))
              ) : (
                <div className="p-3 text-sm text-gray-500 text-center">
                  No drugs found for "{searchTerm}"
                </div>
              )}
            </div>
          )}
      </div>

      {isLoading && (
        <p className="text-center text-slate-500">
          Loading drug information...
        </p>
      )}

      {/* Drug Card Content */}
      {drugData && !isLoading && (
        <div className="max-w-6x mx-auto grid lg:grid-cols-3 gap-6 mt-10">
          {/* Left Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 space-y-6">
            {/* Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {drugData.name}
                </h1>
                <p className="text-sm text-gray-500">{drugData.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaBookmark className="text-[#4B5563] text-xl cursor-pointer" />
                <FaShare className="text-[#4B5563] text-xl cursor-pointer" />
              </div>
            </div>

            {/* Basic Info */}
            <section className="border-l-4 border-blue-600 pl-3">
              <h2 className="font-semibold text-blue-600 flex items-center gap-2">
                Basic Information
              </h2>
              <ul className="mt-2 text-gray-700 text-sm space-y-1">
                <li>
                  <span className="font-medium">Generic Name:</span>{" "}
                  {drugData.basicInfo.generic}
                </li>
                <li>
                  <span className="font-medium">Brand Names:</span>{" "}
                  {drugData.basicInfo.brands}
                </li>
                <li>
                  <span className="font-medium">Drug Class:</span>{" "}
                  {drugData.basicInfo.class}
                </li>
              </ul>
            </section>

            {/* Pharmacokinetics */}
            <section className="border-l-4 border-purple-600 pl-3">
              <h2 className="font-semibold text-purple-600 flex items-center gap-2">
                Pharmacokinetics
              </h2>
              <ul className="mt-2 text-gray-700 text-sm space-y-1">
                {/* OpenFDA often groups these into Clinical Pharmacology */}
                <li>
                  <span className="font-medium">Clinical Pharmacology:</span>{" "}
                  {drugData.pharmacokinetics.details}
                </li>
              </ul>
            </section>

            {/* Indications */}
            <section className="border-l-4 border-green-600 pl-3">
              <h2 className="font-semibold text-green-600">Indications</h2>
              <ul className="list-disc list-inside text-sm mt-2 text-gray-700 space-y-1">
                {drugData.indications.map((ind: any, i: number) => (
                  <li key={i}>{ind}</li>
                ))}
              </ul>
            </section>

            {/* Mechanism */}
            <section className="border-l-4 border-orange-600 pl-3">
              <h2 className="font-semibold text-orange-600">
                Mechanism of Action
              </h2>
              <p className="text-sm mt-2 text-gray-700">{drugData.mechanism}</p>
            </section>

            {/* Adverse Effects */}
            <section className="border-l-4 border-red-600 pl-3">
              <h2 className="font-semibold text-red-600">
                Key Adverse Effects
              </h2>
              <ul className="list-disc list-inside text-sm mt-2 text-gray-700 space-y-1">
                {drugData.adverseEffects.map((effect: any, i: number) => (
                  <li key={i}>{effect}</li>
                ))}
              </ul>
            </section>

            {/* Nursing Considerations */}
            <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h2 className="font-semibold text-yellow-700 flex items-center gap-2">
                <ClipboardList size={18} /> Nursing Considerations / Warnings
              </h2>
              <ul className="list-disc list-inside text-sm mt-2 text-[#854D0E] space-y-1">
                {drugData.nursingConsiderations.map((item: any, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Safety Recalls Section */}
            {recalls?.results?.length > 0 && (
              <div className="bg-red-50 rounded-xl shadow p-6 border border-red-200">
                <div className="flex items-center gap-2 text-red-700 mb-4">
                  <AlertTriangle size={20} />
                  <h2 className="text-lg font-semibold">Safety Recalls</h2>
                </div>
                <div className="space-y-4">
                  {recalls.results.slice(0, 3).map((recall: any, i: number) => (
                    <div key={i} className="text-sm border-b border-red-100 last:border-0 pb-2">
                      <p className="font-medium text-red-900">{recall.classification}</p>
                      <p className="text-red-700 line-clamp-2">{recall.reason_for_recall}</p>
                      <p className="text-xs text-red-500 mt-1">Date: {recall.recall_initiation_date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Adverse Events Aggregated */}
            {adverseEvents?.results?.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-800 mb-4">
                  <Activity size={20} className="text-blue-500" />
                  <h2 className="text-lg font-semibold">Reported Reactions</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* Extract common reactions (simplified processAdverseEvents) */}
                  {Array.from(new Set(adverseEvents.results
                    .flatMap((e: any) => e.patient?.reaction?.map((r: any) => r.reactionmeddrapt))
                    .filter(Boolean)
                  )).slice(0, 8).map((reaction: any, i: number) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {reaction}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  *Based on {adverseEvents.meta?.results?.total || adverseEvents.results.length} FDA reports
                </p>
              </div>
            )}

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-[#FAF5FF] to-[#FDF2F8] rounded-xl shadow p-6">
              <div className="flex items-center gap-3">
                <img
                  src={drugImg}
                  alt=""
                  className="mb-3 bg-[#F3E8FF] p-3 px-2 rounded-lg"
                />
                <h2 className="font-semibold text-[#581C87] mb-3">
                  AI Recommendations
                </h2>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-[#E9D5FF] shadow-sm hover:shadow-md transition">
                  <h3 className="font-medium text-[#6B21A8]">
                    Skill Review Needed
                  </h3>
                  <p className="text-sm text-[#7E22CE]">
                    Review current guidelines for {drugData.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Ensure the mapping function handles OpenFDA structure
function mapApiToDrugCard(
  details: any,
  searchName: string,
  openFdaData: any
): any {
  // OpenFDA result is usually inside results[0]
  const fda = openFdaData?.results?.[0] || {};

  const getFirstSentence = (textArray: string[]) => {
    if (!textArray || textArray.length === 0)
      return "Information not available.";
    // Limit text length for UI
    return (
      textArray[0].slice(0, 300) + (textArray[0].length > 300 ? "..." : "")
    );
  };

  const getList = (textArray: string[]) => {
    if (!textArray || textArray.length === 0)
      return ["Information not available."];
    // Sometimes OpenFDA returns a single long string, we might want to split or just show it
    return [textArray[0].slice(0, 200) + "..."];
  };

  return {
    name: details.name || searchName,
    subtitle: "RxNorm & OpenFDA Data",
    basicInfo: {
      generic: details.name || searchName,
      brands: fda.brand_name ? fda.brand_name.join(", ") : "Generic",
      class: details.tty || "Unknown class", // OpenFDA pharm_class_epc could be better
    },
    pharmacokinetics: {
      details: getFirstSentence(fda.clinical_pharmacology),
    },
    indications: getList(fda.indications_and_usage),
    mechanism:
      getFirstSentence(fda.mechanism_of_action) ||
      getFirstSentence(fda.description),
    adverseEffects: getList(fda.adverse_reactions),
    nursingConsiderations: getList(fda.warnings) || [
      "See Boxed Warning if applicable",
    ],
    // AI recommendations remain static or enhance with ML
  };
}
