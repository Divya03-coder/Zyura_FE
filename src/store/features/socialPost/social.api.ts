import { baseAPI } from "@/store/api/baseApi";

const userAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createSocialPost: build.mutation({
            query: (data) => ({
                url: "/social-post",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SocialPost"],
        }),
        getAllSocialPost: build.query({
            query: () => ({
                url: "/social-post",
                method: "GET",
            }),
            providesTags: ["SocialPost"],
        }),
        getSingleSocialPost: build.query({
            query: (id) => ({
                url: `/social-post/${id}`,
                method: "GET",
            }),
            providesTags: ["SocialPost"],
        }),
        updateSocialPost: build.mutation({
            query: ({ id, body }) => ({
                url: `/social-post/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["SocialPost"],
        }),
        saveOrUpdateReactionSocialPost: build.mutation({
            query: ({ id }) => ({
                url: `/social-post/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["SocialPost"],
        }),
        saveCommentSocialPost: build.mutation({
            query: ({ id, body }) => ({
                url: `/social-post/comment/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["SocialPost"]
        }),
        deleteSocialPost: build.mutation({
            query: (id) => ({
                url: `/social-post/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SocialPost"],
        })
    }),
});

export const { useCreateSocialPostMutation, useGetAllSocialPostQuery, useGetSingleSocialPostQuery, useUpdateSocialPostMutation, useSaveOrUpdateReactionSocialPostMutation, useSaveCommentSocialPostMutation, useDeleteSocialPostMutation } = userAPI;
