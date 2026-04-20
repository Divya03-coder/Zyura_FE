export interface PostFaq {
  category: string;
  question: string;
  answer: string;
}

export interface FaqItem {
  _id: string;
  category: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetFaqResponse {
  success: boolean;
  message: string;
  data: FaqItem[];
  meta: null;
}
