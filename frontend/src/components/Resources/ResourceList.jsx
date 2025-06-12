import ResourceCard from "./ResourceCard";

function ResourceList({ resources, tagMap, clearAllFilters, areFiltersUsed }) {
  return (
    <>
      <div className="w-[100%] mx-auto">
        {resources.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-fit mx-auto my-5">
            <h3 className="text-2xl">We didn't find any results</h3>
            <p className="text-center py-4">Try typing in something different, or changing your tags.</p>
            {areFiltersUsed && (
              <>
                <p>Or...</p>
                <button onClick={clearAllFilters} className="text-sm">Clear all filters</button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => {
              // Convert tag IDs to tag names
              const tagName = (resource.appliedTags || []).map((id) => tagMap[id] || "Unknown");

              return (
                <ResourceCard
                  key={resource.id}
                  title={resource.name}
                  url={resource.url}
                  author={resource.author}
                  date={resource.createdAt}
                  tags={tagName}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ResourceList;
