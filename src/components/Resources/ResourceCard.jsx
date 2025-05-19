import React from 'react';

function ResourceCard({ title, url, tags }) {
  return (
    <div>
      <h3>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h3>
      {tags && tags.length > 0 && (
        <p>Tags: {tags.join(', ')}</p>
      )}
    </div>
  );
}

export default ResourceCard;
