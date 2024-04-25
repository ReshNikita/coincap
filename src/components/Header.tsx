import { FC } from "react";
import { POPULAR_CRYPTO } from "../constants/constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTheme } from "../redux/themeSlice";
import { Switch, Typography } from "antd";
import walletLogo from "../icons/wallet.svg";
import { useGetCryptosQuery } from "../api/coincapApi";
import { cryptos } from "../types/types";
import millify from "millify";

const { Title, Text } = Typography;

export const Header: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const { data: cryptos } = useGetCryptosQuery("");
  const popularCrypto = cryptos?.data
    ?.map((crypto: cryptos) => (
      <div className="popularCryptoBlocks" key={crypto.id}>
        <h3>{crypto.name}</h3>
        <Text italic>
          $
          {millify(Number(crypto.priceUsd), {
            units: ["", "B", "M", "K", "T"],
            precision: 2,
            lowercase: true,
          })}
        </Text>
      </div>
    ))
    .slice(0, 3);

  return (
    <header>
      <div className={`popularCrypto_block ${darkTheme && "dark"}`}>
        <Title level={3}>
          <Text underline>{POPULAR_CRYPTO}</Text>
        </Title>
        <div className="popularCrypto">{popularCrypto}</div>
      </div>
      <Switch
        checkedChildren="Dark"
        unCheckedChildren="Light"
        onChange={() => dispatch(toggleTheme())}
        style={{
          backgroundColor: `${darkTheme ? "#420d55" : "#636060"}`,
        }}
      />
      <div className={`total_block ${darkTheme && "dark"}`}>
        <img src={walletLogo} alt="wallet" width={"50px"} height={"50px"} />
        <div className="total">
          <h2>Total:</h2>
          <p>0 USD</p>
        </div>
      </div>
    </header>
  );
};
