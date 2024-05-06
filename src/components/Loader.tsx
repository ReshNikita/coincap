import { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "../styles/Loader.module.scss";

export const Loader: FC = () => (
  <Spin
    data-testid="spin-element"
    indicator={
      <LoadingOutlined
        data-testid="loading-outlined-icon"
        className={styles.loader}
        spin
      />
    }
  />
);
