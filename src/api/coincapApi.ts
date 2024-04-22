import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coincapApi = createApi({
  reducerPath: "coincapApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coincap.io/v2" }),
  endpoints: builder => ({
    getCryptos: builder.query({
      query: () => "/assets",
    }),
  }),
});

export const { useGetCryptosQuery } = coincapApi;
