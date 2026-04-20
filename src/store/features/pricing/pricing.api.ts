import { baseAPI } from "@/store/api/baseApi";

export const pricingApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllPricing: build.query({
      query: () => ({
        url: "/pricing_plan",
        method: "GET",
      }),
    }),

    //end
  }),
});

export const { useGetAllPricingQuery } = pricingApi;
