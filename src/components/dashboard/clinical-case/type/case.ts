export type Option = {
  id: string;
  text: string;
  supportingEvidence: string[];
  refutingEvidence: string[];
};

export type Question = {
  id: string;
  prompt: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
};

export type Case = {
  id: string;
  title: string;
  specialty: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  caseDetails: string;
  questions: Question[];
};
