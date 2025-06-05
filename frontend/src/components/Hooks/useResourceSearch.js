// src/hooks/useResourceSearch.js
import { useState, useEffect } from "react";
import { getResources, getTags } from "../../util/getResourceData";

export function useResourceSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("title");
  const [allResources, setAllResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagMap, setTagMap] = useState({});

  // Load initial data
  useEffect(() => {
    async function fetchData() {
      try {
        const [resourcesData, tagsData] = await Promise.all([
          getResources(),
          getTags(),
        ]);

        // Create tag map
        const tagMapping = {};
        tagsData.forEach((tag) => {
          tagMapping[tag.id] = tag.tag;
        });

        setAllResources(resourcesData);
        setFilteredResources(resourcesData); // Show all initially
        setTagMap(tagMapping);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter resources when searchQuery or selectedFilter changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResources(allResources);
      return;
    }

    const filtered = allResources.filter((resource) => {
      const searchValue = searchQuery.toLowerCase();
      if (selectedFilter === "title") {
        return resource.name.toLowerCase().includes(searchValue);
      }
      if (selectedFilter === "author") {
        return resource.author.toLowerCase().includes(searchValue);
      }
      return false;
    });

    setFilteredResources(filtered);
  }, [searchQuery, selectedFilter, allResources]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
  };

  const returnValue = {
    searchQuery,
    selectedFilter,
    filteredResources,
    loading,
    tagMap,
    handleSearch,
    handleFilterSelect,
  };
  return returnValue;
}
