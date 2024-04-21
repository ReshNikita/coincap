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

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then(module => {
    return { default: module.NotFoundPage };
  })
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={`${BASE_URL}`} element={<LayoutComponent />}>
        <Route index element={<MainPage />} />
        <Route path="*" element={withWrapper(<NotFoundPage />)} />
      </Route>
    </Route>
  )
);

export const App: FC = () => <RouterProvider router={router} />;
