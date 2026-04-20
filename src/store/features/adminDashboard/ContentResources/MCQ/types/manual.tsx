import { CorrectAnswerOption } from "@/types";
import { ContentFor } from "../../../staticContent/staticContentSlice";

interface MCQOption {
  option: string;
  optionText: string;
  explanation?: string;
}

interface MCQ {
  difficulty: string;
  question: string;
  imageDescription?: string;
  options: MCQOption[];
  correctOption: CorrectAnswerOption;
}

export interface ManualMCQBank {
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic?: string;
  type: string;
  profileType: string;
  contentFor: ContentFor;
  mcqs: MCQ[];
}

export interface UploadImageResponse {
  success: boolean;
  message: string;
  data: {
    fileId: string;
    fileUrl: string;
  };
  meta: null;
}
