import { baseAPI } from "@/store/api/baseApi";
import {
  CreateProfileTypePayload,
  ProfileParams,
  ProfileTypeResponse,
} from "../MCQ/types/student";

export const professionalTypeApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getProfessionalTypeApi: build.query<ProfileTypeResponse, ProfileParams>({
      query: (params) => ({
        url: "/profile_type_const/professional/all",
        method: "GET",
        params,
      }),
      providesTags: ["professionalType"],
    }),

    createProfessionalTypeApi: build.mutation<void, CreateProfileTypePayload>({
      query: (data) => ({
        url: "/profile_type_const/professional/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["professionalType"],
    }),
    updateProfessionalTypeApi: build.mutation<
      void,
      { _id: string; typeName: string }
    >({
      query: ({ _id, typeName }) => ({
        url: `/profile_type_const/professional/update/${_id}`,
        method: "PATCH",
        body: { typeName },
      }),
      invalidatesTags: ["professionalType"],
    }),

    deleteProfessionalTypeApi: build.mutation<void, string>({
      query: (id) => ({
        url: `/profile_type_const/professional/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["professionalType"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfessionalTypeApiQuery,
  useCreateProfessionalTypeApiMutation,
  useUpdateProfessionalTypeApiMutation,
  useDeleteProfessionalTypeApiMutation,
} = professionalTypeApi;
