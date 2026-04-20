import { baseAPI } from "@/store/api/baseApi";
import { IQuestion } from "./question.type";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    socialQuestionPost: build.mutation({
      query: (data) => ({
        url: "/social-post/question/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Questions"],
    }),
    allQuestionGet: build.query<IQuestion[], void>({
      query: () => ({
        url: "/social-post/question/get-all",
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: IQuestion[] }) =>
        response.data,
      providesTags: ["Questions"],
    }),
    questionUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: `/social-post/question/post-answer/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Questions"],
    }),
    getMentorsQuestionWithAnswers: build.query({
      query: (id) => ({
        url: `/social-post/question/get-all-mentors-question-with-answers/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: any }) =>
        response.data,
      providesTags: ["Questions"],
    }),
  }),
});

export const {
  useSocialQuestionPostMutation,
  useAllQuestionGetQuery,
  useQuestionUpdateMutation,
  useGetMentorsQuestionWithAnswersQuery,
} = userAPI;
