import { FC, LazyExoticComponent, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ConfigProvider, theme, Layout } from "antd";
import { LayoutComponent } from "./layout/LayoutComponent";
import { MainPage } from "./pages/MainPage";
import { withWrapper } from "./hoc/withWrapper";
import { useAppSelector } from "./redux/hooks";
import { BASE_URL } from "./constants";

const NotFoundPage: LazyExoticComponent<FC> = lazy(() =>
  import("./pages/NotFoundPage").then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  }))
);

const Crypto: LazyExoticComponent<FC> = lazy(() =>
  import("./pages/CryptoPage").then(({ CryptoPage }) => ({
    default: CryptoPage,
  }))
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={"/"} element={<LayoutComponent />}>
        <Route index element={<MainPage />} />
        <Route path={`/:id`} element={withWrapper(<Crypto />)} />
        <Route path="*" element={withWrapper(<NotFoundPage />)} />
      </Route>
    </Route>
  )
);

const { defaultAlgorithm, darkAlgorithm } = theme;

export const App: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout style={{ width: "100%", minHeight: "100vh", height: "auto" }}>
        <RouterProvider router={router} />
      </Layout>
    </ConfigProvider>
  );
};
