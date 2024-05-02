import { Modal } from "antd";
import { FC, useState, Dispatch, SetStateAction, ReactElement } from "react";
import { WalletTable } from "./WalletTable";
import { useAppSelector } from "../redux/hooks";
import { modalTitle, totalSumHeading } from "../constants";
import styles from "../styles/WalletModal.module.scss";
import { formatCellPrice } from "../utils/formatCellPrice";

type WalletModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const WalletModal: FC<WalletModalProps> = ({ visible, setVisible }) => {
  const [total, setTotal] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(0);
  const handleTotalChange = (value: number) => {
    setPreviousTotal(total);
    setTotal(value);
  };

  const { totalQuantity } = useAppSelector(state => state.wallet);

  const slash = (n: number) => Math.round(n * 1000) / 1000;

  const totalSum = slash(totalQuantity);
  const difResult = slash(totalSum - previousTotal);
  const difference = difResult > 0 ? "+" + difResult : difResult;
  const percentageChange = slash(
    (totalSum - previousTotal / previousTotal) * 100
  );

  const getFormatChangePercent = (percent: string | number): ReactElement => (
    <span
      className={`${
        Number(percent) >= 0 ? styles.positiveNumb : styles.negativeNumb
      }`}
    >
      {formatCellPrice(+percent)}
    </span>
  );

  return (
    <Modal
      open={visible}
      title={<h2 className={styles.modalTitle}>{modalTitle}</h2>}
      onCancel={() => setVisible(!visible)}
      footer={null}
      width={700}
    >
      <WalletTable handleTotalChange={handleTotalChange} />
      <h2>
        {totalSumHeading}
        <span>{totalSum} </span>
      </h2>
      <h3>
        <span>{getFormatChangePercent(difference)}$</span> (
        {isNaN(percentageChange) ? 0 : percentageChange}%)
      </h3>
    </Modal>
  );
};
