import React, { useEffect, useState } from 'react';
import ResourceCard from './ResourceCard';
import styles from './Resource.module.css';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [tagMap, setTagMap] = useState(null); // null until loaded
  const [loading, setLoading] = useState(true);
  const [visibleArticles, setVisibleArticles] = useState(6);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resourcesRes, tagsRes] = await Promise.all([
          fetch('https://seshatbe.up.railway.app/resources'),
          fetch('https://seshatbe.up.railway.app/tags'),
        ]);

        const resourcesData = await resourcesRes.json();
        const tagsData = await tagsRes.json();

        // Convert tags into a map using string keys
        const tagMapObj = {};
        tagsData.forEach(tag => {
          tagMapObj[String(tag.id)] = tag.tag;
        });

        setResources(resourcesData);
        setTagMap(tagMapObj); // set AFTER map is ready
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch resources or tags:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !tagMap) {
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
        {resources.slice(0, visibleArticles).map((resource, id) => (
          <ResourceCard
            key={id}
            title={resource.name}
            url={resource.url}
            author={resource.author}
            date={resource.createdAt}
            tags={resource.appliedTags}
            tagMap={tagMap}
          />
        ))}
      </div>

      <div className={styles.loadMore}>
        {visibleArticles < resources.length && (
          <button onClick={() => setVisibleArticles(prev => prev + 3)}>
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default ResourceList;
