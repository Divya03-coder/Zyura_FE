// career.api.ts
// import { baseApi } from "@/store/api/baseApi";
import { baseAPI } from "@/store/api/baseApi";
import { CareerResourceApiResponse } from "@/types/careerResource";

export const careerApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCareerResources: builder.query<CareerResourceApiResponse, void>({
      query: () => ({
        url: "/resource/career",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCareerResourcesQuery } = careerApi;
