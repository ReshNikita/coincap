import { FC } from "react";
import { Table } from "antd";
import { useGetCryptosQuery } from "../api/coincapApi";

export const CryptoTable: FC = () => {
  const { data: cryptos, isLoading } = useGetCryptosQuery("");
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
    },
    {
      title: "Change(24Hr)",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
    },
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
    },
    {
      title: "",
      key: "key",
    },
  ];

  const dataTable = cryptos?.data?.map((crypto: any) => ({
    key: crypto.id,
    rank: crypto.rank,
    name: crypto.name,
    symbol: crypto.symbol,
    priceUsd: crypto.priceUsd,
    marketCapUsd: crypto.marketCapUsd,
    vwap24Hr: crypto.vwap24Hr,
    changePercent24Hr: crypto.changePercent24Hr,
  }));

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
