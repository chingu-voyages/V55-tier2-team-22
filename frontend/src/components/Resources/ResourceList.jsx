import ResourceCard from './ResourceCard';
import styles from './Resource.module.css';

function ResourceList({ resourceList , tagMap}) {
  return (
    <>
      <div className={styles.resource_section}>
        {resourceList.map(resource => {
          // Convert tag IDs to tag names
          const convertedTag = (resource.appliedTags || []).map(
            (id) => tagMap[id] || 'Unknown'
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
    </>
  );
}

export default ResourceList;
