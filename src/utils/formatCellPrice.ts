import millify from "millify";
import { DOLLAR_SIGN } from "../constants";

export const formatCellPrice = (
  price: string | number,
  includeDollarSign: boolean
): string | undefined => {
  if (isNaN(+price)) return;
  const formatWithMillify = (num: number | string) =>
    millify(Number(num), {
      units: ["", "K", "M", "B", "T"],
      precision: 2,
      lowercase: true,
    });
  return includeDollarSign
    ? DOLLAR_SIGN + formatWithMillify(Number(price))
    : formatWithMillify(Number(price));
};
