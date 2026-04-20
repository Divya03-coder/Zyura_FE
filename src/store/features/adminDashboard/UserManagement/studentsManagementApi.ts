/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/store/api/baseApi";
import {
  GetStudentsParams,
  GetStudentsResponse,
  SingleStudentResponse,
} from "./type/student/Students";
import {
  ActivityStatsResponse,
  DashboardResponse,
} from "./type/student/overview";

export const studentsManagementApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getDashboardData: build.query<DashboardResponse, void>({
      query: () => ({
        url: "/admin/overview",
        method: "GET",
      }),
    }),
    getDashboardActivity: build.query<ActivityStatsResponse, void>({
      query: () => ({
        url: "/admin/monthly-activities",
        method: "GET",
      }),
    }),

    getStudentsData: build.query<GetStudentsResponse, GetStudentsParams>({
      query: (params) => ({
        url: `/admin/students`,
        method: "GET",
        params,
      }),
      providesTags: ["Student"],
    }),

    getSingleStudents: build.query<SingleStudentResponse, string>({
      query: (id) => ({
        url: `/admin/student/${id}`,
        method: "GET",
      }),

      providesTags: ["Student"],
    }),

    deleteSingleStudent: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),

  overrideExisting: false,
});

// Export hooks
export const {
  useGetDashboardDataQuery,
  useGetStudentsDataQuery,
  useGetSingleStudentsQuery,
  useDeleteSingleStudentMutation,
  useGetDashboardActivityQuery,
} = studentsManagementApi;
