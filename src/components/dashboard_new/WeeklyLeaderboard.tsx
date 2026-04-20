import React from "react";
import { useGetLeaderboardQuery } from "@/store/features/goal/goal.api";
import { motion } from "framer-motion";

const WeeklyLeaderboard: React.FC = () => {
  const { data: leaderboardData } = useGetLeaderboardQuery({});

  const leaderboard = leaderboardData?.data || [];

  const getRankStyles = (index: number) => {
    switch (index) {
      case 0:
        return {
          bgColor: "bg-yellow-50",
          circleColor: "bg-yellow-400",
          textColor: "text-yellow-800",
        };
      case 1:
        return {
          bgColor: "bg-gray-50",
          circleColor: "bg-gray-400",
          textColor: "text-gray-800",
        };
      case 2:
        return {
          bgColor: "bg-blue-50",
          circleColor: "bg-blue-500",
          textColor: "text-blue-800",
        };
      default:
        return {
          bgColor: "bg-white",
          circleColor: "bg-gray-200",
          textColor: "text-gray-600",
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 min-h-75">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Weekly Leaderboard
      </h3>

      {leaderboard.length === 0 ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
              <div className="w-12 h-4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="space-y-3"
          variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        >
          {leaderboard.map((user: any, i: number) => {
            const styles = getRankStyles(i);
            const initials = `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""
              }`.toUpperCase();

            return (
              <motion.div
                key={user._id}
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className={`flex items-center gap-3 p-3 ${styles.bgColor} rounded-lg border border-transparent hover:border-slate-200 hover:shadow-sm transition-all`}
              >
                <div
                  className={`w-8 h-8 ${styles.circleColor} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                >
                  {i + 1}
                </div>
                <div className="w-10 h-10 bg-gray-200 border border-slate-100 rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                  <span className={`font-bold ${styles.textColor}`}>
                    {initials}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{user.title}</div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold ${i === 2 ? "text-blue-600" : "text-gray-900"
                      }`}
                  >
                    {user.point} pts
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default WeeklyLeaderboard;
