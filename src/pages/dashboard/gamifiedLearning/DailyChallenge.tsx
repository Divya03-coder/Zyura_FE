import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { PiSealQuestion } from "react-icons/pi";

export default function DailyChallenge() {

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Gamified learning", link: "/dashboard/gamified-learning" },
    { name: "Daily Challenges", link: "/dashboard/gamified-learning/daily-challenges" },
  ];

  return (
    <div className="my-6 md:my-10">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="p-4 rounded-lg border border-blue-btn-1/30 mt-4 bg-blue-btn-1/10">
        <div>
          <h4 className="text-base font-semibold text-gray-800">{`Today's Mission: Anatomy Focus`}</h4>
          <p className="mt-2 text-gray-600">{`Complete 2 anatomy flashcard sets and answer today's clinical mini case`}</p>
        </div>
        <div className="mt-4 flex justify-between space-x-6">
          <div className="flex items-center text-slate-800">
            <span>
              <PiSealQuestion className="w-5 h-5" />
            </span>
            <span className="ml-1">{'10'} Flashcards</span>
          </div>
          {/* <div className="flex items-center text-gray-600">
                  <span>
                    <PiSealQuestion className="w-5 h-5" />
                  </span>
                  <span className="ml-1">Case: {caseCount}</span>
                </div> */}

          <div className="flex md:block items-center gap-2">
            <p className="text-blue-btn-1 text-sm">Rewards</p>
            <span className="text-sm">{`+50 points & "Anatomy Ace" badge`}</span>
          </div>
        </div>
      </div>

      <h3 className="font-medium mt-7 mb-6">Flashcards</h3>
      <div className="border border-slate-300 p-5 rounded-[8px]">
        <h3 className="text-sm font-medium text-[#0A0A0A]">Generated Cards</h3>
        <p className="text-sm text-[#717182]">Your AI-generated Cards ready to use</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {/* <FlashCard />
          <FlashCard /> */}
        </div>
      </div>
    </div>
  )
}
