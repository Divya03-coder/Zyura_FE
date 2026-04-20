import { DifficultyLevel } from "@/types";

export type MCQOption = {
  option: string;
  optionText: string;
  explanation: string;
};

export type OneMCQ = {
  mcqId: string;
  difficulty: DifficultyLevel;
  question: string;
  imageDescription?: string;
  options: MCQOption[];
  correctOption: string;
};

export type MCQBankData = {
  _id: string;
  title: string;
  subject: string;
  system: string;
  topic: string;
  studentType: string;
  subtopic: string;
  slug: string;
  type: string;
  uploadedBy: string;
  mcqs: OneMCQ[];
  createdAt: string;
  updatedAt: string;
};

export type SingleMCQResponse = {
  success: boolean;
  message: string;
  data: MCQBankData;
  meta: {
    page: number;
    limit: number;
    skip: number;
    total: number;
    totalPages: number;
  };
};
