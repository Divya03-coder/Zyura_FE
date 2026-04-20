import { DifficultyLevel } from "@/types";

export type FlashCard = {
  flashCardId: string;
  frontText: string;
  image: string;
  backText: string;
  explanation: string;
  difficulty: DifficultyLevel;
};

export type FlashCardData = {
  _id: string;
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  slug: string;
  studentType: string;
  type: string;
  uploadedBy: string;
  flashCards: FlashCard[];
  createdAt: string;
  updatedAt: string;
};

export type SingleFlashCardApiResponse = {
  success: boolean;
  message: string;
  data: FlashCardData;
  meta: {
    page: number;
    limit: number;
    skip: number;
    total: number;
    totalPages: number;
  };
};

export type FlashCardInput = {
  frontText: string;
  backText: string;
  explanation: string;
  difficulty: string;
  image?: string;
};
