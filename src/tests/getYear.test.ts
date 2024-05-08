import { getYear } from "../utils/getYear";

test("displays the current year", () => {
  const currentYear = new Date().getFullYear();
  const result = getYear();
  expect(result).toBe(currentYear);
});
