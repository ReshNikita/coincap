import { FC, Dispatch, SetStateAction, useState } from "react";
import { InputNumberProps, Modal } from "antd";
import { QuantityInput } from "./QuantityInput";
import { useAppDispatch } from "../redux/hooks";
import { addCrypto } from "../redux/walletSlice";
import { Nullable, cryptos } from "../types";
import { MODAL_TITLE } from "../constants";

type BuyCryptoModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  selectedCrypto: Nullable<cryptos>;
};

const defaultAmount: number = 0;
const modalWidth: number = 800;

export const BuyCryptoModal: FC<BuyCryptoModalProps> = ({
  openModal,
  setOpenModal,
  selectedCrypto,
}) => {
  const handleCancel = (): void => setOpenModal(!openModal);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>(defaultAmount);

  const addToCart = (): void => {
    if (selectedCrypto) {
      const { name, key, priceUsd } = selectedCrypto;
      const addedCrypto = {
        name,
        key,
        price: priceUsd,
        amount,
        total: amount * Number(priceUsd),
      };
      amount > 0 && dispatch(addCrypto(addedCrypto));
      setOpenModal(!openModal);
      setAmount(defaultAmount);
    }
  };
  const onChange: InputNumberProps["onChange"] = value =>
    setAmount(value as number);
  return (
    <Modal
      open={openModal}
      onCancel={handleCancel}
      title={MODAL_TITLE}
      width={modalWidth}
      centered={true}
      footer={null}
    >
      <QuantityInput
        amount={amount}
        onChange={onChange}
        addToCart={addToCart}
      />
    </Modal>
  );
};
