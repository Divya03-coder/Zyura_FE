import { DifficultyLevel } from "@/types";
import { ContentFor } from "../../../staticContent/staticContentSlice";

export interface SingleClinicalCaseResponse {
  success: boolean;
  message: string;
  data: ClinicalCase;
  meta: null;
}

export interface ClinicalCase {
  _id: string;
  caseTitle: string;
  description: string;
  scenario: string;
  patientPresentation: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  laboratoryResults: LaboratoryResult[];
  imaging: string;
  diagnosisQuestion: DiagnosisQuestion;
  correctOption: CorrectOption;
  difficultyLevel: DifficultyLevel;
  mcqs: MCQ[];
  subject: string;
  system: string;
  topic: string;
  subtopic: string;

  createdAt: string;
  updatedAt: string;

  contentFor: ContentFor;
  profileType: string;
  viewCount: number;
}

export interface LaboratoryResult {
  name: string;
  value: string;
}

export interface DiagnosisQuestion {
  question: string;
  diagnosisOptions: DiagnosisOption[];
}

export interface DiagnosisOption {
  optionName: string;
  optionValue: string;
  supportingEvidence: string[];
  refutingEvidence: string[];
}

export interface CorrectOption {
  optionName: string;
  explanation: string;
}

export interface MCQ {
  question: string;
  options: MCQOption[];
  correctOption: string;
}

export interface MCQOption {
  option: string;
  optionText: string;
  explanation: string;
}
