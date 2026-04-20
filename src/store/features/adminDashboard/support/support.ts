import { baseAPI } from "@/store/api/baseApi";
import {
  ReportResponse,
  ReportResponseParam,
  ReportStatusPayload,
} from "./types/support";

export const supportApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllReportForAdmin: build.query<ReportResponse, ReportResponseParam>({
      query: (params) => {
        return {
          url: `/report/all-admin`,
          method: "GET",
          params,
        };
      },
      providesTags: ["ReportResponse"],
    }),
    updateReportForAdmin: build.mutation<
      void,
      { id: string; data: ReportStatusPayload }
    >({
      query: ({ id, data }) => ({
        url: `/report/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ReportResponse"],
    }),
    deleteReportForAdmin: build.mutation<void, string>({
      query: (id) => ({
        url: `/report/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReportResponse"],
    }),
  }),
});

export const {
  useGetAllReportForAdminQuery,
  useUpdateReportForAdminMutation,
  useDeleteReportForAdminMutation,
} = supportApi;
