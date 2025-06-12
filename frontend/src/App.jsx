import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer";
import ResourceList from "./components/Resources/ResourceList";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { useMemo, useState } from "react";
import PaginationBar from "./components/Pagination/PaginationBar";
import TagDropdown from "./components/SearchBar/TagDropdown";
import ChatWindow from "./components/AIChat/ChatWindow";
import OpenAiChatButton from "./components/AIChat/OpenChatButton";
import SortDropdown from "./components/SortDropdown/SortDropdown.jsx";
import { useResourceData } from "./hooks/useResourceData";
import { useFilterAndSort } from "./hooks/useFilterAndSort";
import { filterByTextAndTags } from "./util/resources/filter";
import { sortByTitleOrDate } from "./util/resources/sort";
import { usePaginator } from "./hooks/usePaginator";

const displaySettings = {
  pageSize: 9
};

function App() {
  const { resources, idToTagMap, status, fetchData } = useResourceData();
  const { itemDisplayRange, goToPage: goToListPage } = usePaginator(displaySettings.pageSize);

  // Filter options
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const areFilterOptionsUsed = searchTerm || (selectedTags && selectedTags.length > 0);

  // Sorting options
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const { filterAndSortResources } = useFilterAndSort(
    resources,
    (recs) => filterByTextAndTags(recs, searchTerm, searchFilter, selectedTags, idToTagMap),
    (recs) => sortByTitleOrDate(recs, sortBy, sortOrder)
  );

  // Filter resources based on search term and selected tags.
  // Using useMemo instead of useState prevents delayed render bugs.
  const filteredResources = useMemo(filterAndSortResources, [
    filterAndSortResources,
    resources,
    searchTerm,
    selectedTags,
    sortBy,
    sortOrder
  ]);

  const visibleResources = filteredResources.slice(itemDisplayRange.start, itemDisplayRange.end);

  const [isAiChatWindowOpen, setIsAiChatWindowOpen] = useState(false);

  function onPageIndexChange(index) {
    goToListPage(index);
  }

  // for sorting
  function handleSortChange(field, order) {
    setSortBy(field);
    setSortOrder(order);
  }

  // Clear all function
  function handleClearAll() {
    setSearchTerm("");
    setSelectedTags([]);
    setSortBy("title");
    setSortOrder("asc");
    goToListPage(0);
  }

  // if remote server fails
  if (status === "failed") {
    return (
      <div className="retry">
        <h2>Failed to load resources.</h2>
        <p>Please try again later.</p>
        <button onClick={() => fetchData()}>Retry</button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="loading">
        <h2>Fetching Data...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed right-4 bottom-4 z-10">
        <ChatWindow isOpen={isAiChatWindowOpen} onClose={() => setIsAiChatWindowOpen(false)}></ChatWindow>
        {!isAiChatWindowOpen && (
          <OpenAiChatButton onClick={() => setIsAiChatWindowOpen(true)}></OpenAiChatButton>
        )}
      </div>

      {/* Header of the App */}
      <Header total={resources.length} />

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        searchFilter={searchFilter}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          goToListPage(0);
        }}
        setSearchFilter={(term) => {
          setSearchFilter(term);
          goToListPage(0);
        }}
        onClearAll={handleClearAll}
        showClearAllButton={areFilterOptionsUsed}
      />

      {/* Tags Dropdown Selection */}
      <TagDropdown
        selectedTags={selectedTags}
        onTagSelect={(tags) => {
          setSelectedTags(tags);
          goToListPage(0);
        }}
      />

      <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />

      {/* Show the resources fetched from the API */}
      <ResourceList
        resources={visibleResources}
        tagMap={idToTagMap}
        clearAllFilters={handleClearAll}
        areFiltersUsed={areFilterOptionsUsed}
      />

      {/* Pagination */}
      <PaginationBar
        firstItemIndex={itemDisplayRange.start}
        pageSize={displaySettings.pageSize}
        totalItems={filteredResources.length}
        maxVisiblePageButtons={5}
        onChangePage={onPageIndexChange}
      ></PaginationBar>

      {/* Footer of the App */}
      <Footer />
    </>
  );
}

export default App;
