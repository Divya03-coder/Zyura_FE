interface Player {
  id: string;
  name: string;
  year: string;
  points: number;
  avatar: string;
}

interface LeaderboardProps {
  players: Player[];
  currentUserId: string;
}

const Leaderboard = ({ players, currentUserId }: LeaderboardProps) => {
  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 md:p-6 shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Weekly Leaderboard
      </h3>
      <div className="space-y-2">
        {players.map((player, index) => {
          const isCurrentUser = player.id === currentUserId;
          const rank = index + 1;

          // Different colors for top positions & user
          let bg = "bg-white";
          let textColor = "text-gray-700";
          if (rank === 1) {
            bg = "bg-yellow-50 border border-yellow-200";
            textColor = "text-yellow-700";
          }
          if (isCurrentUser) {
            bg = "bg-blue-50 border border-blue-200";
            textColor = "text-blue-600";
          }

          return (
            <div
              key={player.id}
              className={`flex items-center justify-between rounded-lg px-4 py-3 ${bg}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${
                    rank === 1 ? "bg-yellow-400" : "bg-gray-300"
                  }`}
                >
                  {rank}
                </div>
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{player.name}</p>
                  <p className="text-sm text-gray-500">{player.year}</p>
                </div>
              </div>
              <p className={`font-semibold ${textColor}`}>
                {player.points} pts
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
