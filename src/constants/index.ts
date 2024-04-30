import { formatCellPrice } from "../utils/formatCellPrice";

export const BASE_URL: string = "/coincap";

export const DOLLAR_SIGN: string = "$";
export const PERCENT_SIGN: string = "%";
export const ENTER_QUANTITY: string = "Enter quantity:";
export const BACK_BUTTON: string = "BACK";

export const NOT_FOUND_PAGE = {
  ERROR_404: "404",
  OOPS_YOU_LOST: "Oops! Looks like you're lost.",
  GET_BACK: "Let's get you back",
  BACK_BUTTON: BACK_BUTTON,
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
    align: CENTER_ALIGN,
    key: "vwap24Hr",
    render: formatCellPrice,
  },
  changePercentColumn: {
    title: "Change(24Hr)",
    dataIndex: "changePercent24Hr",
    key: "changePercent24Hr",
  },
  marketCapColumn: {
    title: "Market Cap",
    dataIndex: "marketCapUsd",
    align: CENTER_ALIGN,
    key: "marketCapUsd",
    render: formatCellPrice,
  },
  priceColumn: {
    title: "Price",
    dataIndex: "priceUsd",
    align: CENTER_ALIGN,
    key: "priceUsd",
    render: formatCellPrice,
  },
  addCryptoColumn: {
    title: "",
    key: "addCryptoColumn",
  },
} as const;

export const {
  altAddIcon,
  rankColumn,
  symbolColumn,
  nameColumn,
  vwapColumn,
  changePercentColumn,
  marketCapColumn,
  priceColumn,
  addCryptoColumn,
} = CRYPTO_TABLE_CONSTANTS;

export const MODAL_TITLE: string = "Buy crypto:";

export const cryptoColumns = {
  infoColumn: {
    title: "Info",
    key: "info",
    dataIndex: "info",
  },
  currencyDetailsColumn: {
    title: "Currency details",
    key: "details",
    dataIndex: "details",
  },
} as const;

export const { infoColumn, currencyDetailsColumn } = cryptoColumns;

export const cryptoDetailsData = {
  costRow: {
    info: "Cost",
    key: "cost",
  },
  offerRow: {
    info: "Available offer for trading",
    key: "tradingOffer",
  },
  issuedAssets: {
    info: "Total number of issued assets",
    key: "issuedAssets",
  },
  goodsVolumeRow: {
    info: "Volume of goods for the last 24 hours",
    key: "goodsVolume",
  },
  avgPriceRow: {
    info: "Average price by volume over the last 24 hours",
    key: "avgPrice",
  },
  percantageChangeRow: {
    info: "Percentage change in price over the last 24 hours",
    key: "percantageChange",
  },
  websiteRow: {
    info: "Website",
    key: "website",
  },
} as const;

export const {
  costRow,
  offerRow,
  issuedAssets,
  goodsVolumeRow,
  avgPriceRow,
  percantageChangeRow,
  websiteRow,
} = cryptoDetailsData;

export enum Intervals {
  ONE_MINUTE = "m1",
  FIVE_MINUTE = "m5",
  FIFTEEN_MINUTE = "m15",
  THIRTY_MINUTE = "m30",
  HOUR = "h1",
  TWO_HOURS = "h2",
  SIX_HOURS = "h6",
  TWELVE_HOURS = "h12",
  DAY = "d1",
}

export enum LabelIntervals {
  ONE_MINUTE = "one minute",
  FIVE_MINUTE = "5 minutes",
  FIFTEEN_MINUTE = "15 minutes",
  THIRTY_MINUTE = "30 minutes",
  HOUR = "one hour",
  TWO_HOURS = "two hours",
  SIX_HOURS = "6 hours",
  TWELVE_HOURS = "12 hours",
  DAY = "1 day",
}

export const selectOptions = [
  { label: LabelIntervals.DAY, value: Intervals.DAY },
  {
    label: LabelIntervals.TWELVE_HOURS,
    value: Intervals.TWELVE_HOURS,
  },
  { label: LabelIntervals.SIX_HOURS, value: Intervals.SIX_HOURS },
  { label: LabelIntervals.TWO_HOURS, value: Intervals.TWO_HOURS },
  { label: LabelIntervals.HOUR, value: Intervals.HOUR },
  { label: LabelIntervals.THIRTY_MINUTE, value: Intervals.THIRTY_MINUTE },
  { label: LabelIntervals.FIFTEEN_MINUTE, value: Intervals.FIFTEEN_MINUTE },
  { label: LabelIntervals.FIVE_MINUTE, value: Intervals.FIVE_MINUTE },
  { label: LabelIntervals.ONE_MINUTE, value: Intervals.ONE_MINUTE },
];

export const LineChartOptionsTitle = {
  priceChartOption: " price chart",
  currentPriceOption: "Current price: $",
  fontSizeOption: 20,
  colorOption: "#ff4d4f",
} as const;

export const LineChartDataSets = {
  label: "Price in usd",
  backgroundColor: "#673fd7",
  borderColor: "#673fd7",
} as const;
