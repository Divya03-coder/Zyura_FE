import { baseAPI } from "@/store/api/baseApi";
import { GetFaqResponse, PostFaq } from "./types/Faq";
import { CreatePlanPayload, PricePlanResponse } from "./types/plan";

export const pricePlanApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllPricePlan: build.query<PricePlanResponse, void>({
      query: () => ({
        url: `/pricing_plan`,
        method: "GET",
      }),
      providesTags: ["PricePlan"],
    }),
    postPricePlan: build.mutation<void, CreatePlanPayload>({
      query: (data) => ({
        url: `/pricing_plan`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PricePlan"],
    }),
    updatePricePlan: build.mutation<
      void,
      { id: string; data: CreatePlanPayload }
    >({
      query: ({ id, data }) => ({
        url: `/pricing_plan/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["PricePlan"],
    }),
    deletePricePlan: build.mutation<void, string>({
      query: (id) => ({
        url: `/pricing_plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PricePlan"],
    }),
    //faq
    getFaq: build.query<GetFaqResponse, void>({
      query: () => ({
        url: `/faq`,
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
    postFaq: build.mutation<void, PostFaq>({
      query: (data) => ({
        url: `/faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    updateFaq: build.mutation<void, { id: string; data: PostFaq }>({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: build.mutation<void, string>({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
    //faq
  }),
});

export const {
  useGetAllPricePlanQuery,
  usePostPricePlanMutation,
  useUpdatePricePlanMutation,
  useDeletePricePlanMutation,
  useGetFaqQuery,
  usePostFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = pricePlanApi;
