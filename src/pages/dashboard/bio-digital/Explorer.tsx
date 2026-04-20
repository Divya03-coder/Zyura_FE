import { useEffect, useState } from "react";
// import { Search } from "lucide-react";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import ModelCard from "./components/ModelCard";
import {
  useGetAccessTokenMutation,
  useGetCollectionQuery,
} from "@/store/features/bioDigital/bioDigitalExternal.api";
import { BioModel } from "./data";

// const categories = [
//   "All Models",
//   "Cardiology",
//   "Neurology",
//   "Orthopedics",
//   "Pulmonology",
//   "Gastroenterology",
// ];

export default function BioDigitalExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Models");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [getAccessToken] = useGetAccessTokenMutation();

  useEffect(() => {
    const initData = async () => {
      try {
        const response = await getAccessToken().unwrap();
        if (response?.access_token) {
          setAccessToken(response.access_token);
          console.log("Access token generated:", response.access_token);
        }
      } catch (error) {
        console.error("Failed to get access token:", error);
      }
    };
    initData();
  }, [getAccessToken]);

  // Fetch collection data when accessToken is available
  const { data: collectionData, isLoading } = useGetCollectionQuery(
    { accessToken: accessToken || "", collectionId: "myhuman" },
    { skip: !accessToken }
  );

  // Map raw data from external API to our consistent BioModel shape
  const models: BioModel[] =
    collectionData?.myhuman?.map((item: any) => ({
      id: item.content_id,
      title: item.content_title,
      category: "Anatomy",
      description: item.content_description || "",
      thumbnail:
        item.content_thumbnail_url ||
        "https://placehold.co/600x400?text=No+Image",
      modelUrl: item.content_url || "#",
      details: item.content_description || "",
      relatedImages: [],
      raw: item, // Send all response
    })) || [];

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "BioDigital Explorer", link: "/dashboard/bio-digital" },
  ];

  // Filter models based on search and category (Client-side filtering for now)
  const filteredModels = models.filter((model: BioModel) => {
    const matchesSearch =
      model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Models" || model.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="my-6 md:my-10 px-4 md:px-0">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DashboardHeading
        title="BioDigital Explorer"
        titleSize="text-2xl"
        titleColor="text-[#0A0A0A]"
        description="Interactive 3D medical anatomy models"
        descColor="text-[#4A5565]"
        descFont="text-sm"
        className="mt-8 mb-8"
      />

      {/* Controls Section */}
      <div className="space-y-6 mb-10">
        {/* Search Bar */}
        {/* <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search for conditions, organs, or systems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        </div> */}

        {/* Category Filters */}
        {/* <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div> */}
      </div>

      {/* Results Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              accessToken={accessToken || ""}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">
            No models found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Models");
            }}
            className="mt-4 text-blue-600 hover:underline text-sm cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
