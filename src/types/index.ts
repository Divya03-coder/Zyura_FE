// Define a type for your user (example)
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define a type for your app's theme (example)
export type Theme = "light" | "dark";

// Define a type for your app's routes (example)
export type Route = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
};

export type TMCQBank = {
  _id: string;
  title: string;
  type: "exam" | "quiz" | "practice"; // you can adjust or extend this union
  slug: string;

  subject: string;
  topic: string;
  subtopic: string;
  system: string;

  totalMcq: number;
  uploadedBy: string;

  createdAt: string;
  isComplete?: boolean;
};

type McqOption = {
  option: string; // e.g., "A", "B", "C", "D"
  optionText: string; // text shown to the user
  explanation: string; // explanation for this option
};

export type McqQuestion = {
  mcqId: string;
  question: string; // the question text
  options: McqOption[]; // list of options
  correctOption: string; // e.g., "C"
  difficulty: "Easy" | "Medium" | "Advance"; // restrict to known levels
  imageDescription?: string;
};

export interface IFlashCardItem {
  flashCardId: string;
  image: string;
  frontText: string;
  backText: string;
  explanation: string;
  difficulty: string; // "Basics" etc.
}

export interface IFlashcardBank {
  _id: string;
  title: string;
  slug: string;
  type: string; // "study" | maybe others
  studentType: string; // "Medical Student" etc.
  subject: string; // e.g., "Neurology"
  system: string; // e.g., "Anatomy"
  topic: string; // e.g., "Tonatomy"
  subtopic: string; // e.g., "Monatomy"
  totalFlashCards: number;
  flashCards: IFlashCardItem[];
  uploadedBy: string; // e.g., "Admin admin"
  createdAt: string; // ISO date string
  isComplete?: boolean;
}

export type DifficultyLevel = "Basic" | "Intermediate" | "Advance";

export const difficultyOptions = [
  { label: "All", value: "All" },
  { label: "Basic", value: "Basic" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advance", value: "Advance" },
] as const;

export type DifficultyFilter = DifficultyLevel | "All";

export const correctAnswerOptions = [
  { label: "Option A", value: "A" },
  { label: "Option B", value: "B" },
  { label: "Option C", value: "C" },
  { label: "Option D", value: "D" },
  { label: "Option E", value: "E" },
  { label: "Option F", value: "F" },
] as const;

export type CorrectAnswerOption = "A" | "B" | "C" | "D" | "E" | "F";
export const ANSWER_OPTIONS = ["A", "B", "C", "D", "E", "F"] as const;
