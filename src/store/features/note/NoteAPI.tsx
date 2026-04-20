import { baseAPI } from "@/store/api/baseApi";

export const noteApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getSingleUserNotes: build.query({
      query: ({
        searchTerm,
        subject,
        system,
        topic,
        page = 1,
        limit = 10,
      }) => ({
        url: "/notes/all",
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
      // Optional: Add providesTags for cache invalidation
      providesTags: ["Notes"],
    }),

    incrementNoteDownloadCount: build.mutation({
      query: (noteId) => ({
        url: `/notes/download/${noteId}`,
        method: "PUT",
      }),
      // Invalidate the notes cache to refetch updated data
      invalidatesTags: ["Notes"],
    }),

    // Generate Note
    generateNote: build.mutation({
      query: (formData) => ({
        url: "/ai_part/generate-note",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["GeneratedNotes"],
    }),

    // Get All Generated Notes
    getAllGeneratedNotes: build.query({
      query: (params) => ({
        url: "/my_content/notes",
        method: "GET",
        params,
      }),
      providesTags: ["GeneratedNotes"],
    }),

    // Get Single Generated Note
    getGeneratedNoteById: build.query({
      query: (id) => ({
        url: `/my_content/notes/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "GeneratedNotes", id }],
    }),

    // Delete Generated Note
    deleteGeneratedNote: build.mutation({
      query: (id) => ({
        url: `/my_content/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GeneratedNotes"],
    }),

    // Get Single Note by ID (for regular notes, not generated)
    getSingleNoteById: build.query({
      query: (id) => ({
        url: `/notes/single/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Notes", id }],
    }),

    // end
  }),
});

export const {
  useGetSingleUserNotesQuery,
  useIncrementNoteDownloadCountMutation,
  useGenerateNoteMutation,
  useGetAllGeneratedNotesQuery,
  useGetGeneratedNoteByIdQuery,
  useDeleteGeneratedNoteMutation,
  useGetSingleNoteByIdQuery,
} = noteApi;
