export const types = {};
export type Nullable<T> = T | null;

export type Falsy<T> = T | null | undefined | false;

export type ErrorProps = {
  title: string;
  message: string;
};

export type cryptos = {
  key: string;
  rank: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  id: string;
};
