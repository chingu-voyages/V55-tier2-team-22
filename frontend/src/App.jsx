
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer";

import SearchPage from "./components/SearchBar/SearchPage";


function App() {
  // for pagination
  const [resources, setResources] = useState([]);
  const [itemDisplayRange, setItemDisplayRange] = useState(computeRangeFromPageIndex(initialPageIndex, pageSize));
  // for searching by Tags
  const [ selectedTags, setSelectedTags ] = useState([])

  function onPageIndexChange(index) {
    setItemDisplayRange(computeRangeFromPageIndex(index, pageSize));
  }

  useEffect(() => {
    async function initResources() {
      const rec = await getResources();
      setResources(rec);
    }

    initResources();
  }, []);

  return (
    <>
      {/* Header of the App */}
      <Header />

      {/* Search Bar */}
      <SearchPage />
      {/* Show the resources fetched from the API */}

      {/* Footer of the App */}
      <Footer />
    </>
  );
}

export default App;
