import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import TestOverviewCard from "@/components/reusable/TestOverviewCard";
import { Button } from "@/components/ui/button";
import { Clock10, Cog, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function OSCE() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "OSCE Station", link: "/dashboard/osce" },
  ];

  return (
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left gap-6">
        <div>
          <DashboardHeading
            title="Clinical Skills Lab"
            titleSize="text-xl"
            titleColor="text-slate-800"
            titleFont="font-semibold"
            description="Over 100 OSCE Scenario  and virtual paitent"
            descColor="text-slate-700"
            descFont="text-xs"
            className="space-y-2"
          />
        </div>
        <Link to={"/dashboard/osce-station"}>
          <Button className="bg-blue-main hover:bg-blue-600 cursor-pointer text-sm font-medium">
            Enter Skill Lab
          </Button>
        </Link>
      </div>

      <div className="my-12">
        <h2 className="text-xl text-slate-800 font-semibold mb-5">
          Performance | OSCE stations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <TestOverviewCard
            icon={Target}
            iconColor="text-blue-700"
            iconBg="bg-blue-100"
            topText="10"
            bottomText="Average step Complete per station"
            note="Compared to last week"
          />
          <TestOverviewCard
            icon={Clock10}
            iconColor="text-yellow-600"
            iconBg="bg-[#FFEDD4]"
            topText="45"
            bottomText="Average station time"
            note="Compared to last week"
          />
          <TestOverviewCard
            icon={Cog}
            iconColor="text-purple-700"
            iconBg="bg-[#F3E8FF]"
            topText="5"
            bottomText="No. of stations practiced"
            note="Compared to last week"
          />
        </div>
      </div>

      <div className="">
        <DashboardHeading
          title="Previous sessions"
          titleSize="text-xl"
          titleColor="text-slate-800"
          titleFont="font-semibold"
          description="Review your previous sessions"
          descColor="text-slate-700"
          descFont="text-xs"
          className="space-y-2 mb-6"
        />

        <table className="w-full border border-slate-300 rounded-lg text-slate-800 mt-6 bg-white">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 font-bold px-6 py-4 text-left">
                Date
              </th>
              <th className="border border-slate-300 font-bold px-6 py-4 text-left">
                Station
              </th>
              <th className="border border-slate-300 font-bold px-6 py-4 text-left">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-4 py-7">
                Aug. 19, 2025, 3:22 a.m.
              </td>
              <td className="border border-slate-300 px-4 py-7">
                Cardiovascular Examination (CVS)
              </td>
              <td className="border border-slate-300 px-4 py-7">History</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-4 py-7">
                Aug. 19, 2025, 3:22 a.m.
              </td>
              <td className="border border-slate-300 px-4 py-7">
                Cardiovascular Examination (CVS)
              </td>
              <td className="border border-slate-300 px-4 py-7">History</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3)
          .fill(null)
          .map(() => (
            <OSCECard
              onWatchTutorial={handleWatchTutorial}
              onPractice={handlePractice}
            />
          ))}
      </div> */}
    </div>
  );
}
