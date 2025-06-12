import ResourceCard from "./ResourceCard";

function ResourceList({ resources, tagMap }) {
  return (
    <>
      <div className="w-[100%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.length === 0 ? (
            <div className="w-max items-center mx-auto my-5">
              <h3 className="text-2xl">There are no results with these options yet!</h3>
              <p className="text-center py-4">
                Try a different <b>keyword</b> or <b>filter</b> option. (TODO)
              </p>
            </div>
          ) : (
            resources.map((resource) => {
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
            })
          )}
        </div>
      </div>
    </>
  );
}

export default ResourceList;
