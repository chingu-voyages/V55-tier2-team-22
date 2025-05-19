import React, { useEffect, useState } from 'react';
import ResourceCard from './ResourceCard';
import styles from './Resource.module.css';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

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

  function LoadingSpinner() {
    return <div className={styles.spinner}></div>;
    }

  if (loading) return (
    <div className={styles.loading}>
        <h2>Fetching Data... </h2>
        <LoadingSpinner/>
    </div>
    );

  return (
    <div>
        {
            resources.map((resource, id) => {
                return (<ResourceCard
                    key={id}
                    title={resource.name}
                    url={resource.url}
                    tags={resource.appliedTags}
                />)
            })
        }
    </div>
  );
}

export default ResourceList;
