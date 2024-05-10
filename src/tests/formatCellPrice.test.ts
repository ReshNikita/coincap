import { formatCellPrice } from "../utils/formatCellPrice";

describe("formatCellPrice", () => {
  test("formats a number with dollar sign", () => {
    expect(formatCellPrice(10000, true)).toBe("$10k");
  });
  test("formats a number without dollar sign", () => {
    expect(formatCellPrice(10000, false)).toBe("10k");
  });
  test("returns undefined when the price is NaN", () => {
    expect(formatCellPrice("not a number", true)).toBeUndefined();
  });
  test("should format negative numbers correctly", () => {
    expect(formatCellPrice(-10, true)).toBe("$-10");
    expect(formatCellPrice("-10000", false)).toBe("-10k");
  });
  test("should handle empty strings", () => {
    expect(formatCellPrice("", true)).toBe("$0");
  });
});
