import React, { useEffect, useState } from 'react';
import ResourceCard from './ResourceCard';
import styles from './Resource.module.css';
import useTagMap from './useTagMap';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleArticles, setVisibleArticles] = useState(6);
  const {loading:loadingTags} = useTagMap()

  useEffect(() => {
    fetch('https://seshatbe.up.railway.app/resources')
    // fetch('https://jsonplaceholder.typicode.com/posts')  //Test api if the one on Chingu isn't working
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
        console.log(data)
      })
      .catch((err) => {
        console.error('Failed to fetch resources:', err);
        setLoading(false);
      });
  }, []);

//   Loading spinner
  function LoadingSpinner() {
    return <div className={styles.spinner}></div>;
    }
//  While data is fetched show loading spinner
  if (loading || loadingTags) return (
    <div className={styles.loading}>
        <h2>Fetching Data... </h2>
        <LoadingSpinner/>
    </div>
    );

  return (
    <>
        <div className={styles.resource_section}>
        {
            resources.slice(0, visibleArticles).map((resource, id) => {
                return (<ResourceCard
                    key={id}
                    title={resource.name}
                    url={resource.url}
                    author={resource.author}
                    date={resource.createdAt}
                    tags={resource.appliedTags}
                />)
            })
        }
    </div>

    {/* Load more button */}
    <div className={styles.loadMore}>
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
