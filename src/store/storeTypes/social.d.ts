


type Comment = {
  comment: string;
  commentedBy: {
    email: string;
    name: string;
    profileImage: string;
  };
  createdAt: string;

  updatedAt: string;
};

export type TSocialPost = {
  content: string;
  postImage: string;
  createdAt: string;
  isDeleted: boolean;
  postedBy: {
    firstName: string;
    lastName: string;
    profile_photo: string;
    _id: string;
  };
  _id: string;
  profileType: "admin_profile" | "user_profile"
  reaction: string[];
  share: number;
  topic: string;
  updatedAt: string;
  _id: string;
  comments: Comment[];
};

