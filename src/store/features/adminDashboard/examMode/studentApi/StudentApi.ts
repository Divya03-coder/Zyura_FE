import { baseAPI } from "@/store/api/baseApi";
import {
  AddMoreMCQPayload,
  AllExamResponse,
  ExamPayload,
  ExamQueryParams,
  SingleMCQUpdatePayloadForExam,
} from "./types/allExam";
import {
  SingleExamApiResponse,
  SingleExamUpdatePayload,
  SingleParams,
} from "./types/singleExam";

export const studentApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllExamForStudent: build.query<AllExamResponse, ExamQueryParams>({
      query: (params) => {
        return {
          url: `/exam/student/get-all-exam`,
          method: "GET",
          params,
        };
      },
      providesTags: ["AllExam"],
    }),
    getSingleExam: build.query<SingleExamApiResponse, SingleParams>({
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
    createExamManual: build.mutation<void, ExamPayload>({
      query: (data) => ({
        url: `/exam/student/upload-exam-with-manual-mcq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllExam"],
    }),
    createExamBulk: build.mutation<void, FormData>({
      query: (data) => ({
        url: `/exam/student/upload-exam-with-bulk-mcq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllExam"],
    }),

    updateExam: build.mutation<
      any,
      { data: SingleExamUpdatePayload; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/exam/student/update-exam/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllExam"],
    }),

    deleteExam: build.mutation<any, string>({
      query: (id) => ({
        url: `/exam/student/delete-exam/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllExam"],
    }),
    addMoreMcqManual: build.mutation<
      any,
      { data: AddMoreMCQPayload; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/exam/student/add-more-mcq/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllExam"],
    }),

    updateSingleExamMcq: build.mutation<
      any,
      { examId: string; mcqId: string; data: SingleMCQUpdatePayloadForExam }
    >({
      query: ({ examId, mcqId, data }) => {
        return {
          url: `/exam/student/update-mcq/${examId}/${mcqId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["AllExam"],
    }),
    deleteSingleExamMcq: build.mutation<any, { examId: string; mcqId: string }>(
      {
        query: ({ examId, mcqId }) => {
          return {
            url: `/exam/student/delete-specific-mcq/${examId}/${mcqId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["AllExam"],
      },
    ),
  }),
});

export const {
  useGetAllExamForStudentQuery,
  useGetSingleExamQuery,
  useDeleteSingleExamMcqMutation,
  useUpdateSingleExamMcqMutation,
  useUpdateExamMutation,
  useCreateExamBulkMutation,
  useCreateExamManualMutation,
  useDeleteExamMutation,
  useAddMoreMcqManualMutation,
} = studentApi;
