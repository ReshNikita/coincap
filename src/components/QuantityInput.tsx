import { InputNumber } from "antd";
import { FC, useEffect, useRef } from "react";
import { Button } from "./Button";
import { valueType } from "antd/es/statistic/utils";

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
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InputNumber
        size="large"
        type="number"
        style={{ marginBottom: "10px", width: "50%" }}
        value={amount}
        onChange={onChange}
        pattern="[0-9]*"
        placeholder="Type quantity..."
        onPressEnter={addToCart}
        ref={inputFocus}
      />
      <Button text="Buy" onClick={addToCart} className="buyCryptoButton" />
    </div>
  );
};
