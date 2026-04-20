// 🧠 Forum list item
export type TForumGet = {
  _id: string;
  title: string;
  category: string;
  content: string;
  postedBy: {
    _id: string;
    firstName?: string;
    lastName?: string;
    profile_photo: string;
  };
  profileType: "student_profile" | "mentor_profile" | "admin_profile";
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type ForumPosts = TForumGet[];

// Full forum with comments
export type ProfileType = "student_profile" | "mentor_profile" | "admin_profile";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Comment {
  _id: string;
  comment: string;
  postedBy: User;
  photo: string;
  name: string;
  studentType: string;
  profileType: ProfileType;
  createdAt: string;
  updatedAt: string;
}

export interface SingleForumPost {
  _id: string;
  title: string;
  category: string;
  content: string;
  postedBy: User;
  profileType: ProfileType;
  tags: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

