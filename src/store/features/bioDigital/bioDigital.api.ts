import { baseAPI } from "@/store/api/baseApi";
import { BioModel } from "@/pages/dashboard/bio-digital/data"; // Re-using the interface for type safety

export const bioDigitalAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getBioDigitalModels: build.query<BioModel[], { search?: string; category?: string }>({
      query: (params) => ({
        url: "/biodigital/models",
        method: "GET",
        params: params,
      }),
      providesTags: ["BioDigital"],
    }),

    getBioDigitalModelById: build.query<BioModel, string>({
      query: (id) => ({
        url: `/biodigital/models/${id}`,
        method: "GET",
      }),
      providesTags: ["BioDigital"],
    }),
  }),
});

export const {
  useGetBioDigitalModelsQuery,
  useGetBioDigitalModelByIdQuery,
} = bioDigitalAPI;
