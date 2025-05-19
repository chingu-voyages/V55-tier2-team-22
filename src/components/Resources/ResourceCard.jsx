import React from 'react';
import styles from './Resource.module.css';
import useTagMap from './useTagMap'

function ResourceCard({ title, url, author, date, tags }) {
    // convert date into Object
    const createdAt = new Date(date);
    // convert tags
    const tagMap = useTagMap();
    const convertedTag = (tags || []).map((id) => tagMap[id] || 'Unknown')

  return (
    <div className={styles.resource_card}>
      <h3>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h3>

      <p>By: <strong>{author}</strong> </p>
      <p>Published on: <strong>{createdAt.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })} </strong>
        </p>

      {convertedTag && convertedTag.length > 0 && (
        <p>Tags: 
            <span className={styles.tags}> {convertedTag.join(', ')} </span>
        </p>
      )}
    </div>
  );
}

export default ResourceCard;
