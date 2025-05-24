import React, { useEffect, useState } from 'react';
import ResourceCard from './ResourceCard';
import styles from './Resource.module.css';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [tagMap, setTagMap] = useState(null); // null until loaded
  const [status, setStatus] = useState('loading'); //loading, failed, succeeded
  const [visibleArticles, setVisibleArticles] = useState(6);

  useEffect(() => {
    async function fetchData() {
      setStatus('loading')
      try {
        const [resourcesRes, tagsRes] = await Promise.all([
          fetch('https://seshatbe.up.railway.app/resources'),
          fetch('https://seshatbe.up.railway.app/tags'),
        ]);

        if (!resourcesRes.ok || !tagsRes.ok) {
        throw new Error('Fetch failed');
      }

        const resourcesData = await resourcesRes.json();
        const tagsData = await tagsRes.json();

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

    fetchData();
  }, []);

  if (status === 'failed') {
    return (
      <div className={styles.retry}>
        <h2>Failed to load resources.</h2>
        <p>Please try again later.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (status === 'loading' || !tagMap) {
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
        {resources.slice(0, visibleArticles).map(resource => {
          // Map tags for each resource
          // const convertedTag = (resource.appliedTags || []).map(
          //   (id) => tagMap[id] || 'Unknown'
          // );

          return (
            <ResourceCard
              key={resource.id}
              title={resource.name}
              url={resource.url}
              author={resource.author}
              date={resource.createdAt}
              tags={resource.appliedTags}
              tagMap={tagMap}
            />
          );
        })}
      </div>


      <div className={styles.load_more}>
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
