import React, { useEffect, useState } from 'react';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://seshatbe.up.railway.app/resources')
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

  if (loading) return console.log("fetching data");

  return (
    resources
  );
}

export default ResourceList;
