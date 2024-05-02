import { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "../styles/Loader.module.scss";

export const Loader: FC = () => (
  <Spin indicator={<LoadingOutlined className={styles.loader} spin />} />
);
