export function sortByTitleOrDate(resources, sortBy, sortOrder) {
  return resources.sort((a, b) => {
    let aValue = sortBy === "title" ? a.name.toLowerCase() : a.createdAt;
    let bValue = sortBy === "title" ? b.name.toLowerCase() : b.createdAt;

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}
