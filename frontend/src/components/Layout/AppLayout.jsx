import Header from "../Header/Header";
import Footer from "../Footer/footer";
import ResourceList from "../Resources/ResourceList";
import SearchBar from "../SearchBar/SearchBar.jsx";
import PaginationBar from "../Pagination/PaginationBar";
import TagDropdown from "../SearchBar/TagDropdown";
import { useResourceContext, pageSize } from "../../context/ResourceContext";

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
export default AppContent;