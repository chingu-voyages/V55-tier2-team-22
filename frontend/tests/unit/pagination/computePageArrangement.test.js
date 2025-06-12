import { test, expect } from "vitest";
import { computePageArrangement } from "../../../src/util/pagination";

test.each([
  [0, 50, 10, undefined, [0, 1, 2, 3, 4]],
  [5, 50, 10, undefined, [0, 1, 2, 3, 4]],
  [9, 50, 10, undefined, [0, 1, 2, 3, 4]],
  [11, 50, 10, undefined, [0, 1, 2, 3, 4]],

  [0, 50, 10, undefined, [0, 1, 2, 3, 4]],
  [5, 50, 10, undefined, [0, 1, 2, 3, 4]],
  [9, 50, 10, undefined, [0, 1, 2, 3, 4]],
  [11, 50, 10, undefined, [0, 1, 2, 3, 4]],

  [0, 137, 9, undefined, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],

  [0, 50, 10, 3, [0, 1, 2]],
  [5, 50, 10, 3, [0, 1, 2]],
  [9, 50, 10, 3, [0, 1, 2]],
  [11, 50, 10, 3, [0, 1, 2]],
  [20, 50, 10, 3, [1, 2, 3]],
  [27, 50, 10, 3, [1, 2, 3]],
  [32, 50, 10, 3, [2, 3, 4]],
  [44, 50, 10, 3, [2, 3, 4]],

  [0, 11, 2, 2, [0, 1]],
  [1, 11, 2, 2, [0, 1]],
  [2, 11, 2, 2, [0, 1]],
  [3, 11, 2, 2, [0, 1]],
  [4, 11, 2, 2, [1, 2]],
  [5, 11, 2, 2, [1, 2]],
  [6, 11, 2, 2, [2, 3]],
  [7, 11, 2, 2, [2, 3]],

  [-1, 10, 2, 5, null],
  [-1, 0, 2, 5, null],
  [-1, -5, 2, 5, null],
  [-1, 10, -9, 5, null],
])("computePageArrangement(%i, %i, %i, %s) = %o", (itemIndex, itemTotal, pageSize, maxLength, expected) => {
  expect(computePageArrangement(itemIndex, itemTotal, pageSize, maxLength)).toStrictEqual(expected);
});
