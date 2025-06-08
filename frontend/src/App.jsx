import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer";
import ResourceList from "./components/Resources/ResourceList";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { useEffect, useState } from "react";
import PaginationBar from "./components/Pagination/PaginationBar";
import { computeRangeFromPageIndex } from "./util/pagination";
import TagDropdown from "./components/SearchBar/TagDropdown";
import { getResources, getTags } from "@/util/getResourceData";
import ChatWindow from "./components/AIChat/ChatWindow";
import OpenAiChatButton from "./components/AIChat/OpenChatButton";
import SortButton from "./components/SortButton/SortDropdown.jsx";

const initialPageIndex = 0;
const pageSize = 9;

function App() {
  const [resources, setResources] = useState([]);
  const [tagMap, setTagMap] = useState(null); // null until loaded
  const [status, setStatus] = useState("loading"); //loading, failed, succeeded
  const [isAiChatWindowOpen, setIsAiChatWindowOpen] = useState(false);

  // for pagination
  const [itemDisplayRange, setItemDisplayRange] = useState(
    computeRangeFromPageIndex(initialPageIndex, pageSize)
  );
  // for searching by Tags
  const [selectedTags, setSelectedTags] = useState([]);

  // for sorting button
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  async function fetchData() {
    setStatus("loading");
    try {
      const [resourcesData, tagsData] = await Promise.all([getResources(), getTags()]);

      // Convert tags into a map using string keys
      const tagMapObj = {};
      tagsData.forEach((tag) => {
        tagMapObj[String(tag.id)] = tag.tag;
      });

      setResources(resourcesData);
      setTagMap(tagMapObj); // set AFTER map is ready
      setStatus("succeeded");
    } catch (error) {
      console.error("Failed to fetch resources or tags:", error);
      setStatus("failed");
    }
  }

  // fetch data from remote API - call function
  useEffect(() => {
    fetchData();
  }, []);

  // Filter resources based on selectedTags
  const filteredResources = (
    selectedTags.length === 0
      ? resources
      : resources.filter((resource) => {
          const resourceTagNames = (resource.appliedTags || []).map((id) => tagMap[id]);
          return selectedTags.some((tag) => resourceTagNames.includes(tag));
        })
  ).sort((a, b) => {
    let aValue = sortBy === "title" ? a.name.toLowerCase() : a.createdAt;
    let bValue = sortBy === "title" ? b.name.toLowerCase() : b.createdAt;

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate
  const visibleResources = filteredResources.slice(itemDisplayRange.start, itemDisplayRange.end);

  function onPageIndexChange(index) {
    setItemDisplayRange(computeRangeFromPageIndex(index, pageSize));
  }

  // for sorting
  function handleSortChange(field, order) {
    setSortBy(field);
    setSortOrder(order);
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
      <div className="fixed right-4 bottom-4 z-10">
        <ChatWindow isOpen={isAiChatWindowOpen} onClose={() => setIsAiChatWindowOpen(false)}></ChatWindow>
        {!isAiChatWindowOpen && (
          <OpenAiChatButton onClick={() => setIsAiChatWindowOpen(true)}></OpenAiChatButton>
        )}
      </div>

      {/* Header of the App */}
      <Header total={resources.length} />

      {/* Search Bar */}
      <SearchBar />

      {/* Tags Dropdown Selection */}
      <TagDropdown
        onTagSelect={(tags) => {
          setSelectedTags(tags);
          // update pagination based on tags
          setItemDisplayRange(computeRangeFromPageIndex(0, pageSize));
        }}
      />

      <SortButton onSortChange={handleSortChange} />
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

export default App;
