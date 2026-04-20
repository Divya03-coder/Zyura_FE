import { baseAPI } from "@/store/api/baseApi";
import {
  OverviewResponse,
  PaymentParams,
  SubscribersResponse,
} from "./types/payment";

export const paymentApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    paymentOverview: build.query<OverviewResponse, void>({
      query: () => ({
        url: `/payment/overview`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),

    getSubscribers: build.query<SubscribersResponse, PaymentParams>({
      query: (params) => ({
        url: `/payment/subscribers`,
        method: "GET",
        params,
      }),
    }),
    deleteSubscribers: build.mutation<void, string>({
      query: (id) => ({
        url: `/payment/subscriber/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  usePaymentOverviewQuery,
  useGetSubscribersQuery,
  useDeleteSubscribersMutation,
} = paymentApi;
