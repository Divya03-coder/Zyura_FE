export type TPostedBy = {
  _id: string;
  firstName: string;
  lastName: string;
  profile_photo: string;
};

export type TAnswer = {
  _id: string;
  answer: string;
};

export type TForumQuestion = {
  _id: string;
  question: string;
  postedBy: TPostedBy;
  profileType: string;
  answers: TAnswer[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

