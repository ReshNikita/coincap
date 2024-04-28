import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = { "content-type": "application/json; charset=utf-8" };

export const coincapApi = createApi({
  reducerPath: "coincapApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coincap.io/v2",

    prepareHeaders: headers => {
      headers.set("Content-type", "appliation/json");
      return headers;
    },
  }),
  tagTypes: ["Cryptos"],
  endpoints: builder => ({
    getCryptos: builder.query({
      query: () => ({
        url: `/assets/`,
        headers: headers,
      }),
      providesTags: ["Cryptos"],
      transformResponse: ({ data }) => ({ data }),
    }),
    getCryptoDetail: builder.query({
      query: (id: string | undefined) => ({
        url: `/assets/${id}`,
        headers: headers,
      }),
    }),
    getCryptoHistory: builder.query({
      query: ({ id, interval }) => ({
        url: `/assets/${id}/history?interval=${interval}`,
        headers: headers,
      }),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} = coincapApi;
