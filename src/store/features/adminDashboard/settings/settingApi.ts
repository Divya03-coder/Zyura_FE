import { baseAPI } from "@/store/api/baseApi";
import { WebSettingPayload, WebSettingResponse } from "./types/settings";

export const settingsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<WebSettingResponse, void>({
      query: () => {
        return {
          url: `/web_setting`,
          method: "GET",
        };
      },
      providesTags: ["WebSetting"],
    }),

    postSettings: build.mutation<void, WebSettingPayload>({
      query: (data) => ({
        url: `/web_setting`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WebSetting"],
    }),
  }),
});

export const { useGetSettingsQuery, usePostSettingsMutation } = settingsApi;
