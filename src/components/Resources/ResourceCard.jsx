import React from 'react';
import styles from './Resource.module.css';

function ResourceCard({ title, url, author, date, tags }) {
  const createdAt = new Date(date);

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
        <p>
          <strong>By:</strong>{' '}
          <span className={styles.author}>{author}</span>
        </p>
        <p>
          <strong>Published on:</strong>{' '}
          <span className={styles.date}>
            {createdAt.toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </p>
      </div>

      {tags && tags.length > 0 && (
        <div className={styles.tag_list}>
          <span>Tags:</span>
          {tags.map((tag, index) => (
            <span className={styles.tag} key={index}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourceCard;
