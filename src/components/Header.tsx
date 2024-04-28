import { FC, useState } from "react";
import { Switch, Typography } from "antd";
import { WalletModal } from "./WalletModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTheme } from "../redux/themeSlice";
import { useGetCryptosQuery } from "../api/coincapApi";
import { cryptos } from "../types/types";
import { HEADER_CONSTANTS } from "../constants/constants";
import walletLogo from "../icons/wallet.svg";
import { formatPrice } from "../utils/formatPrice";

const { Title, Text } = Typography;

export const Header: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  const { totalQuantity } = useAppSelector(state => state.wallet);
  // const [_total, setTotal] = useState(0);
  const [visible, setVisible] = useState(false);
  // const handleCancel = () => setVisible(false);

  const { popular_crypto, total, usd, $, altWalletImg } = HEADER_CONSTANTS;

  // const handleTotalSumChange = (value: number) => setTotal(value);

  const dispatch = useAppDispatch();
  const { data: cryptos } = useGetCryptosQuery("");

  const popularCrypto = cryptos?.data
    ?.map((crypto: cryptos) => (
      <div className="popularCryptoBlocks" key={crypto.id}>
        <h3>{crypto.name}</h3>
        <Text italic>
          {$}
          {formatPrice(crypto.priceUsd)}
        </Text>
      </div>
    ))
    .slice(0, 3);

  return (
    <header>
      <div className={`popularCrypto_block ${darkTheme && "dark"}`}>
        <Title level={3}>
          <Text underline>{popular_crypto}</Text>
        </Title>
        <div className="popularCrypto">{popularCrypto}</div>
      </div>
      <Switch
        checkedChildren="Dark"
        unCheckedChildren="Light"
        onChange={() => {
          dispatch(toggleTheme());
        }}
        className={`popularCrypto_switch${darkTheme && "_light"}`}
      />
      <div className={`total_block ${darkTheme && "dark"}`}>
        <img
          onClick={() => setVisible(!visible)}
          src={walletLogo}
          alt={altWalletImg}
          className="total_block_image"
        />
        <div className="total">
          <h2>{total}</h2>
          <p>
            {formatPrice(totalQuantity)}
            &nbsp;{usd}
          </p>
        </div>
      </div>
      <WalletModal
        visible={visible}
        // onCancel={handleCancel}
        setVisible={setVisible}
        // onTotalSumChange={handleTotalSumChange}
      />
    </header>
  );
};
