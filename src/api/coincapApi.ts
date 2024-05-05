import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AssetsType, CryptoDetailType, cryptoHistoryType } from "../types";

const COINCAP_API: string = "https://api.coincap.io/v2";

export const coincapApi = createApi({
  reducerPath: "coincapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COINCAP_API,
    prepareHeaders: headers => {
      headers.set("Authorization", `Bearer ${process.env.API_KEY}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    getCryptos: builder.query<AssetsType, unknown>({
      query: () => ({
        url: `/assets/`,
      }),
    }),
    getCryptoDetail: builder.query<CryptoDetailType, string>({
      query: id => ({
        url: `/assets/${id}`,
      }),
    }),
    getCryptoHistory: builder.query<
      cryptoHistoryType,
      { id: string; interval: string }
    >({
      query: ({ id, interval }) => ({
        url: `/assets/${id}/history?interval=${interval}`,
      }),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} = coincapApi;
