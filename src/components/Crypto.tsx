import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../api/coincapApi";
import { Typography, Card, InputNumber, Table, Select } from "antd";
import { Button } from "../components/Button";
import { useNavigateHook } from "../hooks/useNavigateHook";
import millify from "millify";
import { LineChart } from "./LineChart";

const { Title } = Typography;
const { Option } = Select;

export const Crypto: FC = () => {
  const { navigateTo } = useNavigateHook();
  const { id } = useParams();
  const [interval, setInterval] = useState("m1");
  const { data, isLoading } = useGetCryptoDetailQuery(id);
  const { data: cryptoHistory } = useGetCryptoHistoryQuery({ id, interval });
  const cryptoDetails = data?.data;
  const intervals = ["m1", "m5", "m15", "m30", "h1", "h2", "h6", "h12", "d1"];
  const columns = [
    {
      title: "Info",
      key: "info",
      dataIndex: "info",
    },
    {
      title: "Currency details",
      key: "details",
      dataIndex: "details",
    },
  ];

  const cryptoDetailsDataSource = [
    {
      info: "Cost",
      key: "info",
      details: millify(Number(cryptoDetails?.priceUsd)) + " $",
    },
    {
      info: "Available offer for trading",
      key: "details",
      details: millify(Number(cryptoDetails?.supply)),
    },
    {
      info: "Total number of issued assets",
      key: "issued",
      details: millify(Number(cryptoDetails?.maxSupply)),
    },
    {
      info: "Volume of goods for the last 24 hours",
      key: "volume",
      details: millify(Number(cryptoDetails?.volumeUsd24Hr)),
    },
    {
      info: "Average price by volume over the last 24 hours",
      key: "avgPrice",
      details: millify(Number(cryptoDetails?.vwap24Hr)) + " $",
    },
    {
      info: "Percentage change in price over the last 24 hours",
      key: "percantage",
      details: (
        <span
          className={`${
            Number(cryptoDetails?.changePercent24Hr) >= 0
              ? "positiveNumb"
              : "negativeNumb"
          }`}
        >
          {millify(Number(cryptoDetails?.changePercent24Hr))} %
        </span>
      ),
    },
    {
      info: "Website",
      key: "website",
      details: (
        <a
          style={{ textDecoration: "underline" }}
          href={cryptoDetails?.explorer}
          rel="noreferrer"
          target="_blank"
        >
          {cryptoDetails?.explorer}
        </a>
      ),
    },
  ];
  return (
    <main>
      <div className="cryptoTitle">
        <Title type="danger">
          <span className="cryptoTitle_symbol"> {cryptoDetails?.symbol}</span>
          {cryptoDetails?.name}
        </Title>
      </div>
      <div className="cryptoCardBlock">
        <Card
          loading={isLoading}
          title="Enter quantity:"
          bordered={false}
          style={{ width: 300, textAlign: "center", marginBottom: "15px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputNumber
              autoFocus={true}
              min={0}
              type="number"
              status="error"
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <Button
              text="Buy"
              // onClick={() => }
              className="buyCryptoButton"
            />
          </div>
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Select
          defaultValue={interval}
          placeholder="Select time period"
          onChange={value => setInterval(value)}
          dropdownStyle={{ width: "20em" }}
        >
          {intervals.map(date => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
      </div>
      <LineChart
        cryptoHistory={cryptoHistory}
        currentPrice={millify(Number(cryptoDetails?.priceUsd))}
        cryptoName={cryptoDetails?.name}
      />
      <div className="backButtonBlock">
        <Button
          onClick={() => navigateTo("/coincap")}
          className="backButton"
          text="Back"
        />
      </div>
    </main>
  );
};
