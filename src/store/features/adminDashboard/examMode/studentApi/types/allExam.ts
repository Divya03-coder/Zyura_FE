import { CorrectAnswerOption } from "@/types";

export interface Exam {
  _id: string;
  profileType: string;
  examName: string;
  subject: string;
  totalQuestions: number;
  totalTime: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ExamListData {
  data: Exam[];
  meta: PaginationMeta;
}

export interface AllExamResponse {
  success: boolean;
  message: string;
  data: ExamListData;
}

export interface ExamQueryParams {
  searchTerm?: string;
  subject?: string;
  profileType?: string;
  page?: number;
  limit?: number;
}

export type SingleMCQUpdatePayloadForExam = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string;
  optionF?: string;

  imageDescription?: string;
  correctOption: CorrectAnswerOption;
  explanationA?: string;
  explanationB?: string;
  explanationC?: string;
  explanationD?: string;
  explanationE?: string;
  explanationF?: string;
};

// create exam

export type OptionKey = "A" | "B" | "C" | "D" | "E" | "F";

export interface MCQOption {
  option: OptionKey;
  optionText: string;
  explanation: string;
}

export interface SingleMCQForExam {
  question: string;
  imageDescription?: string;
  options: MCQOption[];
  correctOption: OptionKey;
}

export interface ExamPayload {
  profileType: string;
  examName: string;
  subject: string;
  totalTime: number;
  mcqs: SingleMCQForExam[];
}

export interface AddMoreMCQPayload {
  mcqs: SingleMCQForExam[];
}

export interface ExamPayloadForProfessional {
  professionName: string;
  examName: string;
  totalTime: number;
  mcqs: SingleMCQForExam[];
}
