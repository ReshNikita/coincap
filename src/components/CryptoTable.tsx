import { FC, MouseEventHandler, ReactElement, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BuyCryptoModal } from "./BuyCryptoModal";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { useGetCryptosQuery } from "../api/coincapApi";
import { Nullable, cryptos } from "../types";
import {
  BASE_URL,
  CENTER_ALIGN,
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
import styles from "../styles/CryptoTable.module.scss";

const refetchInterval: number = 5000;

export const CryptoTable: FC = () => {
  const { data: cryptos, isLoading } = useGetCryptosQuery("", {
    pollingInterval: refetchInterval,
  });
  const { navigateTo } = useNavigateHook();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Nullable<cryptos>>(null);

  const getFormatChangePercent = (percent: string): ReactElement => (
    <span
      className={`${
        Number(percent) >= 0 ? styles.positiveNumb : styles.negativeNumb
      }`}
    >
      {formatCellPrice(+percent)}
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
      className: styles.symbol,
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
      render: formatCellPrice,
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
      render: formatCellPrice,
    },
    {
      title: priceColumn.title,
      dataIndex: priceColumn.dataIndex,
      align: CENTER_ALIGN,
      key: priceColumn.key,
      sorter: (a, b) => +a.priceUsd - +b.priceUsd,
      render: formatCellPrice,
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
        <img className={styles.addIcon} src={addIcon} alt={altAddIcon} />
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
        sortDirections={SORT_DIRECTIONS}
        rowClassName={styles.pointer}
        onRow={crypto => ({
          onClick: () => navigateTo(`${BASE_URL}/${crypto.key}`),
        })}
      />
      <BuyCryptoModal
        selectedCrypto={selectedCrypto}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
