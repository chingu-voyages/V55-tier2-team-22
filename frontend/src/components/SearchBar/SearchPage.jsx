import SearchBar from "./SearchBar";
import { useResourceSearch } from "../Hooks/useResourceSearch.js";
import ResourceList from "../Resources/ResourceList";

export default function SearchPage() {
  const {
    searchQuery,
    selectedFilter,
    filteredResources,
    loading,
    handleSearch,
    handleFilterSelect,
  } = useResourceSearch();

  if (loading) {
    return <div className="text-white">Loading resources...</div>;
  }

  // Safeguard in case searchQuery isn't a string:

  return (
    <div>
      {/* 1) SEARCH UI: always render */}
      <SearchBar
        searchQuery={searchQuery}
        filterType={selectedFilter}
        handleSearchChange={handleSearch}
        handleFilterSelect={handleFilterSelect}
      />

      <ResourceList
        filteredResources={filteredResources}
        filterType={selectedFilter}
      />
    </div>
  );
}
