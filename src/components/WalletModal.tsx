import { Modal } from "antd";
import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { WalletTable } from "./WalletTable";
import { useAppSelector } from "../redux/hooks";

type WalletModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  //   onTotalSumChange: (value: number) => void;
};

export const WalletModal: FC<WalletModalProps> = ({
  visible,
  //   onTotalSumChange,
  setVisible,
}) => {
  const [total, setTotal] = useState(0);
  const [previousTotal, setPreviousTotal] = useState(0);
  const handleTotalChange = (value: number) => {
    setPreviousTotal(total);
    setTotal(value);
  };

  let { totalQuantity } = useAppSelector(state => state.wallet);

  const slash = (n: number) => Math.round(n * 1000) / 1000;

  //   const totalSum = slash(total);
  const difResult = slash(total - previousTotal);
  const difference = difResult > 0 ? "+" + difResult : difResult;
  const percentageChange = slash((total - previousTotal / previousTotal) * 100);

  //   useEffect(() => {
  //     onTotalSumChange(totalSum);
  //   }, [totalSum, onTotalSumChange]);
  return (
    <Modal
      open={visible}
      title="Wallet Info"
      onCancel={() => setVisible(!visible)}
      footer={null}
      width={700}
    >
      <h2>
        Total sum: <span>${totalQuantity} </span>
      </h2>
      <h3>
        Latest transaction: <span>{difference}$</span> (
        {isNaN(percentageChange) ? 0 : percentageChange}%)
      </h3>
      <WalletTable handleTotalChange={handleTotalChange} />
    </Modal>
  );
};
