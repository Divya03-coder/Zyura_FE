import PrimaryHeading from "@/components/reusable/PrimaryHeading";
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
  name: string;
  position: number;
  id: string; // unique identifier
}

const leaderboardData: LeaderboardEntry[] = [
  { name: "Alex Chen", position: 1, id: "1" },
  { name: "Maria Rodriguez", position: 2, id: "2" },
  { name: "Sophia Patel", position: 4, id: "4" },
  { name: "David Lee", position: 5, id: "5" },
  { name: "Emma Brown", position: 6, id: "6" },
  { name: "Liam Johnson", position: 7, id: "7" },
  { name: "You", position: 8, id: "8" }, // <- logged-in user
];

// Filter out "James Wilson"
const filteredLeaderboardData = leaderboardData.filter(
  (entry) => entry.name !== "James Wilson"
);

const ClinicalLeaderboard = () => {
  const userId = "8"; // current logged-in user id

  // Sort by position
  const sortedLeaderboard = [...filteredLeaderboardData].sort(
    (a, b) => a.position - b.position
  );

  const topFour = sortedLeaderboard.slice(0, 4);
  const user = sortedLeaderboard.find((entry) => entry.id === userId);

  const isUserInTopFour = topFour.some((entry) => entry.id === userId);

  // ✅ Fix: check if user exists before adding
  const finalLeaderboard: LeaderboardEntry[] = isUserInTopFour
    ? sortedLeaderboard.slice(0, 5)
    : user
    ? [...topFour, user]
    : topFour;

  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow">
      {/* Header */}
      <PrimaryHeading
        title="Weekly Leaderboard"
        icon={<Trophy size={20} />}
        iconColor="text-yellow-500"
      />

      <div className="mt-4 space-y-2">
        {finalLeaderboard.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center justify-between rounded-md px-3 py-2 transition ${
              entry.id === userId
                ? "bg-blue-50 border border-blue-200"
                : "bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">{entry.name}</span>
            </div>
            <span
              className={`font-semibold ${
                entry.id === userId ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {entry.position}
              {entry.id === userId && " (you)"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalLeaderboard;
