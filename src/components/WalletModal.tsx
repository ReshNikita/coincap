import { Modal } from "antd";
import {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  ReactElement,
  useEffect,
} from "react";
import { WalletTable } from "./WalletTable";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { walletModalTitle, totalSumHeading, PERCENT_SIGN } from "../constants";
import { formatCellPrice } from "../utils/formatCellPrice";
import styles from "../styles/WalletModal.module.scss";
import { loadState, saveState } from "../redux/walletSlice";

const { positiveNumb, negativeNumb, modalTitle, walletModalBlock } = styles;
const modalWidth: number = 700;
type WalletModalProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export const WalletModal: FC<WalletModalProps> = ({ visible, setVisible }) => {
  const [total, setTotal] = useState<number>(0);
  const [previousTotal, setPreviousTotal] = useState<number>(0);
  const handleTotalChange = (value: number) => {
    setPreviousTotal(total);
    setTotal(value);
  };
  const { totalQuantity } = useAppSelector(state => state.wallet);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(saveState());
  }, [dispatch, totalQuantity]);

  const latestTransaction = (totalQuantity - previousTotal).toFixed(2);
  let percent = +((+latestTransaction / previousTotal) * 100).toFixed(2);
  if (previousTotal === 0) percent = 100;
  if (+latestTransaction === 0) percent = 100;
  if (totalQuantity === 0 && +latestTransaction === 0) percent = 0;

  const getFormatChangePercent = (percent: string | number): ReactElement => (
    <span className={`${Number(percent) >= 0 ? positiveNumb : negativeNumb}`}>
      {formatCellPrice(percent, false)}
      {PERCENT_SIGN}
    </span>
  );

  return (
    <Modal
      open={visible}
      title={<h2 className={modalTitle}>{walletModalTitle}</h2>}
      onCancel={() => setVisible(!visible)}
      footer={null}
      width={modalWidth}
    >
      <WalletTable handleTotalChange={handleTotalChange} />
      <div className={walletModalBlock}>
        <h2>
          {totalSumHeading}
          {formatCellPrice(totalQuantity, true)}
        </h2>
        <h2>
          <span
            className={`${
              Number(latestTransaction) >= 0 ? positiveNumb : negativeNumb
            }`}
          >
            {formatCellPrice(latestTransaction, true)}
          </span>
          &nbsp;
          <span>{getFormatChangePercent(percent)}</span>
        </h2>
      </div>
    </Modal>
  );
};
