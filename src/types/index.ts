export type Nullable<T> = T | null;

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
  maxSupply: string;
  supply: string;
  explorer: string;
  volumeUsd24Hr: string;
};

export type cryptoHistoryData = {
  date: string;
  priceUsd: string;
  time: number;
};

export type cryptoHistoryType = {
  data: cryptoHistoryData[];
  timestamp: number;
};

export type AssetsType = {
  data: cryptos[];
  timestamp: number;
};

export type CryptoDetailType = {
  data: cryptos;
  timestamp: number;
};

export type CurrencyCountType = {
  key: string;
  amount: number;
  total: number;
  name: string;
  id?: string;
  count?: number;
  price: string;
};
