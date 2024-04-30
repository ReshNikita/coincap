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
  import("./components/Crypto").then(({ Crypto }) => ({ default: Crypto }))
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={`${BASE_URL}`} element={<LayoutComponent />}>
        <Route index element={<MainPage />} />
        <Route path={`${BASE_URL}/:id`} element={withWrapper(<Crypto />)} />
        <Route path="*" element={withWrapper(<NotFoundPage />)} />
      </Route>
    </Route>
  )
);

export const App: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  // localStorage.setItem("darkMode", JSON.stringify(darkTheme));
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
