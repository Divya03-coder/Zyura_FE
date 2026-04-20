import { baseAPI } from "@/store/api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),

    updateUserDetails: build.mutation({
      query: (data) => ({
        url: `/user`,
        method: "PUT",
        body: data,
      }),
    }),
    //  end
  }),
});

export const { useGetUserDetailsQuery, useUpdateUserDetailsMutation } = userAPI;
