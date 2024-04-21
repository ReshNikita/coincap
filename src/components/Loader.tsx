import { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Loader: FC = () => (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
);
