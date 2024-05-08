import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, Table, Select, InputNumberProps } from "antd";
import { LineChart } from "../components/LineChart";
import { QuantityInput } from "../components/QuantityInput";
import { Button } from "../components/Button";
import { NotFoundPage } from "./NotFoundPage";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../api/coincapApi";
import { addCrypto } from "../redux/walletSlice";
import { useAppDispatch } from "../redux/hooks";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { formatCellPrice } from "../utils/formatCellPrice";
import { cryptoHistoryType, cryptos } from "../types";
import {
  BACK_BUTTON,
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
import styles from "../styles/CryptoPage.module.scss";

const { Title } = Typography;
const defaultAmount: number = 0;
const {
  backButton,
  positiveNumb,
  negativeNumb,
  webSiteLink,
  cryptoTitle_block,
  cryptoTitle_block_title,
  cryptoTitle_symbol,
  cryptoCardBlock,
  cryptoCardBlock_card,
  selectBlock,
  select,
  lineChartBlock,
  backButtonBlock,
} = styles;

export const CryptoPage: FC = () => {
  const { navigateTo } = useNavigateHook();
  const { id } = useParams<{ id: string }>();
  const [interval, setInterval] = useState(Intervals.DAY);
  const { data, isLoading, error } = useGetCryptoDetailQuery(id as string);
  const { data: cryptoHistory } = useGetCryptoHistoryQuery<{
    data: cryptoHistoryType;
  }>({
    id,
    interval,
  } as { id: string; interval: string });
  const [amount, setAmount] = useState<number>(defaultAmount);
  const dispatch = useAppDispatch();
  const cryptoDetails = data?.data as cryptos;

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
      ...costRow,
      details: formatCellPrice(priceUsd, true),
    },
    {
      ...offerRow,
      details: formatCellPrice(supply, false),
    },
    {
      ...issuedAssets,
      details: formatCellPrice(maxSupply, false),
    },
    {
      ...goodsVolumeRow,
      details: formatCellPrice(volumeUsd24Hr, false),
    },
    {
      ...avgPriceRow,
      details: formatCellPrice(vwap24Hr, true),
    },
    {
      ...percantageChangeRow,
      details: (
        <span
          className={`${
            Number(changePercent24Hr) >= 0 ? positiveNumb : negativeNumb
          }`}
        >
          {changePercent24Hr &&
            formatCellPrice(changePercent24Hr, false) + PERCENT_SIGN}
        </span>
      ),
    },
    {
      ...websiteRow,
      details: (
        <a
          href={explorer}
          rel="noreferrer"
          target="_blank"
          className={webSiteLink}
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
      amount > 0 && dispatch(addCrypto(addedCrypto));
      setAmount(defaultAmount);
    }
  };
  return error ? (
    <NotFoundPage />
  ) : (
    <main>
      <div className={cryptoTitle_block}>
        <Title level={2} type="danger" className={cryptoTitle_block_title}>
          <span className={symbol && cryptoTitle_symbol}>{symbol}</span>
          {name}
        </Title>
      </div>
      <div className={cryptoCardBlock}>
        <Card
          loading={isLoading}
          title={ENTER_QUANTITY}
          bordered={false}
          className={cryptoCardBlock_card}
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
      <div className={selectBlock}>
        <Select
          options={selectOptions}
          defaultValue={interval}
          loading={isLoading}
          onChange={value => setInterval(value)}
          className={select}
        />
      </div>
      <div className={lineChartBlock}>
        <LineChart
          cryptoHistory={cryptoHistory}
          currentPrice={formatCellPrice(priceUsd, false) as string}
          cryptoName={name}
        />
      </div>
      <div className={backButtonBlock}>
        <Button
          onClick={() => navigateTo("/")}
          className={backButton}
          text={BACK_BUTTON}
        />
      </div>
    </main>
  );
};
