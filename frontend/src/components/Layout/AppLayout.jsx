import Header from "../Header/Header";
import Footer from "../Footer/footer";
import ResourceList from "../Resources/ResourceList";
import SearchBar from "../SearchBar/SearchBar.jsx";
import PaginationBar from "../Pagination/PaginationBar";
import TagDropdown from "../SearchBar/TagDropdown";
import { useResourceContext, pageSize } from "../../context/ResourceContext";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

function AppLayout() {
    const {
        resources,
        tagMap,
        status,
        visibleResources,
        filteredResources,
        selectedTags,
        itemDisplayRange,
        onPageIndexChange,
        onTagSelect,
        fetchData
    } = useResourceContext();

    // Convert tagMap (id → tag string) to array of tags for dropdown
    const tags = tagMap ? Object.values(tagMap) : [];

    // if remote server fails
    if (status === "failed") return <ErrorScreen onRetry={fetchData} />;
    if (status === "loading" || !tagMap) return <LoadingScreen />;

    return (
        <>
            {/* Header of the App */}
            <Header total={resources.length} />

            {/* Search Bar */}
            <SearchBar />

            {/* Tags Dropdown Selection */}
            <TagDropdown
                tags={tags}
                selectedTags={selectedTags}
                onTagSelect={onTagSelect}
            />


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
export default AppLayout;