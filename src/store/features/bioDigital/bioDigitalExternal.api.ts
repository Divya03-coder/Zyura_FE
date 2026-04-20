import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ==========================================
// 🔑 ADD YOUR BIODIGITAL API KEY HERE
// ==========================================
const BIODIGITAL_API_KEY = import.meta.env.VITE_BIODIGITAL_API_KEY;
const BIODIGITAL_DEVELOPER_SECRET = import.meta.env
  .VITE_BIODIGITAL_DEVELOPER_SECRET;

// Proxy paths defined in vite.config.ts (now targeting services/v2)
const PROXY_OAUTH_PATH = "/biodigital-oauth";
const PROXY_V2_PATH = "/biodigital-v2";

export const bioDigitalExternalAPI = createApi({
  reducerPath: "bioDigitalExternalAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // Use root as base
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAccessToken: build.mutation<any, void>({
      query: () => {
        const basicAuth = btoa(
          `${BIODIGITAL_API_KEY}:${BIODIGITAL_DEVELOPER_SECRET}`
        );
        return {
          url: `${PROXY_OAUTH_PATH}/token`,
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Basic ${basicAuth}`,
          },
          body: {
            grant_type: "client_credentials",
            scope: "contentapi",
          },
        };
      },
    }),

    getCollection: build.query<
      any,
      { accessToken: string; collectionId: string }
    >({
      query: ({ accessToken, collectionId }) => ({
        url: `${PROXY_V2_PATH}/content/collections/${collectionId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Connection: "keep-alive",
        },
      }),
    }),

    // In v2, this might be /content/$id or /content/models/$id
    // But we are moving to collection-based lookup for reliability
    getModelDetails: build.query<any, { accessToken: string; modelId: string }>(
      {
        query: ({ accessToken, modelId }) => ({
          url: `${PROXY_V2_PATH}/content/${modelId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      }
    ),

    // Keep existing for backward count compatibility or reference
    getAllModels: build.query<any, { search?: string; accessToken: string }>({
      query: ({ search, accessToken }) => ({
        url: `${PROXY_V2_PATH}/content`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          search,
        },
      }),
      transformResponse: (response: any) => {
        return response?.collection || response?.data || [];
      },
    }),
  }),
});

export const {
  useGetAccessTokenMutation,
  useGetCollectionQuery,
  useGetModelDetailsQuery,
  useGetAllModelsQuery,
} = bioDigitalExternalAPI;
