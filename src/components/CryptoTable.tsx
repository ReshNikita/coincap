import { FC, ReactElement, useEffect } from "react";
import { Table } from "antd";
import { useGetCryptosQuery } from "../api/coincapApi";
import { cryptos } from "../types/types";
import millify from "millify";
import addIcon from "../icons/plus_add_icon1.svg";
import { useNavigateHook } from "../hooks/useNavigateHook";
import type { ColumnsType } from "antd/es/table";

export const CryptoTable: FC = () => {
  const { data: cryptos, isLoading, refetch } = useGetCryptosQuery("");
  const { getNavigation } = useNavigateHook();

  useEffect(() => {
    refetch();
  }, [cryptos, refetch]);

  const formatNumber = (num: string): string =>
    "$" +
    millify(Number(num), {
      units: ["", "B", "M", "K", "T"],
      precision: 2,
      lowercase: true,
    });

  const getFormatChangePercent = (num: string): ReactElement => (
    <span className={`${Number(num) >= 0 ? "positiveNumb" : "negativeNumb"}`}>
      {formatNumber(num)}
    </span>
  );

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

  enum ALIGN {
    CENTER = "center",
    RIGHT = "right",
    LEFT = "left",
  }

  const columns: ColumnsType<cryptos> = [
    {
      title: "№",
      dataIndex: "rank",
      align: ALIGN.CENTER,
      key: "rank",
    },
    {
      title: "",
      dataIndex: "symbol",
      align: ALIGN.CENTER,
      key: "symbol",
      className: "symbol",
    },
    {
      title: "Name",
      dataIndex: "name",
      align: ALIGN.CENTER,
      key: "name",
      onCell: id => ({
        onClick: () => getNavigation(`/coincap/${id.key}`),
      }),
    },
    {
      title: "VWAP(24Hr)",
      dataIndex: "vwap24Hr",
      align: ALIGN.CENTER,
      key: "vwap24Hr",
      render: formatNumber,
    },
    {
      title: "Change(24Hr)",
      dataIndex: "changePercent24Hr",
      align: ALIGN.CENTER,
      key: "changePercent24Hr",
      render: getFormatChangePercent,
    },
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      align: ALIGN.CENTER,
      key: "marketCapUsd",
      render: formatNumber,
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      align: ALIGN.CENTER,
      key: "priceUsd",
      render: formatNumber,
    },
    {
      title: "",
      key: "key",
      align: ALIGN.CENTER,
      render: () => (
        <img width={"25px"} height={"25px"} src={addIcon} alt="addIcon" />
      ),
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        pagination={{ position: ["bottomCenter"] }}
        bordered={true}
        dataSource={dataTable}
        columns={columns}
        size="middle"
      />
    </>
  );
};
