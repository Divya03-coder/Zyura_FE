import { baseAPI } from "@/store/api/baseApi";

export const paymentAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: "/payment/initiate",
        method: "POST",
        body: data,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentMutation } =
  paymentAPI;
