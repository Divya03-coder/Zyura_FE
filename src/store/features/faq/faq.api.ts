import { baseAPI } from "@/store/api/baseApi";

export const faqAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllFAQ: build.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
    }),

    getSingleFAQ: build.query({
      query: (id: string) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
    }),

    //end
  }),
});

export const { useGetAllFAQQuery, useGetSingleFAQQuery } = faqAPI;
