import { baseAPI } from "@/store/api/baseApi";

export const contentAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    deleteMyContent: build.mutation({
      query: ({
        id,
        key,
      }: {
        id: string;
        key: "mcq" | "flashcard" | "clinicalcase" | "notes";
      }) => ({
        url: `/my_content/delete/${id}/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, { key }) => {
        if (error) return [];
        switch (key) {
          case "mcq":
            return ["GeneratedMCQ"];
          case "flashcard":
            return ["GeneratedFlashcard"];
          case "clinicalcase":
            return ["GeneratedClinicalCase"];
          case "notes":
            return ["GeneratedNotes"];
          default:
            return [];
        }
      },
    }),
  }),
});

export const { useDeleteMyContentMutation } = contentAPI;
