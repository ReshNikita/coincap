import { FC } from "react";
import { Table } from "antd";
import { useGetCryptosQuery } from "../api/coincapApi";
import { cryptos } from "../types/types";
import millify from "millify";

export const CryptoTable: FC = () => {
  const { data: cryptos, isLoading } = useGetCryptosQuery("");

  const formatNumber = (num: string): string =>
    "$" +
    millify(Number(num), {
      units: ["", "B", "M", "K", "T"],
      precision: 2,
      lowercase: true,
    });

  const dataTable = cryptos?.data?.map((crypto: cryptos) => ({
    key: crypto.id,
    rank: crypto.rank,
    name: crypto.name,
    symbol: crypto.symbol,
    priceUsd: crypto.priceUsd,
    marketCapUsd: crypto.marketCapUsd,
    vwap24Hr: crypto.vwap24Hr,
    changePercent24Hr: crypto.changePercent24Hr,
  }));

  const columns = [
    {
      title: "№",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "",
      dataIndex: "symbol",
      key: "symbol",
      className: "symbol",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "VWAP(24Hr)",
      dataIndex: "vwap24Hr",
      key: "vwap24Hr",
      render: formatNumber,
    },
    {
      title: "Change(24Hr)",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
      render: formatNumber,
    },
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      render: formatNumber,
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
      render: formatNumber,
    },
    {
      title: "",
      key: "key",
    },
  ];

  return (
    <Table
      loading={isLoading}
      pagination={{ position: ["bottomCenter"] }}
      bordered={true}
      dataSource={dataTable}
      columns={columns}
    />
  );
};
