import React from "react";
import { motion } from "framer-motion";
import OverviewSection from "@/components/dashboard_new/OverviewSection";
import SmartStudyPlan from "@/components/dashboard_new/SmartStudyPlan";
// import DailyChallenge from "@/components/dashboard_new/DailyChallenge";
// import PerformanceBySubject from "@/components/dashboard_new/PerformanceBySubject";
import WeeklyLeaderboard from "@/components/dashboard_new/WeeklyLeaderboard";
import WeeklyHighlights from "@/components/dashboard_new/WeeklyHighlights";
import MedicalStudyGoalTracker from "@/components/dashboard/goal/MedicalStudyGoalTracker";
import DailyChallenge from "@/components/dashboard_new/DailyChallenge";
// import MedicalStudyGoalTracker from "./MedicalStudyGoalTracker";
// import ChatInterface from "@/components/dashboard_new/message";

const Dashboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="my-6 md:my-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Goal Tracker */}
      <motion.div variants={itemVariants} className="mb-8">
        <MedicalStudyGoalTracker />
      </motion.div>

      {/* Overview Section */}
      <motion.div
        variants={itemVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
        initial="hidden"
      >
        <OverviewSection />
      </motion.div>

      {/* Smart Study Plan */}
      <motion.div
        variants={itemVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
        initial="hidden"
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-6"
      >
        <SmartStudyPlan />
      </motion.div>

      {/* Daily Challenge + Weekly Leaderboard */}
      <motion.div
        variants={itemVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
        initial="hidden"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
      >
        {/* <PerformanceBySubject /> */}
        <DailyChallenge />
        <WeeklyLeaderboard />
      </motion.div>

      {/* Highlights of the Week */}
      <motion.div
        variants={itemVariants}
        viewport={{ once: true, margin: "-100px" }}
        whileInView="visible"
        initial="hidden"
        className="mb-6"
      >
        <WeeklyHighlights />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
