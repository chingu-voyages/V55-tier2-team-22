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
                <span>{author} </span>
            </p>
            <p><strong> Published on: </strong>
            {createdAt.toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
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
