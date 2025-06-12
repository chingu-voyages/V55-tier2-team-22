import { test, expect } from "vitest";
import { computePageIndex } from "../../../src/util/pagination";

test.each([
  [0, 5, 0],
  [2, 5, 0],
  [4, 5, 0],

  [5, 5, 1],
  [7, 5, 1],
  [9, 5, 1],

  [10, 5, 2],
  [13, 5, 2],
  [14, 5, 2],

  [15, 5, 3],
  [16, 5, 3],
  [19, 5, 3],

  [27, 10, 2],
  [41, 10, 4],
  [77, 10, 7],
  [81, 10, 8],

  [8, 9, 0],
  [9, 9, 1],
  [27, 9, 3],
  [44, 9, 4],
  [45, 9, 5],
  [56, 9, 6],

  [7, 0, null],
  [-9, 0, null],
  [4, 0, null],
  [3, -5, null],
  [-1, 0, null],
])("computePageIndex(%i, %i) = %i", (itemIndex, pageSize, expected) => {
  expect(computePageIndex(itemIndex, pageSize)).toBe(expected);
});
