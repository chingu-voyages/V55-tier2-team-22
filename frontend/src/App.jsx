import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer";
import ResourceList from "./components/Resources/ResourceList";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { useResourceSearch } from "@/components/Hooks/useResourceSearch";

function App() {
  const {
    filteredResources,
    selectedFilter,
    searchQuery,
    handleSearch,
    handleFilterSelect,
  } = useResourceSearch();
  return (
    <>
      {/* Header of the App */}
      <Header />
      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        filterType={selectedFilter}
        handleSearchChange={handleSearch}
        handleFilterSelect={handleFilterSelect}
      />

      {/* Show the resources fetched from the API */}
      <ResourceList
        filteredResources={filteredResources}
        filterType={selectedFilter}
      />
      {/* Footer of the App */}
      <Footer />
    </>
  );
}

export default App;
