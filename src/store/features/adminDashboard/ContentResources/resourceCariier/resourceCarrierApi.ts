import { baseAPI } from "@/store/api/baseApi";
import {
  AllResourceCarriersResponse,
  GetResourceCarriersParams,
} from "./types/resorce";

export const resourceCarrierApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getResourceCarrier: build.query<
      AllResourceCarriersResponse,
      GetResourceCarriersParams | void
    >({
      query: (params) => {
        const {
          page = 1,
          limit = 10,
          searchTerm = "",
          category = "",
        } = params || {};
        return {
          url: `/resource/career`,
          method: "GET",
          params: { page, limit, searchTerm, category },
        };
      },
      providesTags: ["ResourceCarrier"],
    }),
    updateResourceCarrier: build.mutation<
      void,
      { id: string; data: Partial<FormData> }
    >({
      query: ({ id, data }) => ({
        url: `/resource/career/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ResourceCarrier"],
    }),
    deleteResourceCarrier: build.mutation<void, string>({
      query: (id) => ({
        url: `/resource/career/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ResourceCarrier"],
    }),
    createResourceCarrier: build.mutation<void, FormData>({
      query: (data) => ({
        url: `/resource/career`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ResourceCarrier"],
    }),
  }),
});

export const {
  useGetResourceCarrierQuery,
  useUpdateResourceCarrierMutation,
  useDeleteResourceCarrierMutation,
  useCreateResourceCarrierMutation,
} = resourceCarrierApi;
