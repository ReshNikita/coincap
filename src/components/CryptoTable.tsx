import {
  FC,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BuyCryptoModal } from "./BuyCryptoModal";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { useGetCryptosQuery } from "../api/coincapApi";
import { Nullable, cryptos } from "../types";
import {
  BASE_URL,
  CENTER_ALIGN,
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

const refetchInterval: number = 10000;

export const CryptoTable: FC = () => {
  const { data: cryptos, isLoading, refetch } = useGetCryptosQuery("");
  const { navigateTo } = useNavigateHook();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Nullable<cryptos>>(null);

  useEffect(() => {
    const interval = setInterval(() => refetch(), refetchInterval);
    return () => clearInterval(interval);
  }, [refetch]);

  const getFormatChangePercent = (percent: string): ReactElement => (
    <span
      className={`${Number(percent) >= 0 ? "positiveNumb" : "negativeNumb"}`}
    >
      {formatCellPrice(+percent)}
    </span>
  );

  const dataTable: cryptos[] = cryptos?.data?.map(
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
  );

  const addCurrency = (
    record: cryptos
  ): MouseEventHandler<HTMLImageElement> | void => {
    setSelectedCrypto(record);
    setOpenModal(!openModal);
  };

  const columns: ColumnsType<cryptos> = [
    rankColumn,
    symbolColumn,
    {
      title: nameColumn.title,
      dataIndex: nameColumn.dataIndex,
      align: CENTER_ALIGN,
      key: nameColumn.key,
      onCell: (crypto: cryptos) => ({
        onClick: () => navigateTo(`${BASE_URL}/${crypto.key}`),
      }),
    },
    vwapColumn,
    {
      title: changePercentColumn.title,
      dataIndex: changePercentColumn.dataIndex,
      align: CENTER_ALIGN,
      key: changePercentColumn.key,
      render: getFormatChangePercent,
    },
    marketCapColumn,
    priceColumn,
    {
      title: addCryptoColumn.title,
      key: addCryptoColumn.key,
      align: CENTER_ALIGN,
      render: () => (
        <img
          onClick={() => addCurrency}
          className="addIcon"
          src={addIcon}
          alt={altAddIcon}
        />
      ),
      onCell: (record: cryptos) => ({
        onClick: () => addCurrency(record),
      }),
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
      <BuyCryptoModal
        selectedCrypto={selectedCrypto}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
