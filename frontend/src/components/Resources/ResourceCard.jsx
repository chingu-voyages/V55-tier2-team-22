import React from 'react';

function ResourceCard({ title, url, author, date, tags }) {
  const createdAt = new Date(date);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-white rounded-2xl text-black p-4 m-3 min-h-[20em] w-full shadow">
      {/* Card header */}
      <div className="border-b-2 border-cyan-500 min-h-[100px] flex items-center text-center">
        <h3 className="text-lg font-bold uppercase mb-3 w-full">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
      </div>

      {/* Card body */}
      <div className="flex flex-col items-center justify-center">
        <p className="my-2">
          <strong>By:</strong>{' '}
          <span className="text-[1.2rem]" style={{ fontVariant: 'small-caps' }}>
            {author}
          </span>
        </p>
        <p className="my-2">
          <strong>Published on:</strong>{' '}
          <span className="italic">
            {createdAt.toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </p>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">Tags:</span>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-cyan-400 rounded-full px-3 py-1 text-m font-bold"
              style={{ fontVariant: 'small-caps' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResourceCard;
