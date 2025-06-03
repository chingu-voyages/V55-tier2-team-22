import { test, expect } from "vitest";
import { computeTotalNumberOfPages } from "../../../src/util/pagination";

test.each([
  [1, 1, 1],
  [2, 1, 2],
  [1, 2, 1],
  [2, 2, 1],
  [3, 2, 2],
  [10, 2, 5],
  [11, 2, 6],
  [20, 2, 10],
  [37, 800, 1],
  [0, 0, null],
  [0, 10, null],
  [0, 196, null],
  [10, 0, null],
  [-5, 10, null],
  [4, -9, null],
])("computeTotalNumberOfPages(%i, %i) = %i", (totalItems, pageSize, expected) => {
  expect(computeTotalNumberOfPages(totalItems, pageSize)).toBe(expected);
});
