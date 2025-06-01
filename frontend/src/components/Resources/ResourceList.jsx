import React, { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";
import styles from "./Resource.module.css";
import { getResources, getTags } from "@/util/getResourceData";

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [tagMap, setTagMap] = useState(null); // null until loaded
  const [status, setStatus] = useState("loading"); //loading, failed, succeeded
  const [visibleArticles, setVisibleArticles] = useState(6);

  async function fetchData() {
    setStatus("loading");
    try {
      const [resourcesData, tagsData] = await Promise.all([
        getResources(),
        getTags(),
      ]);

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

  useEffect(() => {
    fetchData();
  }, []);

  if (status === "failed") {
    return (
      <div className={styles.retry}>
        <h2>Failed to load resources.</h2>
        <p>Please try again later.</p>
        <button onClick={() => fetchData()}>Retry</button>
      </div>
    );
  }

  if (status === "loading" || !tagMap) {
    return (
      <div className={styles.loading}>
        <h2>Fetching Data...</h2>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.resource_section}>
        {resources.slice(0, visibleArticles).map((resource) => {
          // Convert tag IDs to tag names
          const convertedTag = (resource.appliedTags || []).map(
            (id) => tagMap[id] || "Unknown"
          );

          return (
            <ResourceCard
              key={resource.id}
              title={resource.name}
              url={resource.url}
              author={resource.author}
              date={resource.createdAt}
              tags={convertedTag}
            />
          );
        })}
      </div>

      <div className={styles.load_more}>
        {visibleArticles < resources.length && (
          <button onClick={() => setVisibleArticles((prev) => prev + 3)}>
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default ResourceList;
