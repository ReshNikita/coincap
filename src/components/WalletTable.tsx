import { FC, useEffect } from "react";
import { Table } from "antd";
import millify from "millify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeCrypto } from "../redux/walletSlice";
import { deleteButtonAlt, walletEmpty } from "../constants";
import deleteIcon from "../icons/delete_icon.svg";
import { ColumnsType } from "antd/es/table";
import { CurrencyCountType } from "../types";
import styles from "../styles/WalletTable.module.scss";

type WalletTableProps = {
  handleTotalChange: (total: number) => void;
};
export const WalletTable: FC<WalletTableProps> = ({ handleTotalChange }) => {
  const walletItems = useAppSelector(state => state.wallet.currencies);
  const dispatch = useAppDispatch();

  const columns: ColumnsType<CurrencyCountType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["md"],
      render: (text: number) => millify(text),
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
      responsive: ["sm"],
      render: (text: any) => <h4>${Math.round(text * 1000) / 1000}</h4>,
    },
    {
      title: "Sell",
      dataIndex: "sell",
      key: "sell",
      render: () => (
        <img
          src={deleteIcon}
          alt={deleteButtonAlt}
          className={styles.deleteIcon}
        />
      ),
      onCell: (record: CurrencyCountType) => ({
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
      <h1 className={styles.walletEmptyHeading}>{walletEmpty}</h1>
    </div>
  ) : (
    <Table pagination={false} columns={columns} dataSource={data} />
  );
};
