import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { cryptoHistoryType } from "../types";
import { LineChartDataSets, LineChartOptionsTitle } from "../constants";
import styles from "../styles/LineChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type LineChartProps = {
  cryptoHistory: cryptoHistoryType;
  currentPrice: string;
  cryptoName: string;
};

const { priceChartOption, currentPriceOption, fontSizeOption, colorOption } =
  LineChartOptionsTitle;
const { label, backgroundColor, borderColor } = LineChartDataSets;

export const LineChart: FC<LineChartProps> = ({
  cryptoHistory,
  currentPrice,
  cryptoName,
}) => {
  const cryptoPrice: number[] = [];
  const cryptoTimestamp: string[] = [];
  for (let i = 0; i < cryptoHistory?.data?.length; i += 1) {
    cryptoPrice.push(Number(cryptoHistory.data[i].priceUsd));
    cryptoTimestamp.push(
      new Date(cryptoHistory.data[i].time).toLocaleDateString()
    );
  }
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "rgba(255,99,132,0.2)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: [
          cryptoName + priceChartOption,
          currentPriceOption + currentPrice,
        ],
        font: {
          size: fontSizeOption,
        },
        color: colorOption,
      },
    },
  };

  const cryptoData = {
    labels: cryptoTimestamp,
    datasets: [
      {
        label,
        data: cryptoPrice,
        backgroundColor,
        borderColor,
      },
    ],
  };

  return <Line data={cryptoData} options={options} className={styles.line} />;
};
