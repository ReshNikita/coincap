import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, Table, Select, InputNumberProps } from "antd";
import millify from "millify";
import { LineChart } from "./LineChart";
import { QuantityInput } from "./QuantityInput";
import { Button } from "../components/Button";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../api/coincapApi";
import { addCrypto } from "../redux/walletSlice";
import { useAppDispatch } from "../redux/hooks";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { formatCellPrice } from "../utils/formatCellPrice";
import { cryptos } from "../types";
import {
  BACK_BUTTON,
  BASE_URL,
  ENTER_QUANTITY,
  Intervals,
  PERCENT_SIGN,
  avgPriceRow,
  costRow,
  currencyDetailsColumn,
  goodsVolumeRow,
  infoColumn,
  issuedAssets,
  offerRow,
  percantageChangeRow,
  selectOptions,
  websiteRow,
} from "../constants";
import styles from "../styles/Crypto.module.scss";

const { Title } = Typography;
const defaultAmount: number = 0;

export const Crypto: FC = () => {
  const { navigateTo } = useNavigateHook();
  const { id } = useParams();
  const [interval, setInterval] = useState(Intervals.DAY);
  const { data, isLoading } = useGetCryptoDetailQuery(id);
  const { data: cryptoHistory } = useGetCryptoHistoryQuery({
    id,
    interval,
  });
  const [amount, setAmount] = useState<number>(defaultAmount);
  const dispatch = useAppDispatch();
  const cryptoDetails: cryptos = data?.data;

  const {
    priceUsd,
    supply,
    maxSupply,
    volumeUsd24Hr,
    vwap24Hr,
    changePercent24Hr,
    explorer,
    symbol,
    name,
  } = cryptoDetails || {};

  const columns = [infoColumn, currencyDetailsColumn];

  const cryptoDetailsDataSource = [
    {
      info: costRow.info,
      key: costRow.key,
      details: formatCellPrice(priceUsd),
    },
    {
      info: offerRow.info,
      key: offerRow.key,
      details: formatCellPrice(supply).slice(1),
    },
    {
      info: issuedAssets.info,
      key: issuedAssets.key,
      details: formatCellPrice(maxSupply).slice(1),
    },
    {
      info: goodsVolumeRow.info,
      key: goodsVolumeRow.key,
      details: formatCellPrice(volumeUsd24Hr).slice(1),
    },
    {
      info: avgPriceRow.info,
      key: avgPriceRow.key,
      details: formatCellPrice(vwap24Hr),
    },
    {
      info: percantageChangeRow.info,
      key: percantageChangeRow.key,
      details: (
        <span
          className={`${
            Number(changePercent24Hr) >= 0
              ? styles.positiveNumb
              : styles.negativeNumb
          }`}
        >
          {formatCellPrice(changePercent24Hr).slice(1)}
          {PERCENT_SIGN}
        </span>
      ),
    },
    {
      info: websiteRow.info,
      key: websiteRow.key,
      details: (
        <a
          href={explorer}
          rel="noreferrer"
          target="_blank"
          className={styles.webSiteLink}
        >
          {explorer}
        </a>
      ),
    },
  ];

  const onChange: InputNumberProps["onChange"] = value =>
    setAmount(value as number);

  const addToCart = (): void => {
    const { name, id, priceUsd } = cryptoDetails;
    if (cryptoDetails) {
      const addedCrypto = {
        name,
        key: id,
        price: priceUsd,
        amount,
        total: amount * Number(priceUsd),
      };
      dispatch(addCrypto(addedCrypto));
      setAmount(defaultAmount);
    }
  };
  return (
    <main>
      <div className={styles.cryptoTitle}>
        <Title type="danger">
          <span className={styles.cryptoTitle_symbol}> {symbol}</span>
          {name}
        </Title>
      </div>
      <div className={styles.cryptoCardBlock}>
        <Card
          loading={isLoading}
          title={ENTER_QUANTITY}
          bordered={false}
          className={styles.cryptoCardBlock_card}
        >
          <QuantityInput
            onChange={onChange}
            amount={amount}
            addToCart={addToCart}
          />
        </Card>
      </div>
      <Table
        bordered
        loading={isLoading}
        size="small"
        columns={columns}
        dataSource={cryptoDetailsDataSource}
        pagination={false}
      />
      <div className={styles.selectBlock}>
        <Select
          options={selectOptions}
          defaultValue={interval}
          loading={isLoading}
          onChange={value => setInterval(value)}
          dropdownStyle={{ width: "20em" }}
        />
      </div>
      <LineChart
        cryptoHistory={cryptoHistory}
        currentPrice={millify(Number(priceUsd))}
        cryptoName={name}
      />
      <div className={styles.backButtonBlock}>
        <Button
          onClick={() => navigateTo(BASE_URL)}
          className={styles.backButton}
          text={BACK_BUTTON}
        />
      </div>
    </main>
  );
};
