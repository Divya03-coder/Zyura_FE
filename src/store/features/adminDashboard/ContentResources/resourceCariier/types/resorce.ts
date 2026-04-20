export interface GetResourceCarriersParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
}

export interface CareerResource {
  _id: string;
  resourceName: string;
  category: string;
  description: string;
  tags: string[];
  mediaLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AllResourceCarriersResponse {
  success: boolean;
  message: string;
  data: CareerResource[];
  meta: PaginationMeta;
}
