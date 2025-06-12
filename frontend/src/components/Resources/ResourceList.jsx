import ResourceCard from "./ResourceCard";

function ResourceList({ resources, tagMap }) {
  return (
    <>
      <div className="w-[100%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            // Convert tag IDs to tag names
            const convertedTags = (resource.appliedTags || []).map((id) => tagMap[id] || "Unknown");

            return (
              <ResourceCard
                key={resource.id}
                title={resource.name}
                url={resource.url}
                author={resource.author}
                date={resource.createdAt}
                tags={convertedTags}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ResourceList;
