import { baseAPI } from "@/store/api/baseApi";

export const flashCardAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createFlashCard: build.mutation({
      query: (data) => ({
        url: "/flash-card",
        method: "POST",
        body: data,
      }),
    }),

    generateAiFlashCard: build.mutation({
      query: (data) => ({
        url: "/ai_part/generate-flashcard",
        method: "POST",
        body: data,
      }),
    }),

    getGeneratedFlashCard: build.query({
      query: ({
        searchTerm,
        subject,
        system,
        topic,
        page = 1,
        limit = 10,
      }: any) => ({
        url: "/my_content/flashcard",
        method: "GET",
        params: { searchTerm, subject, system, topic, page, limit },
      }),
      providesTags: ["GeneratedFlashcard"],
    }),

    getAllFlashCard: build.query({
      query: () => ({
        url: "/flash-card",
        method: "GET",
      }),
    }),

    getSingleFlashCard: build.query({
      query: ({ id, limit }: { id: string; limit?: number }) => ({
        url: `/flash-card/single/${id}`,
        method: "GET",
        params: { limit },
      }),
    }),

    getSingleGeneratedFlashCard: build.query({
      query: ({ id, limit }: { id: string; limit?: number }) => ({
        url: `/my_content/flashcard/${id}`,
        method: "GET",
        params: { limit },
      }),
    }),

    updateFlashCard: build.mutation({
      query: (data) => ({
        url: "/flash-card",
        method: "PATCH",
        body: data,
      }),
    }),

    deleteFlashCard: build.mutation({
      query: (id: string) => ({
        url: `/flash-card/${id}`,
        method: "DELETE",
      }),
    }),

    getFlashCardBank: build.query({
      query: ({
        searchTerm,
        subject,
        system,
        topic,
        page = 1,
        limit = 10,
      }) => ({
        url: "/flash-card/all",
        method: "GET",
        params: {
          searchTerm,
          subject,
          system,
          topic,
          page,
          limit,
        },
      }),
      providesTags: ["FlashCard"],
    }),

    // end
  }),
});

export const {
  useCreateFlashCardMutation,
  useGenerateAiFlashCardMutation,
  useGetGeneratedFlashCardQuery,
  useGetAllFlashCardQuery,
  useGetSingleFlashCardQuery,
  useUpdateFlashCardMutation,
  useDeleteFlashCardMutation,
  useGetFlashCardBankQuery,
  useGetSingleGeneratedFlashCardQuery,
} = flashCardAPI;
