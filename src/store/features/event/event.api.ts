import { baseAPI } from "@/store/api/baseApi";

export const eventAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllEvents: build.query({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
      providesTags: ["Event"],
    }),

    getMyEvents: build.query({
      query: () => ({
        url: "/events/my-events",
        method: "GET",
      }),
      providesTags: ["Event"],
    }),

    enrollInEvent: build.mutation({
      query: (body: { eventId: string }) => ({
        url: "/events/enroll",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Event"],
    }),

    //end
  }),
});

export const {
  useGetAllEventsQuery,
  useGetMyEventsQuery,
  useEnrollInEventMutation,
} = eventAPI;
