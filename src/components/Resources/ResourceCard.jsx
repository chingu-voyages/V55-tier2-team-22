import React from 'react';
import styles from './Resource.module.css';

function ResourceCard({ title, url, author, date, tags, tagMap }) {
    // convert date into Object
    const createdAt = new Date(date);
    // map tags
    const convertedTag = (tags || []).map((id) => tagMap[id] || 'Unknown')

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
                <strong> By: </strong>
                <span className={styles.author}>{author} </span>
            </p>
            <p>
                <strong> Published on: </strong>
                <span className={styles.date}>
                    {createdAt.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}

                </span>
            </p>

        </div>

        <div className={styles.card_footer}>
            {convertedTag && convertedTag.length > 0 && (
                <p>Tags:
                    {convertedTag.map((tag, index) => (
                        <span className={styles.tags} key={index}>{tag}</span>
                    ))}
                </p>
      )}
        </div>
    </div>
  );
}

export default ResourceCard;
