export interface IAnswer {
  _id: string;
  answer: string;
  name?: string; // optional — some answers don't have name/photo
  photo?: string; // optional — some answers don't have name/photo
}

export interface IPostedBy {
  _id: string;
  firstName: string;
  lastName: string;
  profile_photo: string;
}

export interface IQuestion {
  _id: string;
  question: string;
  postedBy: IPostedBy;
  profileType: "student_profile" | "teacher_profile" | string; // flexible if other types exist
  answers: IAnswer[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
