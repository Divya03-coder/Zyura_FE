// Query parameter type
export type McqBankParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

// get all MCQ bank
export interface McqBank {
  _id: string;
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  slug: string;
  type: string;
  uploadedBy: string;
  totalMcq: number;
  createdAt: string;
}

export interface McqMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAllMcqResponse {
  success: boolean;
  message: string;
  data: McqBank[];
  meta: McqMeta;
}
