import React from 'react';
import styles from './Resource.module.css';

function ResourceCard({ title, url, author, date, tags, tagMap }) {
  const createdAt = new Date(date);

  // Safe tag lookup using string IDs
  const convertedTags = (tags || []).map(id => tagMap[String(id)] || 'Unknown');

  return (
    <div className={styles.resource_card}>
      <div className={styles.card_header}>
        <h3>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
      </div>

      <div className={styles.card_body}>
        <p><strong>By:</strong> {author}</p>
        <p><strong>Published on:</strong> {createdAt.toLocaleDateString('en-GB')}</p>
      </div>

      <div className={styles.card_footer}>
        {convertedTags.length > 0 && (
          <p>Tags:
            {convertedTags.map((tag, index) => (
              <span className={styles.tags} key={index}>{tag}</span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResourceCard;
