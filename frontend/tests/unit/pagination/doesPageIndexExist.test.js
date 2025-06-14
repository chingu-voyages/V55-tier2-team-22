import { test, expect } from "vitest";
import { doesPageIndexExist } from "../../../src/util/pagination";

test.each([
  [0, 50, 5, true],
  [4, 12, 2, true],
  [-2, 50, 5, false],
  [10, 50, 5, false],
  [21, 17, 3, false],
  [3, 13, 5, false],
  [5, 14, 4, false],
  [19, 53, 9, false],
])("doesPageIndexExist(%i, %i, %i) = %i", (pageIndex, totalItems, pageSize, expected) => {
  expect(doesPageIndexExist(pageIndex, totalItems, pageSize)).toBe(expected);
});
