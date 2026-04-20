export interface ProfileType {
  _id: string;
  typeName: string;
  totalContent: number;
  totalStudent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface ProfileTypeResponse {
  success: boolean;
  message: string;
  data: ProfileType[];
  meta: Meta;
}

export interface CreateProfileTypePayload {
  typeName: string;
}

export interface ProfileParams {
  page?: number;
  limit?: number;
}
