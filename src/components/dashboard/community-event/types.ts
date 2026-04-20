export interface Mentor {
  _id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  email?: string;
  profile_photo: string;
  country: string;
  currentRole: string;
  hospitalOrInstitute: string;
  specialty: string;
  postgraduateDegree: string;
  professionalExperience: number;
  expertise?: string;
  languages: string[];
  skills: string[];
  availability: {
    day: string;
    time: string[];
  }[];
  profileVerification: "PENDING" | "VERIFIED" | "REJECTED";
  isConditionAccepted: boolean;
  hourlyRate?: number;
  currency?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
