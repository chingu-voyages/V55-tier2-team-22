import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer";
import ResourceList from "./components/Resources/ResourceList";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import PaginationBar from "./components/Pagination/PaginationBar";
import TagDropdown from "./components/SearchBar/TagDropdown";
import { ResourceProvider, useResourceContext, pageSize } from "./context/ResourceContext";

function AppContent() {
  const {
    resources,
    tagMap,
    status,
    visibleResources,
    filteredResources,
    itemDisplayRange,
    onPageIndexChange,
    onTagSelect,
    fetchData
  } = useResourceContext();

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

  if (status === "loading" || !tagMap) {
    return (
      <div className="loading">
        <h2>Fetching Data...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Header of the App */}
      <Header total={resources.length} />

      {/* Search Bar */}
      <SearchBar />

      {/* Tags Dropdown Selection */}
      <TagDropdown onTagSelect={onTagSelect} />

      {/* Show the resources fetched from the API */}
      <ResourceList resourceList={visibleResources} tagMap={tagMap} />

      {/* Pagination */}
      <PaginationBar
        firstItemIndex={itemDisplayRange.start}
        pageSize={pageSize}
        totalItems={filteredResources.length}
        maxVisiblePageButtons={5}
        onChangePage={onPageIndexChange}
      ></PaginationBar>

      {/* Footer of the App */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <ResourceProvider>
      <AppContent />
    </ResourceProvider>
  );
}

export default App;
