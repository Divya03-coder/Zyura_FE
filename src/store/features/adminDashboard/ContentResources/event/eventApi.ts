import { baseAPI } from "@/store/api/baseApi";
import { AllEventsResponse, GetEventsParams } from "./types/allEvent";
import { CreateEvent } from "./types/event";

export const eventApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getEvent: build.query<AllEventsResponse, GetEventsParams | void>({
      query: (params) => {
        const { page = 1, limit = 10, searchTerm = "" } = params || {};
        return {
          url: `/events`,
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: ["Event"],
    }),
    updateEvent: build.mutation<
      void,
      { id: string; data: Partial<CreateEvent> }
    >({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),
    deleteEvent: build.mutation<void, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
    createEvent: build.mutation<void, CreateEvent>({
      query: (data) => ({
        url: "/events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useCreateEventMutation,
} = eventApi;
