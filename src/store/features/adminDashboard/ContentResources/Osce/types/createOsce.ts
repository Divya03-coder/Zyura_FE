import { ContentFor } from "../../../staticContent/staticContentSlice";

export interface OsceTask {
  taskName: string;
  checklistItem: string[];
}

export interface OsceLearningResource {
  resourceTitle: string;
  resourceUrl: string;
}

export interface CreateOsceContentResponse {
  name: string;
  description: string;
  scenario: string;
  timeLimit: string;
  candidateInstruction: string;
  patientInstruction: string;
  tasks: OsceTask[];
  tutorial: string[];
  learningResource: OsceLearningResource;
  subject: string;
  system: string;
  topic: string;
  subtopic?: string;
  profileType: string;
  contentFor: ContentFor;
  type: "study" | "exam";
}
