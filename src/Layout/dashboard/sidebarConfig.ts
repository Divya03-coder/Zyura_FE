import {
  Home,
  MessageCircle,
  HelpCircle,
  Brain,

  Pill,
  GraduationCap,
  Settings,
  Globe,
  SquareUserRound,
  Atom,
  CalendarRange,
  BookOpenText,
  TestTubeDiagonal,
  NotebookText,
  Crown,
} from "lucide-react";

import flashcardIcon from "@/assets/navIcon/Flashcard.png";
import diagramIcon from "@/assets/navIcon/diagram.png";
// import osceIcon from "@/assets/navIcon/osce.png";
import resourceIcon from "@/assets/navIcon/resource.png";

export interface SidebarItem {
  icon: React.ElementType | string;
  label: string;
  path: string;
  section: string;
  iconColor?: string;
  iconBgColor?: string;
  fieldBg?: string;
  isImageIcon?: boolean;
  disabled?: boolean;
}

export const sidebarItems: SidebarItem[] = [
  // Main Navigation
  {
    icon: Home,
    label: "Home",
    path: "/dashboard",
    section: "main",
    iconColor: "text-gray-700",
    iconBgColor: "bg-gray-100",
  },
  // {
  //   icon: LineChart,
  //   label: "Progress",
  //   path: "/dashboard/progress",
  //   section: "main",
  //   iconColor: "text-gray-700",
  //   iconBgColor: "bg-gray-100",
  // },
  {
    icon: SquareUserRound,
    label: "Mentors",
    path: "/dashboard/mentorship",
    section: "main",
    iconColor: "text-gray-700",
    // iconBgColor: "bg-gray-100",
    disabled: true,
  },
  {
    icon: MessageCircle,
    label: "Community",
    path: "/dashboard/community-event",
    section: "main",
    iconColor: "text-gray-700",
    // iconBgColor: "bg-gray-100",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    path: "/dashboard/help",
    section: "main",
    iconColor: "text-gray-700",
    iconBgColor: "bg-gray-100",
  },

  // AI Tools
  {
    icon: Atom,
    label: "AI Tutor",
    path: "/dashboard/ai-tutor",
    section: "AI Tools",
    iconColor: "text-red-700",
    // iconBgColor: "bg-purple-50",
    fieldBg: "bg-zinc-50",
  },
  {
    icon: Brain,
    label: "Quiz Generator",
    path: "/dashboard/quiz-page",
    section: "AI Tools",
    iconColor: "text-lime-700",
    // iconBgColor: "bg-yellow-50",
    fieldBg: "bg-zinc-50",
  },
  {
    icon: CalendarRange,
    // label: "Smart Study Planner",
    label: "Preference",
    path: "/dashboard/smart-study",
    section: "AI Tools",
    iconColor: "text-lime-700",
    iconBgColor: "bg-indigo-50",
    fieldBg: "bg-zinc-50",
  },
  {
    icon: flashcardIcon,
    label: "Flashcard Generator",
    path: "/dashboard/flashcard-generator",
    section: "AI Tools",
    iconColor: "text-orange-600",
    // iconBgColor: "bg-orange-50",
    fieldBg: "bg-zinc-50",
    isImageIcon: true,
  },

  // Study Materials
  {
    icon: BookOpenText,
    label: "MCQ Bank",
    path: "/dashboard/mcq-bank",
    section: "Study Materials",
    iconColor: "text-lime-700",
    // iconBgColor: "bg-green-50",
    fieldBg: "bg-lime-50",
  },
  {
    icon: flashcardIcon,
    label: "Flash Cards",
    path: "/dashboard/flashcard-page",
    section: "Study Materials",
    iconColor: "text-orange-600",
    // iconBgColor: "bg-orange-50",
    fieldBg: "bg-orange-50",
    isImageIcon: true,
  },
  {
    icon: TestTubeDiagonal,
    label: "Clinical Cases",
    path: "/dashboard/clinical-case-generator",
    section: "Study Materials",
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-50",
    fieldBg: "bg-blue-50",
  },
  {
    icon: NotebookText,
    label: "Notes",
    path: "/dashboard/download-notes",
    section: "Study Materials",
    iconColor: "text-emerald-500",
    // iconBgColor: "bg-amber-50",
    fieldBg: "bg-emerald-50",
  },
  // {
  //   icon: osceIcon,
  //   label: "OSCE",
  //   path: "/dashboard/osce",
  //   section: "Study Materials",
  //   iconColor: "text-red-600",
  //   // iconBgColor: "bg-red-50",
  //   fieldBg: "bg-indigo-50",
  //   isImageIcon: true,
  //   disabled: true,
  // },
  {
    icon: diagramIcon,
    label: "Diagram",
    path: "/dashboard/bio-digital",
    section: "Study Materials",
    iconColor: "text-cyan-600",
    // iconBgColor: "bg-cyan-50",
    fieldBg: "bg-zinc-50",
    isImageIcon: true,
  },
  {
    icon: Pill,
    label: "Drug Cards",
    path: "/dashboard/drug-cards",
    section: "Study Materials",
    iconColor: "text-fuchsia-600",
    // iconBgColor: "bg-pink-50",
    fieldBg: "bg-fuchsia-50",
  },
  {
    icon: GraduationCap,
    label: "CME/CPD Courses",
    path: "/dashboard/courses",
    section: "Study Materials",
    iconColor: "text-cyan-600",
    // iconBgColor: "bg-violet-50",
    fieldBg: "bg-cyan-50",
    disabled: true,
  },
  {
    icon: resourceIcon,
    label: "Resources",
    path: "/dashboard/resources",
    section: "Study Materials",
    iconColor: "text-yellow-600",
    // iconBgColor: "bg-teal-50",
    fieldBg: "bg-yellow-50",
    isImageIcon: true,
  },
  {
    icon: Crown,
    label: "Update Plan",
    path: "/pricing",
    section: "Study Materials",
    iconColor: "text-lime-600",
    // iconBgColor: "bg-teal-50",
    fieldBg: "bg-lime-50",
  },

  // Bottom Items
  {
    icon: Settings,
    label: "Settings",
    path: "/dashboard/settings",
    section: "bottom",
    iconColor: "text-gray-600",
    iconBgColor: "bg-gray-50",
  },
  {
    icon: Globe,
    label: "Language",
    path: "/dashboard/language",
    section: "bottom",
    iconColor: "text-gray-600",
    iconBgColor: "bg-gray-50",
  },
];
