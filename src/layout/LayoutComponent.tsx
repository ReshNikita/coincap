import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, theme, Layout } from "antd";

import { Header } from "../components/Header";
import { Copyright } from "../components/Copyright";
import { useAppSelector } from "../redux/hooks";

export const LayoutComponent: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout style={{ width: "100%", height: "100vh" }}>
        <Header />
        <Outlet />
        <Copyright />
      </Layout>
    </ConfigProvider>
  );
};

//#14161a
