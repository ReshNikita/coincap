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
import { Nullable, cryptos } from "../types/types";
import {
  BASE_URL,
  CENTER_ALIGN,
  CRYPTO_TABLE_CONSTANTS,
  DOLLAR_SIGN,
} from "../constants/constants";
import { formatPrice } from "../utils/formatPrice";
import addIcon from "../icons/plus_add_icon1.svg";

export const CryptoTable: FC = () => {
  const { data: cryptos, isLoading, refetch } = useGetCryptosQuery("");
  const { navigateTo } = useNavigateHook();
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => refetch(), 10000);
    return () => clearInterval(interval);
  }, [refetch]);

  const formatCellPrice = (price: string): string =>
    DOLLAR_SIGN + formatPrice(price);

  const getFormatChangePercent = (percent: string): ReactElement => (
    <span
      className={`${Number(percent) >= 0 ? "positiveNumb" : "negativeNumb"}`}
    >
      {DOLLAR_SIGN + formatPrice(percent)}
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

  const {
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
  const [selectedCrypto, setSelectedCrypto] = useState<Nullable<cryptos>>(null);

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
    {
      title: vwapColumn.title,
      dataIndex: vwapColumn.dataIndex,
      align: CENTER_ALIGN,
      key: vwapColumn.key,
      render: formatCellPrice,
    },
    {
      title: changePercentColumn.title,
      dataIndex: changePercentColumn.dataIndex,
      align: CENTER_ALIGN,
      key: changePercentColumn.key,
      render: getFormatChangePercent,
    },
    {
      title: marketCapColumn.title,
      dataIndex: marketCapColumn.dataIndex,
      align: CENTER_ALIGN,
      key: marketCapColumn.key,
      render: formatCellPrice,
    },
    {
      title: priceColumn.title,
      dataIndex: priceColumn.dataIndex,
      align: CENTER_ALIGN,
      key: priceColumn.key,
      render: formatCellPrice,
    },
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
