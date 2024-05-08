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

const { positiveNumb, negativeNumb, symbol, pointer, addIconClass, mainBlock } =
  styles;

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
      ...rankColumn,
      align: CENTER_ALIGN,
      responsive: ["lg"],
    },
    {
      ...symbolColumn,
      align: CENTER_ALIGN,
      responsive: ["lg"],
      className: symbol,
    },
    {
      ...nameColumn,
      align: CENTER_ALIGN,
    },
    {
      ...vwapColumn,
      align: CENTER_ALIGN,
      responsive: ["md"],
      render: (record: string | number) => formatCellPrice(record, true),
    },
    {
      ...changePercentColumn,
      align: CENTER_ALIGN,
      responsive: ["sm"],
      sorter: (a, b) => +a.changePercent24Hr - +b.changePercent24Hr,
      render: getFormatChangePercent,
    },
    {
      ...marketCapColumn,
      align: CENTER_ALIGN,
      responsive: ["md"],
      render: (record: string | number) => formatCellPrice(record, true),
    },
    {
      ...priceColumn,
      align: CENTER_ALIGN,
      sorter: (a, b) => +a.priceUsd - +b.priceUsd,
      render: (record: string | number) => formatCellPrice(record, true),
    },
    {
      ...addCryptoColumn,
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
    <main className={mainBlock}>
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
