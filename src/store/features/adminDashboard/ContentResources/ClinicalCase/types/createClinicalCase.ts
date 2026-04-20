import { DifficultyLevel } from "@/types";
import { ContentFor } from "../../../staticContent/staticContentSlice";

export interface LaboratoryResult {
  name: string;
  value: string;
}

export interface DiagnosisOption {
  optionName: string; // e.g., "A"
  optionValue: string;
  supportingEvidence: string[];
  refutingEvidence: string[];
}

export interface DiagnosisQuestion {
  question: string;
  diagnosisOptions: DiagnosisOption[];
}

export interface CorrectOption {
  optionName: string; // e.g., "A"
  explanation: string;
}

export interface McqOption {
  option: string; // e.g., "A"
  optionText: string;
  explanation: string;
}

export interface Mcq {
  question: string;
  options: McqOption[];
  correctOption: string;
}

export interface ClinicalCaseInput {
  caseTitle: string;
  patientPresentation: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  imaging: string;

  laboratoryResults: LaboratoryResult[];

  diagnosisQuestion: DiagnosisQuestion;

  correctOption: CorrectOption;

  difficultyLevel: DifficultyLevel;

  mcqs: Mcq[];

  subject: string;
  system: string;
  topic: string;
  subtopic?: string;
  profileType: string;
  contentFor: ContentFor;
}
