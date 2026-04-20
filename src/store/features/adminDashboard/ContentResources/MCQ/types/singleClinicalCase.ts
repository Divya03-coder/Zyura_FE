export interface ClinicalCaseResponse {
  success: boolean;
  message: string;
  data: ClinicalCaseData;
  meta: null;
}

export interface ClinicalCaseData {
  _id: string;
  caseTitle: string;
  patientPresentation: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  laboratoryResults: LaboratoryResult[];
  imaging: string;
  diagnosisQuestion: DiagnosisQuestion;
  correctOption: CorrectOption;
  difficultyLevel: string;
  mcqs: MCQ[];
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
