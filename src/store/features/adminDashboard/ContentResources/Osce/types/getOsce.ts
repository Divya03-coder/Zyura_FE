/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LearningResource {
  resourceTitle: string;
  resourceUrl: string;
}

export interface Task {
  taskName: string;
  checklistItem: string[];
}

export interface OsceItem {
  _id: string;
  name: string;
  description: string;
  scenario: string;
  timeLimit: string;
  candidateInstruction: string;
  patientInstruction: string;
  tasks: Task[];
  tutorial: string[];
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  studentType: string;
  type: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  learningResource: LearningResource;
  isComplete?: boolean;
}

export interface OsceListResponse {
  success: boolean;
  message: string;
  data: {
    data: OsceItem[];
    meta: {
      page: number;
      limit: number;
      skip: number;
      total: number;
      totalPages: number;
    };
  };
  meta?: any;
}
