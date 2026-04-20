import { baseAPI } from "@/store/api/baseApi";
import { DifficultyFilter } from "@/types";
import { ContentFor } from "../../staticContent/staticContentSlice";
import { UploadMode } from "./types/addMoreMcq";
import {
  AllContentMCQList,
  ClinicalCaseTreeResponse,
  NotesTreeResponse,
  OsceTreeResponse,
} from "./types/allContent";
import { GetSingleMcqData } from "./types/getMcqData";
import { ManualMCQBank, UploadImageResponse } from "./types/manual";
import { GetAllMcqResponse, McqBankParams } from "./types/mcq";
import { SingleMcqData, SingleMCQUpdatePayload } from "./types/singleMcq";
import { SingleMCQResponse } from "./types/singleMcqBank";
import {
  CreateProfileTypePayload,
  ProfileParams,
  ProfileTypeResponse,
} from "./types/student";
import { PostStudyModeTree } from "./types/tree";
import { GetStudyModeTree, GetStudyModeTreeParams } from "./types/TreeResponse";

/** Avoid mismatched DB filters when hierarchy strings have accidental leading/trailing spaces. */
const trimHierarchyQuery = (params: {
  key: string;
  contentFor: ContentFor;
  profileType?: string;
  subject: string;
  system?: string;
  topic?: string;
  subtopic?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}) => ({
  ...params,
  subject: params.subject.trim(),
  system: params.system?.trim() || undefined,
  topic: params.topic?.trim() || undefined,
  subtopic: params.subtopic?.trim() || undefined,
  profileType: params.profileType?.trim() || undefined,
  searchTerm:
    params.searchTerm !== undefined ? params.searchTerm.trim() : undefined,
});

export const mcqApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getMcqApi: build.query<GetAllMcqResponse, McqBankParams>({
      query: (params) => ({
        url: "/mcq-bank",
        method: "GET",
        params,
      }),
      providesTags: ["Mcq"],
    }),

    // for mcq bank
    deleteMcqBankApi: build.mutation<void, string>({
      query: (id) => ({
        url: `/mcq-bank/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mcq", "StudyModeTree", "SingleMcq", "Exams"],
    }),

    // for mcq bank
    getSingleMcqApi: build.query<SingleMcqData, string>({
      query: (id) => ({
        url: `/mcq-bank/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: SingleMcqData;
      }) => response.data,
      providesTags: ["Mcq"],
    }),

    UploadBulkMcqApi: build.mutation<
      { success: boolean; message: string },
      FormData
    >({
      query: (formdata) => ({
        url: `/mcq-bank/upload-bulk`,
        method: "POST",
        body: formdata,
      }),
    }),

    UploadManualMcq: build.mutation<
      { success: boolean; message: string },
      ManualMCQBank
    >({
      query: (data) => ({
        url: `/mcq-bank/upload-manual`,
        method: "POST",
        body: data,
      }),
    }),

    uploadSingleImage: build.mutation<UploadImageResponse, FormData>({
      query: (data) => ({
        url: `/aws/upload-single-image`,
        method: "POST",
        body: data,
      }),
    }),

    // for single mcq
    getSingleMcq: build.query<
      SingleMCQResponse,
      {
        id: string;
        difficulty?: DifficultyFilter;
        searchTerm?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ id, difficulty, searchTerm, page, limit }) => ({
        url: `/mcq-bank/${id}`,
        method: "GET",
        params: { difficulty, searchTerm, page, limit },
      }),
      providesTags: ["SingleMcq"],
    }),

    deleteSingleMcqApi: build.mutation<
      void,
      { mcqBankId: string; mcqId: string }
    >({
      query: ({ mcqBankId, mcqId }) => ({
        url: `/mcq-bank/single/${mcqBankId}/${mcqId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SingleMcq", "Mcq", "StudyModeTree", "Exams"],
    }),

    updatedSingleMcqApi: build.mutation<
      void,
      { data: SingleMCQUpdatePayload; mcqBankId: string; mcqId: string }
    >({
      query: ({ data, mcqBankId, mcqId }) => ({
        url: `/mcq-bank/${mcqBankId}/question/${mcqId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SingleMcq", "Mcq", "StudyModeTree", "Exams"],
    }),

    getSingleMcqApiForSupport: build.query<
      GetSingleMcqData,
      { mcqBankId: string; mcqId: string }
    >({
      query: ({ mcqBankId, mcqId }) => ({
        url: `/mcq-bank/single/${mcqBankId}/${mcqId}`,
        method: "GET",
      }),
      providesTags: ["SingleMcq", "Mcq"],
    }),

    // /mcq-bank/add-more-mcq
    addMoreMcqToMcqBank: build.mutation<
      void,
      { mcqBankId: string; data: FormData } & UploadMode
    >({
      query: ({ data, mcqBankId, key }) => ({
        url: `/mcq-bank/add-more-mcq/${mcqBankId}`,
        method: "PUT",
        body: data,
        params: { key },
      }),
      invalidatesTags: ["SingleMcq", "Mcq", "StudyModeTree"],
    }),

    // ✅ Check duplicate MCQ endpoint
    checkDuplicateMCQ: build.mutation<
      {
        success: boolean;
        data: {
          hasDuplicates: boolean;
          duplicates: Array<{
            mcqId: string;
            bankName?: string;
            examName?: string;
            question: string;
          }>;
          count: number;
        };
      },
      {
        question: string;
        excludeBankId?: string;
        excludeExamId?: string;
      }
    >({
      query: (data) => ({
        url: "/mcq-bank/check-duplicate",
        method: "POST",
        body: data,
      }),
    }),

    // student type
    getStudentTypeApi: build.query<ProfileTypeResponse, ProfileParams>({
      query: (params) => ({
        url: "/profile_type_const/all",
        method: "GET",
        params,
      }),
      providesTags: ["studentType"],
    }),

    createStudentTypeApi: build.mutation<
      void,
      CreateProfileTypePayload
    >({
      query: (data) => ({
        url: "/profile_type_const/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["studentType"],
    }),

    updateStudentTypeApi: build.mutation<
      void,
      { _id: string; typeName: string }
    >({
      query: ({ _id, typeName }) => ({
        url: `/profile_type_const/update/${_id}`,
        method: "PATCH",
        body: { typeName },
      }),
      invalidatesTags: ["studentType"],
    }),

    deleteStudentTypeApi: build.mutation<void, string>({
      query: (id) => ({
        url: `/profile_type_const/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["studentType"],
    }),

    // study mode
    postStudyModeTree: build.mutation<void, PostStudyModeTree>({
      query: (data) => ({
        url: `/study_mode_tree/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StudyModeTree"],
    }),

    updateStudyModeTree: build.mutation<
      void,
      { treeId: string; data: PostStudyModeTree }
    >({
      query: ({ treeId, data }) => ({
        url: `/study_mode_tree/update/${treeId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["StudyModeTree"],
    }),

    getStudyModeTree: build.query<
      GetStudyModeTree,
      GetStudyModeTreeParams
    >({
      query: (params) => ({
        url: `/study_mode_tree/all`,
        method: "GET",
        params: {
          ...params,
          profileType: params.profileType?.trim() || undefined,
        },
      }),
      providesTags: ["StudyModeTree"],
    }),

    getStudyModeAllContent: build.query<
      | AllContentMCQList
      | ClinicalCaseTreeResponse
      | OsceTreeResponse
      | NotesTreeResponse,
      {
        key: string;
        contentFor: ContentFor;
        profileType?: string;
        subject: string;
        system?: string;
        topic?: string;
        subtopic?: string;
        searchTerm?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: "study_mode_tree/all-content",
        method: "GET",
        params: trimHierarchyQuery(params),
      }),
      providesTags: [
        "StudyModeTree",
        "Exams",
        "SingleMcq",
        "Mcq",
        "FlashCard",
        "studentType",
        "ClinicalCase",
        "OSCE",
      ],
    }),

    deleteStudyModeTree: build.mutation<void, string>({
      query: (treeId) => ({
        url: `/study_mode_tree/delete/${treeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "StudyModeTree",
        "Exams",
        "SingleMcq",
        "Mcq",
        "studentType",
      ],
    }),

    ReportMcq: build.mutation({
      query: (data) => ({
        url: `/mcq-bank/save-report`,
        method: "POST",
        body: data,
      }),
    }),

    getSingleUserReport: build.query({
      query: () => ({
        url: `/report/all-reporter`,
        method: "GET",
      }),
      providesTags: ["ReportResponse"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMcqApiQuery,
  useGetSingleMcqApiQuery,
  useUploadBulkMcqApiMutation,
  usePostStudyModeTreeMutation,
  useGetStudyModeTreeQuery,
  useUpdateStudyModeTreeMutation,
  useDeleteStudyModeTreeMutation,
  useReportMcqMutation,
  useUploadManualMcqMutation,
  useGetStudyModeAllContentQuery,
  useCreateStudentTypeApiMutation,
  useUpdateStudentTypeApiMutation,
  useDeleteStudentTypeApiMutation,
  useGetStudentTypeApiQuery,
  useUploadSingleImageMutation,
  useDeleteSingleMcqApiMutation,
  useGetSingleMcqQuery,
  useDeleteMcqBankApiMutation,
  useUpdatedSingleMcqApiMutation,
  useGetSingleUserReportQuery,
  useAddMoreMcqToMcqBankMutation,
  useGetSingleMcqApiForSupportQuery,
  useCheckDuplicateMCQMutation,
} = mcqApi;