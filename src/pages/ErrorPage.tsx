import { FC } from "react";
import { ERROR } from "../constants";

type ErrorProps = {
  error: {
    message: string;
  };
};

export const ErrorPage: FC<ErrorProps> = ({ error }) => (
  <div role="alert">
    <h1>{ERROR}</h1>
    <p>{error.message}</p>
  </div>
);
