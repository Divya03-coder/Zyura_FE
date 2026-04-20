import { baseAPI } from "@/store/api/baseApi";

const studyPlanAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createStudyPlan: build.mutation({
      query: (data) => ({
        url: "/ai_part/create-study-plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StudyPlan"],
    }),

    getStudyPlan: build.query({
      query: (params) => ({
        url: "/study_planner/all",
        method: "GET",
        params,
      }),
      providesTags: ["StudyPlan"],
    }),

    getSingleStudyPlan: build.query({
      query: (id: string) => ({
        url: `/study_planner/${id}`,
        method: "GET",
      }),
      providesTags: ["StudyPlan"],
    }),

    saveStudyPlanProgress: build.mutation({
      query: (data) => ({
        url: "/study_planner/save-progress",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["StudyPlan"],
    }),

    deleteStudyPlan: build.mutation({
      query: (id: string) => ({
        url: `/study_planner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudyPlan"],
    }),

    //end
  }),
});

export const {
  useCreateStudyPlanMutation,
  useGetStudyPlanQuery,
  useGetSingleStudyPlanQuery,
  useSaveStudyPlanProgressMutation,
  useDeleteStudyPlanMutation,
} = studyPlanAPI;
