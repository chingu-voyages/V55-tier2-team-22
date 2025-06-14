/**
 * @typedef Tag
 * @property {string} tag
 * @property {string} id
 *
 * @typedef Resource
 * @property {string} author
 * @property {string} name
 * @property {Tag[]} appliedTags
 * @property {string} url
 * @property {string} createdAt
 * @property {string} id
 */

/**
 * @returns {Resource[]}
 */
export async function getResources() {
  const response = await fetch(`${import.meta.env.VITE_DATA_API_URL}/resources`);
  const resources = await response.json();
  return resources;
}

/**
 * @returns {Tag[]}
 */
export async function getTags() {
  const response = await fetch(`${import.meta.env.VITE_DATA_API_URL}/tags`);
  const tags = await response.json();
  return tags;
}
