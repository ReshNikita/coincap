import { ReactNode, Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loader } from "../components/Loader";

const ErrorPage = lazy(() =>
  import("../pages/ErrorPage").then(module => {
    return { default: module.ErrorPage };
  })
);

export const withWrapper = (wrappedComponent: ReactNode): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <Suspense fallback={<Loader />}>{wrappedComponent}</Suspense>
  </ErrorBoundary>
);
