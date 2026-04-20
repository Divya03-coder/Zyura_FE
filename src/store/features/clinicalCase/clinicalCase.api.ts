import { baseAPI } from "@/store/api/baseApi";

export const clinicalCaseAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllClinicalCase: build.query({
      query: ({ searchTerm, subject, system, topic, page, limit }: any) => {
        const params: any = { page, limit };

        if (searchTerm) params.searchTerm = searchTerm;
        if (subject) params.subject = subject;
        if (system) params.system = system;
        if (topic) params.topic = topic;

        return {
          url: "/clinical-case",
          method: "GET",
          params,
        };
      },
      providesTags: ["ClinicalCase"],
    }),

    getSingleClinicalCase: build.query({
      query: (id: string) => ({
        url: `/clinical-case/${id}`,
        method: "GET",
      }),
    }),

    generateClinicalCase: build.mutation({
      query: (caseData: any) => ({
        url: "/ai_part/create_clinical_case",
        method: "POST",
        body: caseData,
      }),
    }),

    getAllGeneratedClinicalCases: build.query({
      query: ({ searchTerm, subject, system, topic, page, limit }: any) => {
        const params: any = { page, limit };

        if (searchTerm) params.searchTerm = searchTerm;
        if (subject) params.subject = subject;
        if (system) params.system = system;
        if (topic) params.topic = topic;

        return {
          url: "/my_content/clinical-case",
          method: "GET",
          params,
        };
      },
      providesTags: ["GeneratedClinicalCase"],
    }),

    getSingleGeneratedClinicalCase: build.query({
      query: (id: string) => ({
        url: `/my_content/clinical-case/${id}`,
        method: "GET",
      }),
    }),

    // end
  }),
});

export const {
  useGetAllClinicalCaseQuery,
  useGetSingleClinicalCaseQuery,
  useGenerateClinicalCaseMutation,
  useGetAllGeneratedClinicalCasesQuery,
  useGetSingleGeneratedClinicalCaseQuery,
} = clinicalCaseAPI;
