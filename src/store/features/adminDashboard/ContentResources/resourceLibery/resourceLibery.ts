import { baseAPI } from "@/store/api/baseApi";
import {
  AllResourceBooksResponse,
  GetResourceBooksParams,
} from "./types/books";

export const resourceBooksApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getResourceBooks: build.query<
      AllResourceBooksResponse,
      GetResourceBooksParams | void
    >({
      query: (params) => {
        const { page = 1, limit = 10, searchTerm = "" } = params || {};
        return {
          url: `/resource/books`,
          method: "GET",
          params: { page, limit, searchTerm },
        };
      },
      providesTags: ["ResourceBooks"],
    }),
    updateResourceBooks: build.mutation<
      void,
      { id: string; data: Partial<FormData> }
    >({
      query: ({ id, data }) => ({
        url: `/resource/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ResourceBooks"],
    }),
    deleteResourceBooks: build.mutation<void, string>({
      query: (id) => ({
        url: `/resource/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ResourceBooks"],
    }),
    createResourceBooks: build.mutation<void, FormData>({
      query: (data) => ({
        url: `/resource/books`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ResourceBooks"],
    }),
  }),
});

export const {
  useGetResourceBooksQuery,
  useUpdateResourceBooksMutation,
  useDeleteResourceBooksMutation,
  useCreateResourceBooksMutation,
} = resourceBooksApi;
