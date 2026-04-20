// Single exam item
export interface Exam {
  _id: string;
  professionName: string;
  examName: string;
  totalQuestions: number;
  totalTime: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Pagination meta
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API response structure
export interface GetExamResponseForProfessional {
  success: boolean;
  message: string;
  data: {
    data: Exam[];
    meta: PaginationMeta;
  };
}

export interface ExamQueryParams {
  searchTerm?: string;
  subject?: string;
  professionName?: string;
  page?: number;
  limit?: number;
}

// single exam response

// Option inside an MCQ
export type MCQOption = {
  option: "A" | "B" | "C" | "D" | "E" | "F";
  optionText: string;
  explanation: string;
};

// Single MCQ
export type MCQ = {
  mcqId: string;
  question: string;
  imageDescription: string;
  options: MCQOption[];
  correctOption: "A" | "B" | "C" | "D" | "E" | "F";
};

// Exam data
export type ExamData = {
  _id: string;
  professionName: string;
  examName: string;
  mcqs: MCQ[];
  totalQuestions: number;
  totalTime: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
};

export type ExamResponseData = {
  data: ExamData;
  meta: PaginationMeta;
};

// Final API response
export type GetExamDetailsResponse = {
  success: boolean;
  message: string;
  data: ExamResponseData;
};
