import { baseAPI } from "@/store/api/baseApi";
import {
  GetMentorsParams,
  GetMentorsResponse,
  SingleMentorResponse,
} from "./type/mentor/mentor";

export const mentorManagementApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getMentorsData: build.query<GetMentorsResponse, GetMentorsParams>({
      query: (params) => ({
        url: `/admin/mentors`,
        method: "GET",
        params,
      }),
      providesTags: ["mentorsProfile"],
    }),

    getSingleMentor: build.query<SingleMentorResponse, string>({
      query: (id) => ({
        url: `/admin/mentor/${id}`,
        method: "GET",
      }),

      providesTags: ["mentorsProfile"],
    }),

    deleteSingleMentor: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/mentor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Professional"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetMentorsDataQuery,
  useGetSingleMentorQuery,
  useDeleteSingleMentorMutation,
} = mentorManagementApi;
