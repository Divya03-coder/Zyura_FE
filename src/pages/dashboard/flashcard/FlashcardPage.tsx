import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import FlashCardCollection from "./FlashCardCollection";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Flashcards", link: "/dashboard/flashcard-page" },
];

const FlashcardPage = () => {
  // const [activeTab, setActiveTab] = useState("flashcard");

  // Only "overview" stays as tab
  // const tabs = [
  //   { id: "flashcard", label: "Flashcards" },
  //   { id: "overview", label: "Overview" },
  // ];

  return (
    <div className="my-2 px-2">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="md:flex justify-between items-center">
        <DashboardHeading
          title="Your Flashcards"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="AI-powered spaced repetition learning"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className=""
        />

        {/* Generate Flashcard Button */}
        <Link to={"/dashboard/flashcard-generator"}>
          <PrimaryButton
            icon={<Plus className="w-4 h-4" />}
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Generate Flash Card
          </PrimaryButton>
        </Link>
      </div>

      <div>
        {/* Tab Buttons */}
        {/* <div className="flex gap-4 my-6 items-end">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-1 text-start text-lg font-semibold leading-7 transition-colors duration-200 cursor-pointer border p-1 rounded 
        ${
          activeTab === tab.id
            ? " border-blue-500 text-blue-600"
            : "text-gray-500"
        }`}
            >
              {tab.label}
            </button>
          ))}
        </div> */}

        {/* Tab Content */}
        <div>
          <FlashCardCollection />
          {/* {activeTab === "overview" && <FlashCardOverview />}
          {activeTab === "flashcard" && <FlashCardCollection />} */}
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
