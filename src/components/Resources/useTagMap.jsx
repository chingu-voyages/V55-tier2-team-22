import React, { useEffect, useState } from 'react';

function useTagMap() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('https://seshatbe.up.railway.app/tags')
      .then((response) => response.json())
      .then((data) => {
        const map = [];
        data.forEach(tag => {
                map[tag.id] = tag.tag;
            });
        setTags(map)
        })
  }, []);

  return tags
}

export default useTagMap;
