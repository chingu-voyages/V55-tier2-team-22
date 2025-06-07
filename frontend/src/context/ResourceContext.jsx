import { createContext, useContext, useEffect, useState } from "react";
import { getResources, getTags } from "@/util/getResourceData";
import { computeRangeFromPageIndex } from "@/util/pagination";

const ResourceContext = createContext();

export const pageSize = 9;
const initialPageIndex = 0;

export const ResourceProvider = ({ children }) => {
    const [resources, setResources] = useState([]);
    const [tagMap, setTagMap] = useState(null); // null until loaded
    const [status, setStatus] = useState("loading"); //loading, failed, succeeded
    const [selectedTags, setSelectedTags] = useState([]); // for searching by Tags
    const [itemDisplayRange, setItemDisplayRange] = useState(
        computeRangeFromPageIndex(initialPageIndex, pageSize)
    ); // for pagination

    const fetchData = async () => {
        setStatus("loading");
        try {
            const [resourcesData, tagsData] = await Promise.all([getResources(), getTags()]);
            // Convert tags into a map using string keys
            const tagMapObj = {};
            tagsData.forEach(tag => {
                tagMapObj[String(tag.id)] = tag.tag;
            });

            setResources(resourcesData);
            setTagMap(tagMapObj); // set AFTER map is ready
            setStatus("succeeded");
        } catch (error) {
            console.error("Failed to fetch resources or tags:", error);
            setStatus("failed");
        }
    };
    // fetch data from remote API - call function
    useEffect(() => {
        fetchData();
    }, []);
    // Filter resources based on selectedTags
    const filteredResources =
        selectedTags.length === 0
            ? resources
            : resources.filter(resource => {
                const resourceTagNames = (resource.appliedTags || []).map(id => tagMap?.[id]);
                return selectedTags.some(tag => resourceTagNames.includes(tag));
            });
    // Paginate
    const visibleResources = filteredResources.slice(itemDisplayRange.start, itemDisplayRange.end);

    const onPageIndexChange = (index) => {
        setItemDisplayRange(computeRangeFromPageIndex(index, pageSize));
    };

    const onTagSelect = (tags) => {
        setSelectedTags(tags);
        setItemDisplayRange(computeRangeFromPageIndex(0, pageSize));
    };

    return (
        <ResourceContext.Provider
            value={{
                resources,
                tagMap,
                status,
                filteredResources,
                visibleResources,
                selectedTags,
                onTagSelect,
                itemDisplayRange,
                onPageIndexChange,
                fetchData,
            }}
        >
            {children}
        </ResourceContext.Provider>
    );
};

export const useResourceContext = () => useContext(ResourceContext);
