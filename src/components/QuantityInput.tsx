import { FC, useEffect, useRef } from "react";
import { InputNumber } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { Button } from "./Button";
import {
  buyButton,
  inputNumberPattern,
  inputNumberPlaceholder,
} from "../constants";
import styles from "../styles/QuantityInput.module.scss";

type QuantityInputProps = {
  amount: number;
  onChange: (value: valueType | null) => void;
  addToCart: () => void;
};

export const QuantityInput: FC<QuantityInputProps> = ({
  amount,
  onChange,
  addToCart,
}) => {
  const inputFocus = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputFocus.current && inputFocus.current.focus();
  }, []);
  return (
    <div className={styles.quantutyInputBlock}>
      <InputNumber
        size="large"
        type="number"
        className={styles.inputNumber}
        value={amount}
        onChange={onChange}
        pattern={inputNumberPattern}
        placeholder={inputNumberPlaceholder}
        onPressEnter={addToCart}
        ref={inputFocus}
      />
      <Button
        text={buyButton}
        onClick={addToCart}
        className={styles.buyCryptoButton}
      />
    </div>
  );
};
