import { FC, MouseEventHandler, ReactElement, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BuyCryptoModal } from "../components/BuyCryptoModal";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { useGetCryptosQuery } from "../api/coincapApi";
import { Nullable, cryptos } from "../types";
import {
  CENTER_ALIGN,
  PERCENT_SIGN,
  SORT_DIRECTIONS,
  addCryptoColumn,
  altAddIcon,
  changePercentColumn,
  marketCapColumn,
  nameColumn,
  priceColumn,
  rankColumn,
  symbolColumn,
  vwapColumn,
} from "../constants";
import { formatCellPrice } from "../utils/formatCellPrice";
import addIcon from "../icons/plus_add_icon1.svg";
import styles from "../styles/MainPage.module.scss";

const { positiveNumb, negativeNumb, symbol, pointer, addIconClass } = styles;

const refetchInterval: number = 5000;

export const MainPage: FC = () => {
  const { data: cryptos, isLoading } = useGetCryptosQuery("", {
    pollingInterval: refetchInterval,
  });

  const { navigateTo } = useNavigateHook();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Nullable<cryptos>>(null);

  const getFormatChangePercent = (percent: string): ReactElement => (
    <span className={`${Number(percent) >= 0 ? positiveNumb : negativeNumb}`}>
      {formatCellPrice(percent, true)}
      {PERCENT_SIGN}
    </span>
  );

  const dataTable = cryptos?.data?.map(
    ({
      id,
      rank,
      name,
      symbol,
      priceUsd,
      marketCapUsd,
      vwap24Hr,
      changePercent24Hr,
    }: cryptos) => ({
      key: id,
      rank,
      name,
      symbol,
      priceUsd,
      marketCapUsd,
      vwap24Hr,
      changePercent24Hr,
    })
  ) as cryptos[];

  const addCurrency = (
    record: cryptos
  ): MouseEventHandler<HTMLImageElement> | void => {
    setSelectedCrypto(record);
    setOpenModal(!openModal);
  };

  const columns: ColumnsType<cryptos> = [
    {
      title: rankColumn.title,
      dataIndex: rankColumn.dataIndex,
      align: CENTER_ALIGN,
      key: rankColumn.key,
      responsive: ["lg"],
    },
    {
      title: symbolColumn.title,
      dataIndex: symbolColumn.dataIndex,
      align: CENTER_ALIGN,
      key: symbolColumn.key,
      responsive: ["lg"],
      className: symbol,
    },
    {
      title: nameColumn.title,
      dataIndex: nameColumn.dataIndex,
      align: CENTER_ALIGN,
      key: nameColumn.key,
    },
    {
      title: vwapColumn.title,
      dataIndex: vwapColumn.dataIndex,
      align: CENTER_ALIGN,
      key: vwapColumn.key,
      responsive: ["md"],
      render: (record: string | number) => formatCellPrice(record, true),
    },
    {
      title: changePercentColumn.title,
      dataIndex: changePercentColumn.dataIndex,
      align: CENTER_ALIGN,
      key: changePercentColumn.key,
      responsive: ["sm"],
      sorter: (a, b) => +a.changePercent24Hr - +b.changePercent24Hr,
      render: getFormatChangePercent,
    },
    {
      title: marketCapColumn.title,
      dataIndex: marketCapColumn.dataIndex,
      align: CENTER_ALIGN,
      key: marketCapColumn.key,
      responsive: ["md"],
      render: (record: string | number) => formatCellPrice(record, true),
    },
    {
      title: priceColumn.title,
      dataIndex: priceColumn.dataIndex,
      align: CENTER_ALIGN,
      key: priceColumn.key,
      sorter: (a, b) => +a.priceUsd - +b.priceUsd,
      render: (record: string | number) => formatCellPrice(record, true),
    },
    {
      title: addCryptoColumn.title,
      dataIndex: addCryptoColumn.dataIndex,
      key: addCryptoColumn.key,
      align: CENTER_ALIGN,
      onCell: record => ({
        onClick: event => {
          event.stopPropagation();
          addCurrency(record);
        },
      }),
      render: () => (
        <img className={addIconClass} src={addIcon} alt={altAddIcon} />
      ),
    },
  ];

  return (
    <main>
      <Table
        loading={isLoading}
        pagination={{ position: ["bottomCenter"], size: "default" }}
        bordered={true}
        dataSource={dataTable}
        columns={columns}
        size="middle"
        sortDirections={SORT_DIRECTIONS}
        rowClassName={pointer}
        onRow={crypto => ({
          onClick: () => navigateTo(`/${crypto.key}`),
        })}
      />
      <BuyCryptoModal
        selectedCrypto={selectedCrypto}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </main>
  );
};
