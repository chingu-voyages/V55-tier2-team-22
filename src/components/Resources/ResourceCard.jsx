import React from 'react';
import styles from './Resource.module.css';

function ResourceCard({ title, url, author, date, tags }) {
    const createdAt = new Date(date);

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

      {tags && tags.length > 0 && (
        <p>Tags: {tags.join(', ')}</p>
      )}
    </div>
  );
}

export default ResourceCard;
