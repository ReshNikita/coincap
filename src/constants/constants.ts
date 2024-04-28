export const BASE_URL: string = "/coincap";

export const DOLLAR_SIGN: string = "$";

export const NOT_FOUND_PAGE = {
  ERROR_404: "404",
  OOPS_YOU_LOST: "Oops! Looks like you're lost.",
  GET_BACK: "Let's get you back",
  BACK_BUTTON: "BACK",
} as const;

export const COPYRIGHT: string = "Copyright © Coincap";

export const ERROR: string = "Something went wrong";

export const HEADER_CONSTANTS = {
  popular_crypto: "Popular cryptocurrencies:",
  total: "Total:",
  usd: "USD",
  $: DOLLAR_SIGN,
  altWalletImg: "wallet",
} as const;

export const CENTER_ALIGN = "center";

export const CRYPTO_TABLE_CONSTANTS = {
  altAddIcon: "addIcon",
  rankColumn: {
    title: "№",
    dataIndex: "rank",
    align: CENTER_ALIGN,
    key: "rank",
  },
  symbolColumn: {
    title: "",
    dataIndex: "symbol",
    align: CENTER_ALIGN,
    key: "symbol",
    className: "symbol",
  },
  nameColumn: {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  vwapColumn: {
    title: "VWAP(24Hr)",
    dataIndex: "vwap24Hr",
    key: "vwap24Hr",
  },
  changePercentColumn: {
    title: "Change(24Hr)",
    dataIndex: "changePercent24Hr",
    key: "changePercent24Hr",
  },
  marketCapColumn: {
    title: "Market Cap",
    dataIndex: "marketCapUsd",
    key: "marketCapUsd",
  },
  priceColumn: {
    title: "Price",
    dataIndex: "priceUsd",
    key: "priceUsd",
  },
  addCryptoColumn: {
    title: "",
    key: "addCryptoColumn",
  },
} as const;
