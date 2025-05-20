import React, { useEffect, useState } from 'react';

function useTagMap() {
  const [tags, setTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);

  useEffect(() => {
    fetch('https://seshatbe.up.railway.app/tags')
      .then((response) => response.json())
      .then((data) => {
        const map = [];
        data.forEach(tag => {
                map[tag.id] = tag.tag;
            });
        setTags(map);
        setLoadingTags(false)
        })
      .catch((err) => {
            console.error('Failed to fetch resources:', err);
            setLoadingTags(false);
          });
      }, []);

  return tags
}

export default useTagMap;
