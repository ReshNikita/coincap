import { FC, useEffect } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeCrypto } from "../redux/walletSlice";
import {
  deleteButtonAlt,
  walletAmountColumn,
  walletDeleteColumn,
  walletEmpty,
  walletNameColumn,
  walletPriceColumn,
  walletTotalColumn,
} from "../constants";
import deleteIcon from "../icons/delete_icon.svg";
import { CurrencyCountType } from "../types";
import { formatCellPrice } from "../utils/formatCellPrice";
import styles from "../styles/WalletTable.module.scss";

const { deleteIconClass, walletEmptyHeading, walletEmptyBlock } = styles;
const minTotal: number = 0;

type WalletTableProps = {
  handleTotalChange: (total: number) => void;
};
export const WalletTable: FC<WalletTableProps> = ({ handleTotalChange }) => {
  const walletCurrencies = useAppSelector(state => state.wallet.currencies);
  const dispatch = useAppDispatch();

  const total = walletCurrencies.reduce(
    (acc, currency) => acc + currency.total,
    0
  );
  useEffect(() => {
    handleTotalChange(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletCurrencies]);

  const columns: ColumnsType<CurrencyCountType> = [
    walletNameColumn,
    {
      title: walletPriceColumn.title,
      dataIndex: walletPriceColumn.dataIndex,
      key: walletPriceColumn.key,
      responsive: ["md"],
      render: (price: number) => formatCellPrice(price, true),
    },
    walletAmountColumn,
    {
      title: walletTotalColumn.title,
      dataIndex: walletTotalColumn.dataIndex,
      key: walletTotalColumn.key,
      responsive: ["sm"],
      render: (total: number) => formatCellPrice(total, true),
    },
    {
      title: walletDeleteColumn.title,
      dataIndex: walletDeleteColumn.dataIndex,
      key: walletDeleteColumn.key,
      render: () => (
        <img
          src={deleteIcon}
          alt={deleteButtonAlt}
          className={deleteIconClass}
        />
      ),
      onCell: (crypto: CurrencyCountType) => ({
        onClick: () => dispatch(removeCrypto(crypto)),
      }),
    },
  ];

  return total === minTotal ? (
    <div className={walletEmptyBlock}>
      <h2 className={walletEmptyHeading}>{walletEmpty}</h2>
    </div>
  ) : (
    <Table pagination={false} columns={columns} dataSource={walletCurrencies} />
  );
};
