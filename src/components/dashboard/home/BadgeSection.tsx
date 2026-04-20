"use client";

import React from "react";
import { FaMedal, FaHeartbeat, FaCalendarCheck, FaComments } from "react-icons/fa";

interface BadgeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string; // Tailwind gradient colors
}

const BadgeCard = ({ icon, title, description, color }: BadgeCardProps) => {
  return (
    <div
      className={`rounded-lg p-4 text-white shadow-md flex flex-col items-center justify-center ${color}`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

export default function BadgesSection() {
  const badges = [
    {
      icon: <FaMedal />,
      title: "Quiz Master",
      description: "90%+ on 10 quizzes",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
      icon: <FaHeartbeat />,
      title: "OSCE Hero",
      description: "5 OSCE cases done",
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Daily Streak",
      description: "7 days active",
      color: "bg-gradient-to-r from-green-400 to-teal-500",
    },
    {
      icon: <FaComments />,
      title: "First Post",
      description: "Community active",
      color: "bg-gradient-to-r from-pink-500 to-red-500",
    },
  ];

  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Badges Earned
      </h3>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {badges.map((badge, idx) => (
          <BadgeCard
            key={idx}
            icon={badge.icon}
            title={badge.title}
            description={badge.description}
            color={badge.color}
          />
        ))}
      </div>

      {/* Milestone Section */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <p className="text-sm font-medium text-blue-600 mb-2">Next Milestone</p>
        <p className="text-gray-700 text-sm mb-3">
          Complete <span className="font-semibold">3 more Quiz</span> to unlock{" "}
          <span className="font-semibold">"Quiz Master"</span> badge
        </p>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
