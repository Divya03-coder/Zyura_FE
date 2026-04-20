import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { FileBadge2 } from "lucide-react";
import DailyChallengeCard from "./DailyChallangeCard";
import Leaderboard from "./Leaderboard";
import BadgesSection from "./BadgeSection";

const scoreItems = [
  { label: "Complete quiz", score: "02" },
  { label: "Complete Flashcard", score: "02" },
  { label: "Complete Case", score: "02" },
  { label: "Badge Earn", score: "00" },
];

const players = [
  {
    id: "1",
    name: "Zainab K.",
    year: "5th Year",
    points: 950,
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Ali M.",
    year: "4th Year",
    points: 870,
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    name: "Dana",
    year: "3rd Year",
    points: 850,
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    name: "Amjad R.",
    year: "2nd Year",
    points: 800,
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    name: "Amjad R.",
    year: "2nd Year",
    points: 800,
    avatar:
      "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const GamifiedLearning = () => {
  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 my-10 shadow">
      <PrimaryHeading
        title="Gamified Learning"
        icon={<FileBadge2 size={20} />}
      />
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Daily Challenge */}
          <div className="lg:col-span-3">
            <DailyChallengeCard
              mission="Today's Mission: Anatomy Focus"
              description="Complete 2 anatomy flashcard sets and answer today's clinical mini case"
              flashcards="10"
              caseCount="01"
              reward='+50 points & "Anatomy Ace" badge'
              timeLeft="23h 45m left"
            />
          </div>
          {/* Your Score Board */}
          <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Your Score Board
            </h3>
            <div className="space-y-4 mt-4">
              {scoreItems.map((item, index) => (
                <div key={index} className="flex justify-between gap-4 ">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="text-gray-800 font-medium">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Badges Earned */}

          <BadgesSection />

          {/* Weekly Leaderboard */}
          <Leaderboard players={players} currentUserId="5" />
        </div>
      </div>
    </div>
  );
};

export default GamifiedLearning;
