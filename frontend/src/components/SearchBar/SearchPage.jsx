import SearchBar from "./SearchBar";
import FilteredResourceList from "../Resources/FilteredResourceList";
import { useResourceSearch } from "../Hooks/useResourceSearch.js";
import ResourceList from "../Resources/ResourceList";

export default function SearchPage() {
  const hookResult = useResourceSearch();

  const {
    searchQuery,
    selectedFilter,
    filteredResources,
    loading,
    tagMap,
    handleSearch,
    handleFilterSelect,
  } = hookResult;

  if (loading) {
    return <div className="text-white">Loading resources...</div>;
  }

  // Safeguard in case searchQuery isn't a string:
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <div>
      {/* 1) SEARCH UI: always render */}
      <SearchBar
        searchQuery={searchQuery}
        filterType={selectedFilter}
        handleSearchChange={handleSearch}
        handleFilterSelect={handleFilterSelect}
      />

      {/* 2) CONDITIONAL RENDERING */}
      {hasQuery ? (
        // If user typed at least one character, show the filtered results
        <FilteredResourceList
          resources={filteredResources}
          tagMap={tagMap}
          filterType={selectedFilter}
        />
      ) : (
        // If search box is empty, show the original full list
        <ResourceList />
      )}
    </div>
  );
}
