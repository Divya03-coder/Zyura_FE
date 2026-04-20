import DiagramCard from "@/components/dashboard/diagram/DiagramCard";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { Search } from "lucide-react";
import diagramImage1 from "@/assets/dashboard/diagram1.png"
import diagramImage2 from "@/assets/dashboard/Alcohol Septal Ablation.png"
import diagramImage3 from "@/assets/dashboard/Aortic Arch Replacement.png"
import diagramImage4 from "@/assets/dashboard/Aortic Dissection.png"
import { Link } from "react-router-dom";

const DiagramExplorer = () => {

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Diagram Explorer", link: "/dashboard/diagram-explorer" },
  ];

  return (
    <div className="my-6 md:my-10">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <DashboardHeading
        title="Diagram Explorer"
        titleSize="text-xl"
        titleColor="text-[#0A0A0A]"
        description="Concept for Medical Learning Platform"
        descColor="text-[#4A5565]"
        descFont="text-sm"
        className="mt-12 mb-8"
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
          <select
            className="h-12 px-4 border border-slate-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option className="bg-white text-gray-700 border-b border-slate-200 rounded-lg" value="cardiology">
              Cardiology
            </option>
            <option className="bg-white text-gray-700 border-b border-slate-200" value="neurology">
              Neurology
            </option>
            <option className="bg-white text-gray-700" value="orthopedics">
              Orthopedics
            </option>
          </select>



        </div>
      </div>

      {/* Diagram Explore */}
      <div className="bg-white border-slate-300 p-7 rounded-lg mt-12">
        <h3 className="text-xl font-semibold">Anatomy Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          <Link to={"/dashboard/diagram-details"}>
            <DiagramCard
              image={diagramImage1}
              title="ACE Inhibitors"
            />
          </Link>
          <DiagramCard
            image={diagramImage2}
            title="ACE Inhibitors"
          />
          <DiagramCard
            image={diagramImage3}
            title="ACE Inhibitors"
          />
          <DiagramCard
            image={diagramImage1}
            title="ACE Inhibitors"
          />
          <DiagramCard
            image={diagramImage2}
            title="ACE Inhibitors"
          />
        </div>
      </div>

      <div className="bg-white border-slate-300 p-7 rounded-lg mt-12">
        <h3 className="text-xl font-semibold">Cardiology Model</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          <DiagramCard
            image={diagramImage3}
            title="ACE Inhibitors"
          />
          <DiagramCard
            image={diagramImage2}
            title="ACE Inhibitors"
          />
          <DiagramCard
            image={diagramImage4}
            title="ACE Inhibitors"
          />
          <DiagramCard
            image={diagramImage1}
            title="ACE Inhibitors"
          />
          <DiagramCard
            image={diagramImage2}
            title="ACE Inhibitors"
          />
        </div>
      </div>

    </div>
  );
};

export default DiagramExplorer;
