import { baseAPI } from "@/store/api/baseApi";

export const mentorAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllMentor: builder.query({
      query: () => `/admin/mentors`,
    }),
    uploadMentorDocument: builder.mutation({
      query: (data) => ({
        url: `/mentor/upload-document`,
        method: "PUT",
        body: data,
      }),
    }),
    verifyMentorProfession: builder.mutation({
      query: (data) => ({
        url: `/mentor/verify-profession`,
        method: "PUT", // Assuming PUT as per context, or POST if creating. User said "Verify Profession ... api /mentor/verify-profession" without method. I will default to PUT as it's typically an update to profile.
        body: data,
      }),
    }),
    updateMentorPaymentInformation: builder.mutation({
      query: (data) => ({
        url: `/mentor/update-payment-information`,
        method: "PUT",
        body: data,
      }),
    }),
    getSingleMentor: builder.query({
      query: (id) => `/admin/mentor/${id}`,
    }),
    getMentorTransactions: builder.query({
      query: ({ status, page = 1, limit = 10 }) => ({
        url: `/mentor/dashboard/transaction`,
        method: "GET",
        params: { status, page, limit },
      }),
      providesTags: ["Transaction"],
    }),
    getMentorEarnings: builder.query({
      query: (year) => ({
        url: `/mentor/dashboard/earnings`,
        method: "GET",
        params: { year },
      }),
      providesTags: ["Transaction"],
    }),
    getMentorOverview: builder.query({
      query: () => ({
        url: `/mentor/dashboard/overview`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    getMyUpcomingSessions: builder.query({
      query: () => ({
        url: `/sessions/my-upcoming-session`,
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: any[] }) =>
        response.data,
      providesTags: ["Sessions"],
    }),
    bookSession: builder.mutation({
      query: (data) => ({
        url: "/sessions/book-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sessions"],
    }),
    verifySession: builder.mutation({
      query: (data) => ({
        url: "/sessions/verify-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sessions"],
    }),
  }),
});

export const {
  useGetAllMentorQuery,
  useUploadMentorDocumentMutation,
  useVerifyMentorProfessionMutation,
  useUpdateMentorPaymentInformationMutation,
  useGetSingleMentorQuery,
  useGetMentorTransactionsQuery,
  useGetMentorEarningsQuery,
  useGetMentorOverviewQuery,
  useGetMyUpcomingSessionsQuery,
  useBookSessionMutation,
  useVerifySessionMutation,
} = mentorAPI;
