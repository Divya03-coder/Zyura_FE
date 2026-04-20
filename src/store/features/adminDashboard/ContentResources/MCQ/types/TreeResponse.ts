export type SubjectData = {
  _id: string;
  subjectName: string;
  systems: System[];
  createdAt: string;
  updatedAt: string;
};

export type System = {
  name: string;
  topics: Topic[];
};

export type Topic = {
  topicName: string;
  subTopics: SubTopic[];
};

export type SubTopic = {
  subtopicName: string;
};

export type GetStudyModeTree = {
  success: boolean;
  message: string;
  data: SubjectData[];
  meta: null;
};

export type GetStudyModeTreeParams = {
  contentFor: string;
  profileType?: string;
};
