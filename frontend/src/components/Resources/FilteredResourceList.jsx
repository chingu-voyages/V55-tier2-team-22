import React from "react";
import ResourceCard from "./ResourceCard";
import styles from "./Resource.module.css";

function FilteredResourceList({ resources, tagMap, filterType }) {
  const [visibleArticles, setVisibleArticles] = React.useState(6);

  if (resources.length === 0) {
    return (
      <div className="w-max items-center mx-auto my-5">
        <h3 className="text-2xl">
          Sorry no results found for this <b>{filterType}</b>
        </h3>
        <p className="text-center py-4">
          Try a different <b>keyword</b> or <b>filter </b>option.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.resource_section}>
        {resources.slice(0, visibleArticles).map((resource) => {
          const convertedTag = (resource.appliedTags || []).map(
            (id) => tagMap[id] || "Unknown"
          );

          return (
            <ResourceCard
              key={resource.id}
              title={resource.name}
              url={resource.url}
              author={resource.author}
              date={resource.createdAt}
              tags={convertedTag}
            />
          );
        })}
      </div>

      <div className={styles.load_more}>
        {visibleArticles < resources.length && (
          <button onClick={() => setVisibleArticles((prev) => prev + 3)}>
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default FilteredResourceList;
