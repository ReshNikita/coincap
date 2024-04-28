import { FC, Dispatch, SetStateAction, useState } from "react";
import { Button, Input, Modal } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { addCrypto } from "../redux/walletSlice";

type BuyCryptoModalProps = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  selectedCrypto: any;
};

export const BuyCryptoModal: FC<BuyCryptoModalProps> = ({
  openModal,
  setOpenModal,
  selectedCrypto,
}) => {
  const handleCancel = () => setOpenModal(false);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState<number>(0);
  const addToCart = () => {
    const newCrypto = {
      name: selectedCrypto.name,
      key: selectedCrypto.key,
      price: selectedCrypto.priceUsd,
      amount,
      total: amount * selectedCrypto.priceUsd,
    };
    dispatch(addCrypto(newCrypto));
  };

  return (
    <>
      <Modal
        open={openModal}
        title={`Buy crypto`}
        style={{ textAlign: "center" }}
        centered={true}
        width={800}
        onCancel={handleCancel}
        footer={[
          <div
            key={Math.random()}
            style={{ display: "flex", justifyContent: "center", gap: 40 }}
          >
            <Button onClick={addToCart} key="submit" type="primary">
              Submit
            </Button>
            <Button key="back" onClick={handleCancel}>
              Back
            </Button>
          </div>,
        ]}
      >
        <Input
          style={{ width: "50%" }}
          size="large"
          type="number"
          placeholder="Type quantity..."
          value={amount}
          onChange={e => setAmount(+e.target.value)}
          pattern="[0-9]*"
        />
      </Modal>
    </>
  );
};
