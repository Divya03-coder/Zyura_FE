import { baseAPI } from "@/store/api/baseApi";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    socialPostForum: build.mutation({
      query: (data) => ({
        url: "/social-post/forum/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Forum"],
    }),
    allForumGet: build.query({
      query: () => ({
        url: "/social-post/forum/get-all",
        method: "GET",
      }),
      providesTags: ["Forum"],
    }),
    singleForumGet: build.query({
      query: (id) => ({
        url: `/social-post/forum/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["Forum"],
    }),
    forumComentUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: `/social-post/forum/comment/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Forum"],
    }),
  }),
});

export const { useSocialPostForumMutation, useAllForumGetQuery, useSingleForumGetQuery, useForumComentUpdateMutation } = userAPI;
