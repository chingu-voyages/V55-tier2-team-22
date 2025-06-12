export function filterByTextAndTags(resources, searchTerm, searchFilter, selectedTags, tagMap) {
  return resources.filter((resource) => {
    // Filter by search term
    const textToMatch = searchFilter == "title" ? resource.name.toLowerCase() : resource.author.toLowerCase();
    const matchesSearch = !searchTerm || textToMatch.includes(searchTerm.toLowerCase());

    // Filter by tags
    const matchesTags =
      selectedTags.length === 0 ||
      (() => {
        const resourceTagNames = (resource.appliedTags || []).map((id) => tagMap[id]);
        return selectedTags.some((tag) => resourceTagNames.includes(tag));
      })();

    return matchesSearch && matchesTags;
  });
}
