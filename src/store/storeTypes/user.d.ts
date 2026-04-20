/* eslint-disable @typescript-eslint/no-explicit-any */
export type TUser = {
  accessToken?: string | null;
  account: {
    _id: string;
    email: string;
    isDeleted: boolean;
    accountStatus: string;
    role: string;
    isVerified: boolean;
    profile_type: string;
    authType: string;
    lastOTP: string;
    isSubscribed: boolean;
    isSubscriptionActive?: boolean;
    createdAt: string;
    updatedAt: string;
    profile_id: string;
    aiCredit?: number;
    planId?: string;
  } | null;
  profile: {
    _id: string;
    accountId: string;
    firstName: string;
    lastName: string;
    studentType?: string;
    country: string;
    university?: string;
    phone: string;
    preparingFor?: {
      examName: string;
      description: string;
    }[];
    bio: string;
    year_of_study?: string;
    profile_photo: string;
    dailyStreak?: number;
    point?: number;
    completedQuiz?: any[];
    completedFlashCard?: any[];
    completedCase?: any[];
    badges?: any[];
    connectedMentor?: any[];
    preference?: {
      subject: string;
      systemPreference: string;
      topic: string;
      subTopic: string;
      createdAt: string;
      updatedAt: string;
    };
    // Mentor specific fields
    currentRole?: string;
    hospitalOrInstitute?: string;
    specialty?: string;
    professionalExperience?: number;
    postgraduateDegree?: string;
    profileVerification?: string;
    certificate?: string;
    degree?: string;
    identity_card?: string;
    availability?: {
      day: string;
      time: string[];
    }[];
    currency?: string;
    hourlyRate?: number;
    languages?: string[];
    skills?: string[];
    bankInformation?: {
      accountHolderName: string;
      bankName: string;
      accountNumber: string;
      routingNumber: string;
      accountType: string;
    };
    // Professional specific fields (preliminary)
    institution?: string;
    experience?: string;
    post_graduate?: string;
    professionName?: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export interface getUserResponse {
  success: boolean;
  message: string;
  data: {
    account: {
      _id: string;
      email: string;
      password: string;
      isDeleted: boolean;
      accountStatus: "ACTIVE" | "INACTIVE" | string;
      role: "ADMIN" | "MENTOR" | "STUDENT" | "PROFESSIONAL" | string;
      profile_type: string;
      authType: string;
      isSubscribed: boolean;
      createdAt: string;
      updatedAt: string;
      profile_id: string;
      planId?: string;
      aiCredit?: number;
      isSubscriptionActive?: boolean;
    };
    profile: string | null;
  };
  meta: unknown | null;
}
