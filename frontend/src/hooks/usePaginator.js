import { computeRangeFromPageIndex } from "@/util/pagination";
import { useState } from "react";

/**
 * @typedef {Object} PaginationReturn
 * @property {{start: number, end: number}} itemDisplayRange - The range of items displayed in the current page. `start` is inclusive, `end` is exclusive.
 * @property {(index: number) => void} goToPage - Changes `itemDisplayRange` to match the specified page.
 *
 * @param {number} pageSize - The maximum amount of items contained in one page.
 * @returns {PaginationReturn}
 */
export function usePaginator(pageSize) {
  const [itemDisplayRange, setItemDisplayRange] = useState(computeRangeFromPageIndex(0, pageSize));

  function goToPage(index) {
    setItemDisplayRange(computeRangeFromPageIndex(index, pageSize));
  }

  return {
    itemDisplayRange,
    goToPage
  };
}
