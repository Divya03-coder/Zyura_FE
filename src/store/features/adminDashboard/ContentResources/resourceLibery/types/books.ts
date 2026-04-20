export interface GetResourceBooksParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}
export interface BookType {
  _id: string;
  title: string;
  author: string;
  language: string;
  description: string;
  tags: string[];
  fileLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AllResourceBooksResponse {
  success: boolean;
  message: string;
  data: BookType[];
  meta: Meta;
}
