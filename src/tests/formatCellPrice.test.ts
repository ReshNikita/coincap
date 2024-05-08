import { formatCellPrice } from "../utils/formatCellPrice";

describe("formatCellPrice", () => {
  test("formats a number with dollar sign", () => {
    const price = 10000;
    const formattedPrice = formatCellPrice(price, true);
    expect(formattedPrice).toBe("$10k");
  });
});
