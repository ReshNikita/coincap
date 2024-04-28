import millify from "millify";

export const formatPrice = (price: string | number): string =>
  millify(Number(price), {
    units: ["", "B", "M", "K", "T"],
    precision: 2,
    lowercase: true,
  });
