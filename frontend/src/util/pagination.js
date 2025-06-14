/*
  This is a small utility library for processing pages for the purposes of pagination UI.

  For this library, a page is defined as a range around a sequence/array of items, bounded between [start, end).
  Pages are placed in sequence to each other. 
  Each page has an index (according to its position), and has a size (which is the *maximum* number of items it includes).

  Here's a visual explanation. With an array of 9 items and a page size of 3, this would be the resulting layout:

              |    Page 0  |     Page 1  |     Page 2  |
  Items:      | A,  B,  C, |  D,  E,  F, |  G,  H,  I  |
  Item index: | 0,  1,  2, |  3,  4,  5, |  6,  7,  8  |

  Page 0 is bounded between [0, 3) and includes items [A, B, C].
  Page 1 is bounded between [3, 6) and includes items [D, E, F].
  Page 2 is bounded between [6, 9) and includes items [G, H, I].
*/

/**
 * Computes the page index an item of some index belongs to.
 * @param {number} itemIndex The index of the item.
 * @param {number} pageSize The maximum number of items in one page.
 * @returns {number|null} The page index. Will instead be null if any of the arguments are invalid.
 */
export function computePageIndex(itemIndex, pageSize) {
  if (itemIndex < 0 || pageSize <= 0) {
    return null;
  }

  return Math.floor(itemIndex / pageSize);
}

/**
 * Computes the maximum number of pages representable by a number of items.
 * @param {number} totalItems The total number of items.
 * @param {number} pageSize The maximum number of items in one page.
 * @returns {number|null} The total number of pages. Will instead be null if any of the arguments are invalid.
 */
export function computeTotalNumberOfPages(totalItems, pageSize) {
  if (totalItems <= 0 || pageSize <= 0) {
    return null;
  }

  return Math.ceil(totalItems / pageSize);
}

/**
 * Determines if a page index exists within a computed range of pages.
 * @param {number} pageIndex - The page index.
 * @param {number} totalItems - The total number of items.
 * @param {number} pageSize - The maximum number of items in one page.
 * @returns {boolean}
 */
export function doesPageIndexExist(pageIndex, totalItems, pageSize) {
  const max = computeTotalNumberOfPages(totalItems, pageSize);
  return pageIndex >= 0 && pageIndex < max;
}

/**
 * @param {number} pageIndex The page index.
 * @param {number} pageSize The maximum number of items in one page.
 * @returns {{start: number, end: number}} The range of items that the page represents. `end` is exclusive i.e. not included in the page.
 */
export function computeRangeFromPageIndex(pageIndex, pageSize) {
  return {
    start: pageIndex * pageSize,
    end: pageIndex * pageSize + pageSize,
  };
}

/**
 * Computes an arrangement of page indexes surrounding a central page.
 * Page indexes that do not exist are not included.
 *
 * @param {number} itemIndex The index of an item included in the central page.
 * @param {number} totalItems The total number of items.
 * @param {number} pageSize The maximum number of items in one page.
 * @param {number} [maxLength] The maximum length of the resulting array.
 * @returns {number[]|null} An array of page indexes. Will instead be null if any of the arguments are invalid.
 */
export function computePageArrangement(itemIndex, totalItems, pageSize, maxLength = undefined) {
  if (itemIndex < 0 || totalItems <= 0 || pageSize <= 0) {
    return null;
  }

  const centralPageIndex = computePageIndex(itemIndex, pageSize);
  const arrangement = [centralPageIndex];
  const totalPages = computeTotalNumberOfPages(totalItems, pageSize);

  let numberOfPreviousPages = centralPageIndex;
  let numberOfNextPages = totalPages - centralPageIndex - 1;

  // We can't add more pages than the number of pages that actually exist.
  // This is also important to prevent an infinite while loop.
  let pagesToAdd = numberOfPreviousPages + numberOfNextPages;
  if (maxLength != undefined) {
    pagesToAdd = Math.min(pagesToAdd, maxLength - 1);
  }

  // Alternate between adding page indexes to the left and to the right of the central page index.
  let addLeft = true;
  while (pagesToAdd > 0) {
    // Add a page index to the left of the central page index.
    if (addLeft && numberOfPreviousPages > 0) {
      const firstNumber = arrangement[0] - 1;
      arrangement.unshift(firstNumber);
      numberOfPreviousPages--;
      pagesToAdd--;
    }

    // Add a page index to the right of the central page index.
    if (!addLeft && numberOfNextPages > 0) {
      const lastNumber = arrangement[arrangement.length - 1] + 1;
      arrangement.push(lastNumber);
      numberOfNextPages--;
      pagesToAdd--;
    }

    addLeft = !addLeft;
  }

  return arrangement;
}
