// src/hooks/useResourceSearch.js
import { useState, useEffect } from "react";
import { getResources, getTags } from "@/util/getResourceData";

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
  const filterResources = (query, type, data) => {
    if (!query.trim()) {
      return data;
    }
    const lowered = query.toLowerCase();
    return data.filter((res) =>
      type === "title"
        ? res.name.toLowerCase().includes(lowered)
        : res.author.toLowerCase().includes(lowered)
    );
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setFilteredResources(filterResources(value, selectedFilter, allResources));
  };

  const handleFilterSelect = (value) => {
    setSelectedFilter(value);
    setFilteredResources(filterResources(searchQuery, value, allResources));
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
