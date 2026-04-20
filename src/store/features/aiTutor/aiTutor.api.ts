import { baseAPI } from "@/store/api/baseApi";

export interface IMessage {
  type: "HumanMessage" | "AIMessage";
  content: string;
}

export interface IHistoryItem {
  checkpoint_id: string | null;
  created_at: string;
  messages: IMessage[];
}

export interface ISendQuestionPayload {
  question: string;
  thread_id?: string;
}

export interface ISendQuestionResponse {
  thread_id: string;
  response: string;
}

export const aiTutorAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    sendQuestion: build.mutation<ISendQuestionResponse, ISendQuestionPayload>({
      query: (data) => ({
        url: "/ai_part/ai-tutor",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: ISendQuestionResponse }) => response.data,
      invalidatesTags: ["AITutor"],
      extraOptions: { silent: true },
    }),

    getHistory: build.query<IHistoryItem[], string>({
      query: (thread_id) => ({
        url: `/ai_part/ai-tutor/history?thread_id=${thread_id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: IHistoryItem[] }) => response.data,
      providesTags: ["AITutor"],
    }),

    getThreadTitles: build.query<{ thread_id: string; session_title: string }[], void>({
      query: () => ({
        url: "/ai_part/ai-tutor/thread-title",
        method: "GET",
      }),
      transformResponse: (response: { data: { threads: { thread_id: string; session_title: string }[] } }) => response.data.threads,
      providesTags: ["AITutor"],
    }),
  }),
});

export const { useSendQuestionMutation, useGetHistoryQuery, useGetThreadTitlesQuery } = aiTutorAPI;
