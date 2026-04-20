import { baseAPI } from "@/store/api/baseApi";
import {
  AddMoreMCQPayload,
  ExamPayloadForProfessional,
  SingleMCQUpdatePayloadForExam,
} from "../studentApi/types/allExam";
import {
  ProfessionalExamUpdatePayload,
  SingleParams,
} from "../studentApi/types/singleExam";
import {
  ExamQueryParams,
  GetExamDetailsResponse,
  GetExamResponseForProfessional,
} from "./allProfessional";

export const professionalApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllExamForProfessional: build.query<
      GetExamResponseForProfessional,
      ExamQueryParams
    >({
      query: (params) => {
        return {
          url: `/exam/professional/get-all-exam`,
          method: "GET",
          params,
        };
      },
      providesTags: ["AllExamForProfessional"],
    }),
    getSingleExamForProfessional: build.query<
      GetExamDetailsResponse,
      SingleParams
    >({
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
    createExamManualForProfessional: build.mutation<
      void,
      ExamPayloadForProfessional
    >({
      query: (data) => ({
        url: `/exam/professional/upload-exam-with-manual-mcq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllExamForProfessional"],
    }),
    createExamBulkForProfessional: build.mutation<void, FormData>({
      query: (data) => ({
        url: `/exam/professional/upload-exam-with-bulk-mcq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllExamForProfessional"],
    }),

    updateExamForProfessional: build.mutation<
      any,
      { data: ProfessionalExamUpdatePayload; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/exam/professional/update-exam/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllExamForProfessional"],
    }),

    deleteExamForProfessional: build.mutation<any, string>({
      query: (id) => ({
        url: `/exam/professional/delete-exam/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllExamForProfessional"],
    }),
    addMoreMcqManualForProfessional: build.mutation<
      any,
      { data: AddMoreMCQPayload; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/exam/professional/add-more-mcq/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllExamForProfessional"],
    }),

    updateSingleExamMcqForProfessional: build.mutation<
      any,
      { examId: string; mcqId: string; data: SingleMCQUpdatePayloadForExam }
    >({
      query: ({ examId, mcqId, data }) => {
        return {
          url: `/exam/professional/update-mcq/${examId}/${mcqId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AllExamForProfessional"],
    }),
   checkDuplicateExamMCQ: build.mutation<
  any,
  { question: string; examId: string | null; examType?: string }
>({
      query: (data) => ({
        url: `/exam/check-duplicate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllExamForProfessional"],
    }),
    deleteSingleExamMcqForProfessional: build.mutation<
      any,
      { examId: string; mcqId: string }
    >({
      query: ({ examId, mcqId }) => {
        return {
          url: `/exam/professional/delete-specific-mcq/${examId}/${mcqId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllExamForProfessional"],
    }),
  }),
});

export const {
  useCheckDuplicateExamMCQMutation,
  useGetAllExamForProfessionalQuery,
  useGetSingleExamForProfessionalQuery,
  useCreateExamManualForProfessionalMutation,
  useUpdateSingleExamMcqForProfessionalMutation,
  useUpdateExamForProfessionalMutation,
  useCreateExamBulkForProfessionalMutation,
  useDeleteSingleExamMcqForProfessionalMutation,
  useDeleteExamForProfessionalMutation,
  useAddMoreMcqManualForProfessionalMutation,
} = professionalApi;
