// src/types/careerResource.ts
export interface CareerResource {
  _id: string;
  resourceName: string;
  description: string;
  category: string; // e.g. "OSCE" | "Residency" | etc.
  tags: string[];
  mediaLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareerResourceApiResponse {
  success: boolean;
  data: CareerResource[];
  message?: string;
}
