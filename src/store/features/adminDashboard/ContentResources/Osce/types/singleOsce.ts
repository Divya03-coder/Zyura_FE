export interface SingleOsceResponse {
  success: boolean;
  message: string;
  data: OsceData;
  meta: null;
}

export interface OsceData {
  learningResource: LearningResource;
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
}

export interface LearningResource {
  resourceTitle: string;
  resourceUrl: string;
}

export interface Task {
  taskName: string;
  checklistItem: string[];
}
