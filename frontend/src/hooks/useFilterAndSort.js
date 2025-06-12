/**
 * @typedef {Object} FilterAndSortReturn
 * @property {() => Array} filterAndSortResources - A function that returns a filtered and sorted version of the `allResources` param.
 *
 * @param {Array} allResources - The source array of items. This can be React state.
 * @param {(resources: Array) => Array} filterer - A function that takes the source array, filters them, and returns the result.
 * @param {(resources: Array) => Array} sorter - A function that takes the filtered items, sorts them, and returns the result.
 * @returns {FilterAndSortReturn}
 */
export function useFilterAndSort(allResources, filterer, sorter) {
  function filterAndSortResources() {
    let recs = filterer(allResources);
    recs = sorter(recs);
    return recs;
  }

  return {
    filterAndSortResources
  };
}
