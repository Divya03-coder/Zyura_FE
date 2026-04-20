import { baseAPI } from "@/store/api/baseApi";
import { ClinicalCaseInput } from "./types/createClinicalCase";
import { SingleClinicalCaseResponse } from "./types/getClinicalCase";

export const clinicalCaseApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getClinicalCase: build.query<SingleClinicalCaseResponse, string>({
      query: (id) => ({
        url: `/clinical-case/${id}`,
        method: "GET",
      }),
      providesTags: ["ClinicalCase"],
    }),

    deleteClinicalCase: build.mutation<void, string>({
      query: (id) => ({
        url: `/clinical-case/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClinicalCase"],
    }),
    updateClinicalCase: build.mutation<
      void,
      { id: string; data: Partial<ClinicalCaseInput> }
    >({
      query: ({ id, data }) => ({
        url: `/clinical-case/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ClinicalCase"],
    }),

    createClinicalCase: build.mutation<void, ClinicalCaseInput>({
      query: (data) => ({
        url: "/clinical-case/create-new",
        method: "POST",
        body: data,
      }),
    }),

    uploadBulkClinicalCases: build.mutation<
      {
        insertedCount: number;
        skippedCount: number;
        errors: { row: number; message: string }[];
      },
      FormData
    >({
      query: (formData) => ({
        url: "/clinical-case/upload-bulk",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: {
        data: {
          insertedCount: number;
          skippedCount: number;
          errors: { row: number; message: string }[];
        };
      }) => response.data,
      invalidatesTags: ["ClinicalCase"],
    }),
  }),
});

export const {
  useCreateClinicalCaseMutation,
  useGetClinicalCaseQuery,
  useDeleteClinicalCaseMutation,
  useUpdateClinicalCaseMutation,
  useUploadBulkClinicalCasesMutation,
} = clinicalCaseApi;
