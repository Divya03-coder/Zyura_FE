import { DifficultyLevel } from "@/types";

export type QuestionOption = {
  option: string;
  optionText: string;
  explanation: string;
};

export type AddMoreMCQToMcqBank = {
  difficulty: DifficultyLevel;
  question: string;
  imageDescription?: string;
  options: QuestionOption[];
  correctOption: string;
}[];

export type UploadMode = { key: "bulk" | "manual" };
