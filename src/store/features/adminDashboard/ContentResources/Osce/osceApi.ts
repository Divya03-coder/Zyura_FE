/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/store/api/baseApi";
import { CreateOsceContentResponse } from "./types/createOsce";
import { OsceListResponse } from "./types/getOsce";
import { SingleOsceResponse } from "./types/singleOsce";

export const osceApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createOsce: build.mutation<void, CreateOsceContentResponse>({
      query: (data) => ({
        url: `/osce/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OSCE"],
    }),
    singleOsce: build.query<SingleOsceResponse, string>({
      query: (id) => ({
        url: `/osce/${id}`,
        method: "GET",
      }),
      providesTags: ["OSCE"],
    }),
    deleteOsce: build.mutation<void, string>({
      query: (id) => ({
        url: `/osce/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OSCE"],
    }),

    getAllOsce: build.query<OsceListResponse, any>({
      query: () => ({
        url: `/osce`,
        method: "GET",
      }),
      providesTags: ["OSCE"],
    }),

    getSingleOsce: build.query<OsceListResponse, any>({
      query: (id) => ({
        url: `/osce/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOsceMutation,
  useGetAllOsceQuery,
  useGetSingleOsceQuery,
  useSingleOsceQuery,
  useDeleteOsceMutation,
} = osceApi;
