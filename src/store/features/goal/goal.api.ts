import { baseAPI } from "@/store/api/baseApi";
export interface ISelectedSubject {
  subjectName: string;
  systemNames: string[];
}

export interface ICreateGoalPayload {
  goalName: string;
  studyHoursPerDay: number;
  startDate: string;
  endDate: string;
  selectedSubjects: ISelectedSubject[];
}

export interface IGoal extends ICreateGoalPayload {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProgress {
  overall: number;
  mcq: number;
  clinicalCase: number;
  osce: number;
}

export interface ITimeCount {
  todayStudy: number;
  mcq: number;
  clinicalCase: number;
  osce: number;
}

export interface IGoalOverviewData {
  progress: IProgress;
  timeCount: ITimeCount;
  steak: number;
}

export interface IGoalOverviewResponse {
  success: boolean;
  message: string;
  data: IGoalOverviewData;
  meta: null;
}

export interface IUpdateProgressPayload {
  totalCorrect: number;
  totalIncorrect: number;
  totalAttempted: number;
  key: "mcq" | "flashcard" | "clinicalcase" | string;
  bankId: string;
}

export const goalAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createGoal: build.mutation<IGoal, ICreateGoalPayload>({
      query: (data) => {
        return {
          url: "/goal",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Goal"],
    }),

    getGoal: build.query({
      query: () => {
        return {
          url: "/goal",
          method: "GET",
        };
      },
      providesTags: ["Goal"],
    }),

    getGoalOverview: build.query<IGoalOverviewResponse, void>({
      query: () => {
        return {
          url: "/goal/overview",
          method: "GET",
        };
      },
      providesTags: ["Goal"],
    }),

    updateGoal: build.mutation<IGoal, ICreateGoalPayload>({
      query: (data) => {
        return {
          url: "/goal",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Goal"],
    }),

    updateProgressMcqFlashcardClinicalCase: build.mutation<
      any,
      IUpdateProgressPayload
    >({
      query: (data) => {
        return {
          url: "/goal/update-progress-mcq-flashcard-clinicalcase",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [
        "Goal",
        "Mcq",
        "FlashCard",
        "ClinicalCase",
        "GeneratedMCQ",
        "GeneratedFlashcard",
        "GeneratedClinicalCase",
      ],
    }),

    updateProgressOsce: build.mutation<any, { osceId: string }>({
      query: (data) => ({
        url: "/goal/update-progress-osce",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Goal", "OSCE"],
    }),

    getPerformance: build.query({
      query: () => ({
        url: "/tracking/get-performance",
        method: "GET",
      }),
      providesTags: ["Tracking"],
    }),

    getLeaderboard: build.query({
      query: () => ({
        url: "/tracking/get-leaderboard",
        method: "GET",
      }),
      providesTags: ["Leaderboard"],
    }),

    getWeeklyHighlights: build.query({
      query: () => ({
        url: "/tracking/get-highlights-content-of-this-week",
        method: "GET",
      }),
      providesTags: ["Tracking"],
    }),

    // end
  }),
});

export const {
  useCreateGoalMutation,
  useGetGoalQuery,
  useUpdateGoalMutation,
  useGetGoalOverviewQuery,
  useUpdateProgressMcqFlashcardClinicalCaseMutation,
  useUpdateProgressOsceMutation,
  useGetPerformanceQuery,
  useGetLeaderboardQuery,
  useGetWeeklyHighlightsQuery,
} = goalAPI;
