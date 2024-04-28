import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import millify from "millify";
import { Table } from "antd";
import { removeCrypto } from "../redux/walletSlice";

type WalletTableProps = {
  handleTotalChange: (total: any) => void;
};
export const WalletTable: FC<WalletTableProps> = ({ handleTotalChange }) => {
  const walletItems = useAppSelector(state => state.wallet.currencies);
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: any) => millify(text),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text: any) => <h4>${Math.round(text * 1000) / 1000}</h4>,
    },
    {
      title: "Sell",
      dataIndex: "sell",
      key: "sell",
      render: () => <button>remove</button>,
      onCell: (record: any) => ({
        onClick: () => dispatch(removeCrypto(record)),
      }),
    },
  ];

  const data = walletItems;
  const total = data.reduce((acc, item) => acc + item.total, 0);
  useEffect(() => {
    handleTotalChange(total);
  }, [data]);

  return total === 0 ? (
    <div style={{ padding: "30px 0 60px 0" }}>
      <h1>Your wallet is empty.</h1>
      <h2>Please choose the crypto and enter an amount to buy.</h2>
    </div>
  ) : (
    <Table pagination={false} columns={columns} dataSource={data} />
  );
};
