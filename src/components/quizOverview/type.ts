export interface Recommendations {
  post_quiz_recommendations?: {
    weak_area_level: string;
    weak_area_name: string;
    why_this_is_commonly_missed: string;
    what_to_review: string;
    how_to_practice: string;
    suggested_references: string;
    mcqs: any[];
  } | null;
  clinical_case?: any | null;
  flashcards?: {
    flashcards: any[];
  } | null;
  notes?: {
    title: string;
    note: string;
  } | null;
  // Legacy fields if still needed
  articles?: string[];
  clinicalCases?: string[];
}

export interface SessionDetails {
  completed: number;
  total: number;
  correct: number;
  incorrect: number;
  recommendations: Recommendations;
  rawTimeSpent?: number;
}

export interface Session {
  id: number;
  name: string;
  source: string;
  result: string;
  progress: number;
  details?: SessionDetails;
}

export interface Stats {
  completed: string;
  correct: string;
  timePerQuestion?: string;
  totalTime: string;
  incorrect?: string;
  wrong?: string;
}
