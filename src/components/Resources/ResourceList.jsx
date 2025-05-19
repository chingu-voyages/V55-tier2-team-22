import React, { useEffect, useState } from 'react';
import ResourceCard from './ResourceCard';

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

  if (loading) return <p>Fetching Data... </p>;

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
