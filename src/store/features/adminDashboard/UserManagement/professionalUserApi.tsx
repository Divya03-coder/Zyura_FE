import { baseAPI } from "@/store/api/baseApi";
import {
  GetProfessionalsParams,
  ProfessionalResponse,
  SingleProfessionalResponse,
} from "./type/professional/professional";

export const professionalUserApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getProfessionalData: build.query<
      ProfessionalResponse,
      GetProfessionalsParams
    >({
      query: (params) => ({
        url: `/admin/professionals`,
        method: "GET",
        params,
      }),
      providesTags: ["professionalsProfile"],
    }),

    getSingleProfessional: build.query<SingleProfessionalResponse, string>({
      query: (id) => ({
        url: `/admin/professional/${id}`,
        method: "GET",
      }),

      providesTags: ["professionalsProfile"],
    }),

    deleteProfessional: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/professional/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["professionalsProfile"],
    }),
  }),

  overrideExisting: false,
});

// Export hooks
export const {
  useGetProfessionalDataQuery,
  useGetSingleProfessionalQuery,
  useDeleteProfessionalMutation,
} = professionalUserApi;
