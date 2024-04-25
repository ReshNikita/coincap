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
  cryptoHistory: any;
  currentPrice: string;
  cryptoName: string;
};

export const LineChart: FC<LineChartProps> = ({
  cryptoHistory,
  currentPrice,
  cryptoName,
}) => {
  const cryptoPrice: number[] = [];
  const cryptoTimestamp: string[] = [];
  for (let i = 0; i < cryptoHistory?.data?.length; i += 1) {
    cryptoPrice.push(cryptoHistory.data[i].priceUsd);
    cryptoTimestamp.push(
      new Date(cryptoHistory.data[i].time).toLocaleDateString()
    );
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: [cryptoName + " price chart", "Current price: $" + currentPrice],
        font: {
          size: 20,
        },
        color: "#ff4d4f",
      },
    },
  };

  const data = {
    labels: cryptoTimestamp,
    datasets: [
      {
        label: "Price in usd",
        data: cryptoPrice,
        backgroundColor: "#673fd7",
        borderColor: "#673fd7",
      },
    ],
  };

  return (
    <Line
      data={data}
      options={options}
      style={{
        padding: "15px",
      }}
    />
  );
};
