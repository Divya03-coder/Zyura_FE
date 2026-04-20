export interface McqOption {
  option: string; // e.g. "A", "B", "C"
  optionText: string;
  explanation: string;
}

export interface ExamMcq {
  mcqId: string;
  question: string;
  imageDescription?: string;
  options: McqOption[];
  correctOption: string;
}

export interface Exam {
  _id: string;
  profileType: string;
  examName: string;
  subject: string;
  mcqs: ExamMcq[];
  totalQuestions: number;
  totalTime: number; // minutes
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface PaginationMeta {
  page: number;
  limit: number;
  skip: number;
  total: number;
  totalPages: number;
}

export interface SingleExamApiResponse {
  success: boolean;
  message: string;
  data: {
    data: Exam;
    meta: PaginationMeta;
  };
}

export interface SingleParams {
  id: string;
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export interface SingleExamUpdatePayload {
  profileType: string;
  examName: string;
  subject: string;
  totalTime: number;
}
export interface ProfessionalExamUpdatePayload {
  professionName: string;
  examName: string;
  totalTime: number;
}
