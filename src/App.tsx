import { FC, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { LayoutComponent } from "./layout/LayoutComponent";
import { MainPage } from "./pages/MainPage";
import { withWrapper } from "./hoc/withWrapper";
import { BASE_URL } from "./constants/constants";

import { ConfigProvider, theme, Layout } from "antd";
import { useAppSelector } from "./redux/hooks";

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then(module => {
    return { default: module.NotFoundPage };
  })
);

const Crypto = lazy(() =>
  import("./components/Crypto").then(module => {
    return { default: module.Crypto };
  })
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={`${BASE_URL}`} element={<LayoutComponent />}>
        <Route index element={<MainPage />} />
        <Route path="/coincap/:id" element={withWrapper(<Crypto />)} />
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
        <RouterProvider router={router} />;
      </Layout>
    </ConfigProvider>
  );
};
