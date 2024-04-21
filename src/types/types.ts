export const types = {};
export type Nullable<T> = T | null;

export type Falsy<T> = T | null | undefined | false;

export type ErrorProps = {
  title: string;
  message: string;
};
