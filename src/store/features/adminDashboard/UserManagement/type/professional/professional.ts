export interface Professional {
  _id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  professionName: string;
  institution: string;
  country: string;
  post_graduate: string;
  experience: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfessionalResponse {
  success: boolean;
  message: string;
  data: Professional[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetProfessionalsParams {
  search?: string;
  post_graduate?: string;
  experience?: string;
  page?: number;
  limit?: number;
}

// single professional

export interface ProfessionalProfile {
  _id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  professionName: string;
  institution: string;
  country: string;
  post_graduate: string;
  experience: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  isDeleted: boolean;
  accountStatus: "ACTIVE" | "INACTIVE" | string;
  role: "PROFESSIONAL" | "STUDENT" | string;
  isVerified: boolean;
  profile_type: "professional_profile" | string;
  authType: "CUSTOM" | string;
  lastOTP: string;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
  profile_id: ProfessionalProfile;
}

export interface SingleProfessionalResponse {
  success: boolean;
  message: string;
  data: User;
  meta: null;
}
