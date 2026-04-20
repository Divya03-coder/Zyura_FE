type ProfileVerificationStatus = "PENDING" | "APPROVED" | "REJECTED" | string;

interface ProfessionalData {
  _id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  currentRole: string;
  hospitalOrInstitute: string;
  specialty: string;
  professionalExperience: number;
  postgraduateDegree: string;
  country: string;
  isConditionAccepted: boolean;
  profileVerification: ProfileVerificationStatus;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetMentorsResponse {
  success: boolean;
  message: string;
  data: ProfessionalData[];
  meta: Meta;
}

export interface GetMentorsParams {
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
}

// single mentor

export interface MentorProfile {
  _id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  currentRole: string;
  hospitalOrInstitute: string;
  specialty: string;
  professionalExperience: number;
  postgraduateDegree: string;
  country: string;
  isConditionAccepted: boolean;
  profileVerification: ProfileVerificationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MentorAccountData {
  _id: string;
  email: string;
  isDeleted: boolean;
  accountStatus: "ACTIVE" | "INACTIVE" | string;
  role: "MENTOR" | string;
  isVerified: boolean;
  profile_type: string;
  authType: "CUSTOM" | "GOOGLE" | string;
  lastOTP: string;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
  profile_id: MentorProfile;
}

export interface SingleMentorResponse {
  success: boolean;
  message: string;
  data: MentorAccountData;
  meta: null;
}
