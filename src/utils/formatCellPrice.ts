import millify from "millify";
import { DOLLAR_SIGN } from "../constants";

export const formatCellPrice = (price: string | number): string =>
  DOLLAR_SIGN +
  millify(Number(price), {
    units: ["", "B", "M", "K", "T"],
    precision: 2,
    lowercase: true,
  });
