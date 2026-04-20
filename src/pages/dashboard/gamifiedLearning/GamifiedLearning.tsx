import AIRecommendation from "@/components/dashboard/gamified-learning/AIRecommendation";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import Rank from "@/components/dashboard/gamified-learning/Rank";
import Scoreboard from "@/components/dashboard/gamified-learning/Scoreboard";
import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import BadgesSection from "@/components/dashboard/home/BadgeSection";
import DailyChallengeCard from "@/components/dashboard/home/DailyChallangeCard";
import Leaderboard from "@/components/dashboard/home/Leaderboard";
import React from "react";

const GamifiedLearning: React.FC = () => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Gamified learning", link: "/dashboard/gamified-learning" },
  ];

  const rankData = { rank: 3, streak: 7 };
  const scoreboardData = {
    accuracy: 87,
    completeTests: 10,
    consistency: 80,
    streakDays: 5,
  };
  const aiRecommendation =
    "Focus on Cardiology MCQs to improve your exam readiness score. Complete 5 more cases this week!";

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

  return (
    <div>
      <div className="my-6 md:my-10">
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <Rank {...rankData} />
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-300">
          <Scoreboard {...scoreboardData} />
          <AIRecommendation recommendation={aiRecommendation} />
        </div>
        <div className="my-6">
          <DailyChallengeCard
            mission="Today's Mission: Anatomy Focus"
            description="Complete 2 anatomy flashcard sets and answer today's clinical mini case"
            flashcards="10"
            caseCount="01"
            reward='+50 points & "Anatomy Ace" badge'
            timeLeft="23h 45m left"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <BadgesSection />
          <Leaderboard players={players} currentUserId="5" />
        </div>
      </div>
    </div>
  );
};

export default GamifiedLearning;
