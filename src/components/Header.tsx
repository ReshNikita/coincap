import { FC, useState } from "react";
import { Switch, Typography } from "antd";
import { WalletModal } from "./WalletModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTheme } from "../redux/themeSlice";
import { useGetCryptosQuery } from "../api/coincapApi";
import { cryptos } from "../types";
import { HEADER_CONSTANTS } from "../constants";
import walletLogo from "../icons/wallet.svg";
import { formatCellPrice } from "../utils/formatCellPrice";
import styles from "../styles/Header.module.scss";

const { Title, Text } = Typography;
const { popular_crypto, total, usd, altWalletImg } = HEADER_CONSTANTS;
const firstPopularCrypto: number = 0;
const thirdPopularCrypto: number = 3;

export const Header: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  const { totalQuantity } = useAppSelector(state => state.wallet);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { data: cryptos } = useGetCryptosQuery("");

  const popularCrypto = cryptos?.data
    ?.map(({ id, name, priceUsd }: cryptos) => (
      <div className={styles.popularCryptoBlocks} key={id}>
        <h3>{name}</h3>
        <Text italic>{formatCellPrice(+priceUsd)}</Text>
      </div>
    ))
    .slice(firstPopularCrypto, thirdPopularCrypto);

  return (
    <header>
      <div className={`${darkTheme && styles.dark}`}>
        <Title level={3}>
          <Text underline>{popular_crypto}</Text>
        </Title>
        <div className={styles.popularCrypto}>{popularCrypto}</div>
      </div>
      <Switch
        checkedChildren="Dark"
        unCheckedChildren="Light"
        onChange={() => {
          dispatch(toggleTheme());
        }}
        className={
          darkTheme
            ? styles.popularCrypto_switch_light
            : styles.popularCrypto_switch
        }
      />
      <div className={`${styles.total_block} ${darkTheme && styles.dark}`}>
        <img
          onClick={() => setVisible(!visible)}
          src={walletLogo}
          alt={altWalletImg}
          className={styles.total_block_image}
        />
        <div className={styles.total}>
          <h2>{total}</h2>
          <p>
            {formatCellPrice(totalQuantity)}
            &nbsp;{usd}
          </p>
        </div>
      </div>
      <WalletModal visible={visible} setVisible={setVisible} />
    </header>
  );
};
