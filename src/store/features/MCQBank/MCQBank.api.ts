/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/store/api/baseApi";

export const mcqBankAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllMCQBank: build.query({
      query: ({ searchTerm, subject, system, topic, type, page, limit }) => {
        const params: any = { page, limit };

        if (searchTerm) params.searchTerm = searchTerm;
        if (subject) params.subject = subject;
        if (system) params.system = system;
        if (topic) params.topic = topic;
        if (type) params.type = type;

        return {
          url: "/mcq-bank",
          method: "GET",
          params,
        };
      },
      providesTags: ["Mcq"],
    }),

    getAllPublicMCQBank: build.query({
      query: ({ searchTerm, subject, system, topic, type, page, limit }) => {
        const params: any = { page, limit };

        if (searchTerm) params.searchTerm = searchTerm;
        if (subject) params.subject = subject;
        if (system) params.system = system;
        if (topic) params.topic = topic;
        if (type) params.type = type;

        return {
          url: "/mcq-bank/public-mcq",
          method: "GET",
          params,
        };
      },
      providesTags: ["Mcq"],
    }),

    getSingleMCQ: build.query({
      query: ({
        id,
        page = 1,
        limit = 10,
        skip,
      }: {
        id: string;
        page?: number;
        limit?: number;
        skip?: number;
      }) => {
        const params: any = { page, limit };
        if (skip !== undefined) params.skip = skip;
        return {
          url: `/mcq-bank/${id}`,
          method: "GET",
          params,
        };
      },
    }),

    getMCQBankTree: build.query({
      query: () => ({
        url: `/study_mode_tree/all`,
        method: "GET",
      }),
    }),

    getMcqBySubtopic: build.query({
      query: ({ subject, system, topic, subtopic, page = 1, limit = 10 }) => ({
        url: "/study_mode_tree/all-content",
        method: "GET",
        params: {
          subject: subject.trim(),
          system: system?.trim(),
          topic: topic?.trim(),
          subtopic: subtopic?.trim(),
          page,
          limit,
        },
      }),
    }),

    generateMCQWithFile: build.mutation({
      query: (formData: FormData) => ({
        url: "/ai_part/mcq_generator_with_file",
        method: "POST",
        body: formData,
      }),
    }),

    getAllGeneratedMCQ: build.query({
      query: ({
        searchTerm,
        subject,
        system,
        topic,
        page = 1,
        limit = 10,
      }: any) => ({
        url: `/my_content/mcqs`,
        method: "GET",
        params: { searchTerm, subject, system, topic, page, limit },
      }),
      providesTags: ["GeneratedMCQ"],
    }),

    getGeneratedMCQ: build.query({
      query: ({ id, limit }: { id: string; limit?: number }) => ({
        url: `/my_content/mcqs/${id}`,
        method: "GET",
        params: { limit },
      }),
      providesTags: (_result, _error, { id }) => [{ type: "GeneratedMCQ", id }],
    }),

    generateMCQ: build.mutation({
      query: (data: any) => ({
        url: "ai_part/generate-mcq",
        method: "POST",
        body: data,
      }),
    }),

    updateQuizTracking: build.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/my_content/update-tracking/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ({ id }) => [
        { type: "GeneratedMCQ", id },
        "GeneratedMCQ",
      ],
    }),

    generateRecommendation: build.mutation({
      query: ({ contentId, wrongAnswers }: { contentId: string; wrongAnswers: any[] }) => ({
        url: `/ai_part/generate-recommendation/${contentId}`,
        method: "POST",
        body: wrongAnswers,
      }),
      invalidatesTags: (_, __, { contentId }) => [
        { type: "GeneratedMCQ", id: contentId },
      ],
    }),
    getAllExamForStudent: build.query({
      query: (params) => {
        return {
          url: `/exam/student/get-all-exam`,
          method: "GET",
          params,
        };
      },
      providesTags: ["AllExam"],
    }),
    getAllExamForProfessional: build.query({
      query: (params) => {
        return {
          url: `/exam/professional/get-all-exam`,
          method: "GET",
          params,
        };
      },
      providesTags: ["AllExamForProfessional"],
    }),
    getSingleExamForStudent: build.query({
      query: (params) => ({
        url: `/exam/student/get-single-exam/${params.id}`,
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
        },
      }),
      providesTags: ["AllExam"],
    }),
    getSingleExamForProfessional: build.query({
      query: (params) => {
        return {
          url: `/exam/professional/get-single-exam/${params.id}`,
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
          },
        };
      },
      providesTags: ["AllExamForProfessional"],
    }),

    // end
  }),
});

export const {
  useGetAllMCQBankQuery,
  useGetAllPublicMCQBankQuery,
  useGetSingleMCQQuery,
  useGetMCQBankTreeQuery,
  useGetMcqBySubtopicQuery,
  useGenerateMCQWithFileMutation,
  useGetAllGeneratedMCQQuery,
  useGetGeneratedMCQQuery,
  useGenerateMCQMutation,
  useUpdateQuizTrackingMutation,
  useGenerateRecommendationMutation,
  useGetAllExamForStudentQuery,
  useGetAllExamForProfessionalQuery,
  useGetSingleExamForStudentQuery,
  useGetSingleExamForProfessionalQuery,
} = mcqBankAPI;
