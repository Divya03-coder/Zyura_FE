import { LucideIcon } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  link: string;
}

export interface RankProps {
  rank: number;
  streak: number;
}

export interface ScoreboardProps {
  accuracy: number;
  completeTests: number;
  consistency: number;
  streakDays: number;
}

export interface AIRecommendationProps {
  recommendation: string;
}

export interface Metric {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  bgColor?: string;
}
