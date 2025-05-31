import './App.css';
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer";
import ResourceList from "./components/Resources/ResourceList";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { useEffect, useState } from "react";
import PaginationBar from "./components/Pagination/PaginationBar";
import { computeRangeFromPageIndex } from "./util/pagination";
import TagDropdown from './components/SearchBar/TagDropdown';
import { getResources, getTags } from '@/util/getResourceData';

const initialPageIndex = 0;
const pageSize = 9;

function App() {
  const [resources, setResources] = useState([]);
  const [tagMap, setTagMap] = useState(null); // null until loaded
  const [status, setStatus] = useState('loading'); //loading, failed, succeeded
  // for pagination
  const [itemDisplayRange, setItemDisplayRange] = useState(computeRangeFromPageIndex(initialPageIndex, pageSize));
  // for searching by Tags
  const [ selectedTags, setSelectedTags ] = useState([])

  async function fetchData() {
      setStatus('loading')
      try {
        const [resourcesData, tagsData] = await Promise.all([
          getResources(),
          getTags(),
        ]);

        // Convert tags into a map using string keys
        const tagMapObj = {};
        tagsData.forEach(tag => {
          tagMapObj[String(tag.id)] = tag.tag;
        });

        setResources(resourcesData);
        setTagMap(tagMapObj); // set AFTER map is ready
        setStatus('succeeded');
      }

      catch (error) {
        console.error('Failed to fetch resources or tags:', error);
        setStatus('failed');
      }
    }

    // fetch data from remote API - call function
  useEffect(() => {
    fetchData();
  }, []);

    // Filter resources based on selectedTags
  const filteredResources = selectedTags.length === 0
    ? resources
    : resources.filter(resource => {
        const resourceTagNames = (resource.appliedTags || []).map(id => tagMap[id]);
        // Check if resource has any tag from selectedTags
          return selectedTags.some(tag => resourceTagNames.includes(tag));
        });

  // Paginate
  const visibleResources = filteredResources.slice(itemDisplayRange.start, itemDisplayRange.end);

  function onPageIndexChange(index) {
    setItemDisplayRange(computeRangeFromPageIndex(index, pageSize));
  }

  // reset pagination numbers
  useEffect(() => {
    setItemDisplayRange(computeRangeFromPageIndex(0, pageSize));
  }, [selectedTags]);

  // if remote server fails
  if (status === 'failed') {
    return (
      <div className="retry">
        <h2>Failed to load resources.</h2>
        <p>Please try again later.</p>
        <button onClick={() => fetchData()}>Retry</button>
      </div>
    );
  }

  if (status === 'loading' || !tagMap) {
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
      <Header total={resources.length}/>

      {/* Search Bar */}
      <SearchBar />

      {/* Tags Dropdown Selection */}
      <TagDropdown onTagSelect={setSelectedTags}/>

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
