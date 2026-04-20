import { DifficultyLevel } from "@/types";
import { ContentFor } from "../../../staticContent/staticContentSlice";

export type SingleFlashCardParams = {
  page?: number;
  limit?: number;
  flashCardId?: string;
};
// all flashcards
export type FlashCardParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  type?: string;
  subject?: string;
  system?: string;
  topic?: string;
  subtopic?: string;
};

// Single Flashcard Item
export interface FlashcardItem {
  _id: string;
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  slug: string;
  type: "study" | string;
  studentType: string;
  uploadedBy: string;
  totalFlashCards: number;
  createdAt: string; // ISO date string
}

// Meta information for pagination
export interface FlashcardMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Full API response
export interface FlashcardResponse {
  success: boolean;
  message: string;
  data: FlashcardItem[];
  meta: FlashcardMeta;
}

// manual
type FlashCard = {
  frontText: string;
  backText: string;
  explanation?: string;
  image?: string;
  difficulty: DifficultyLevel;
};

export type ManualFlashCardUpload = {
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic?: string;
  type: "study" | "exam";
  profileType: string;
  contentFor: ContentFor;
  flashCards: FlashCard[];
};
