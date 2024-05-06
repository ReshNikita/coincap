import { FC, useEffect, useState } from "react";
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
import { saveState } from "../redux/walletSlice";

const {
  popularCryptoBlocks,
  headerClass,
  dark,
  popularCryptoClass,
  popularCrypto_switch_light,
  popularCrypto_switch,
  total_block,
  total_block_image,
  totalClass,
} = styles;
const { Title, Text } = Typography;
const {
  popular_crypto,
  total,
  usd,
  altWalletImg,
  switchChecked,
  switchUnchecked,
} = HEADER_CONSTANTS;
const firstPopularCrypto: number = 0;
const thirdPopularCrypto: number = 3;

export const Header: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  const { totalQuantity } = useAppSelector(state => state.wallet);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { data: cryptos } = useGetCryptosQuery("");

  useEffect(() => {
    dispatch(saveState());
  }, [dispatch, totalQuantity]);

  const popularCrypto = cryptos?.data
    ?.map(({ id, name, priceUsd }: cryptos) => (
      <div className={popularCryptoBlocks} key={id}>
        <h3>{name}</h3>
        <Text italic>{formatCellPrice(+priceUsd, true)}</Text>
      </div>
    ))
    .slice(firstPopularCrypto, thirdPopularCrypto);

  return (
    <header className={headerClass}>
      <div className={`${darkTheme && dark}`}>
        <Title level={3}>
          <Text underline>{popular_crypto}</Text>
        </Title>
        <div className={popularCryptoClass}>{popularCrypto}</div>
      </div>
      <Switch
        checked={darkTheme}
        checkedChildren={switchChecked}
        unCheckedChildren={switchUnchecked}
        onChange={() => {
          dispatch(toggleTheme());
        }}
        className={
          darkTheme ? popularCrypto_switch_light : popularCrypto_switch
        }
      />
      <div className={`${total_block} ${darkTheme && dark}`}>
        <img
          onClick={() => setVisible(!visible)}
          src={walletLogo}
          alt={altWalletImg}
          className={total_block_image}
        />
        <div className={totalClass}>
          <h2>{total}</h2>
          <p>
            {formatCellPrice(totalQuantity, true)}
            &nbsp;{usd}
          </p>
        </div>
      </div>
      <WalletModal visible={visible} setVisible={setVisible} />
    </header>
  );
};
