// features/drugApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const drugApi = createApi({
  reducerPath: "drugApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Drug"],
  endpoints: (builder) => ({
    searchDrug: builder.query<any, string>({
      query: (name) => ({
        url: `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(
          name
        )}`,
        method: "GET",
      }),
      providesTags: ["Drug"],
    }),
    getDrugDetails: builder.query<any, string>({
      query: (rxcui) =>
        `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`,
    }),
    searchOpenFda: builder.query<any, { name: string; rxcui: string }>({
      query: ({ name }) => {
        const searchQuery = encodeURIComponent(name.replace(/\[|\]/g, ""));
        // Using the comprehensive search pattern provided
        return `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${searchQuery}"+openfda.generic_name:"${searchQuery}"+openfda.substance_name:"${searchQuery}"&limit=1`;
      },
    }),
    getAdverseEvents: builder.query<any, string>({
      query: (name) => {
        const searchQuery = encodeURIComponent(name.replace(/\[|\]/g, ""));
        return `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${searchQuery}"&limit=20`;
      },
    }),
    getRecalls: builder.query<any, string>({
      query: (name) => {
        const searchQuery = encodeURIComponent(name.replace(/\[|\]/g, ""));
        return `https://api.fda.gov/drug/enforcement.json?search=product_description:"${searchQuery}"+openfda.brand_name:"${searchQuery}"+openfda.generic_name:"${searchQuery}"&limit=5`;
      },
    }),
  }),
});

export const {
  useSearchDrugQuery,
  useGetDrugDetailsQuery,
  useLazyGetDrugDetailsQuery,
  useSearchOpenFdaQuery,
  useGetAdverseEventsQuery,
  useGetRecallsQuery,
} = drugApi;
