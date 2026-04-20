// post study mode tree

import { ContentFor } from "../../../staticContent/staticContentSlice";

type SubTopic = string;

type Topic = {
  topicName: string;
  subTopics?: SubTopic[];
};

type System = {
  name: string;
  topics: Topic[];
};

export type PostStudyModeTree = {
  subjectName: string;
  systems: System[];
  profileType: string;
  contentFor: ContentFor;
};

// post exam mode tree
export type PostExam = {
  examName: string;
};

// get all exam name

export type GetExamsResponse = {
  success: boolean;
  message: string;
  data: Exam[];
  meta: null;
};

export type Exam = {
  _id: string;
  examName: string;
  createdAt: string;
  updatedAt: string;
};
