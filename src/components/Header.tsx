import { FC } from "react";
import { POPULAR_CRYPTO } from "../constants/constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTheme } from "../redux/themeSlice";
import { Switch } from "antd";
import walletLogo from "../icons/wallet.svg";

export const Header: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  return (
    <header>
      <div className={`popularCrypto_block ${darkTheme && "dark"}`}>
        <h2>{POPULAR_CRYPTO}</h2>
        <div className="popularCrypto">
          <div>
            <h3>Bitcoin</h3>
            <p>$12312</p>
          </div>
          <div>
            <h3>Bitcoin</h3>
            <p>$12312</p>
          </div>
          <div>
            <h3>Bitcoin</h3>
            <p>$12312</p>
          </div>
        </div>
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
          <p>$123 USD</p>
        </div>
      </div>
    </header>
  );
};
