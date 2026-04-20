import { baseAPI } from "@/store/api/baseApi";

export const groupAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createNewGroup: build.mutation({
      query: (data) => ({
        url: "/group/create-new-group",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Group"],
    }),
    getAllMyGroups: build.query({
      query: (searchTerm) => ({
        url: "/group/get-all-my-groups",
        method: "GET",
        params: { searchTerm },
      }),
      providesTags: ["Group"],
    }),
    updateMyGroup: build.mutation({
      query: ({ id, formData }) => ({
        url: `/group/update-my-group/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Group"],
    }),
    deleteMyGroup: build.mutation({
      query: (id) => ({
        url: `/group/delete-my-group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),
    getAllCommunityMembers: build.query({
      query: (params) => {
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v != null && v !== "")
        );
        return {
          url: "/group/get-all-community-member",
          method: "GET",
          params: filteredParams,
        };
      },
    }),
    addMembersIntoGroup: build.mutation({
      query: ({ id, members }) => ({
        url: `/group/add-members-into-group/${id}`,
        method: "PUT",
        body: { members },
      }),
      invalidatesTags: ["Group"],
    }),
    removeMemberFromGroup: build.mutation({
      query: ({ id, memberId }) => ({
        url: `/group/remove-member-from-group/${id}`,
        method: "PUT",
        body: { memberId },
      }),
      invalidatesTags: ["Group"],
    }),
    sendGroupMessage: build.mutation({
      query: (formData) => ({
        url: "/group_message/send-message",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["GroupMessage"],
    }),
    getGroupMessages: build.query({
      query: ({ groupId, page = 1, limit = 30 }) => ({
        url: `/group_message/get-message/${groupId}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["GroupMessage"],
    }),
  }),
});

export const {
  useCreateNewGroupMutation,
  useGetAllMyGroupsQuery,
  useUpdateMyGroupMutation,
  useDeleteMyGroupMutation,
  useGetAllCommunityMembersQuery,
  useAddMembersIntoGroupMutation,
  useRemoveMemberFromGroupMutation,
  useSendGroupMessageMutation,
  useGetGroupMessagesQuery,
} = groupAPI;
