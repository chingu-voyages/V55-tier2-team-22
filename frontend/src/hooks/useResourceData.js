import { useState, useEffect } from "react";
import { getResources, getTags } from "@/util/getResourceData";

/**
 * @typedef {Object} Resource
 * @property {string} author - The username of the poster.
 * @property {string} name - The title.
 * @property {string[]} appliedTags - A list of tag IDs that apply to the resource. This is only an array of strings, not a field of type `Tag[]`.
 * @property {string} url - A URL pointing to the referenced website.
 * @property {string} createdAt - An ISO 8601 timestamp representing when the resource was posted.
 * @property {string} id - An exclusive ID.
 *
 * @typedef {Object} Tag
 * @property {string} id - The tag's id (e.g. "1011").
 * @property {string} tag - The displayed name of the tag (e.g. "JavaScript").
 *
 * @typedef {Object} ResourceDataReturn
 * @property {Resource[]} resources - An array of resources
 * @property {Tag[]} tags - An array of tags
 * @property {Object} idToTagMap - An object that maps tag IDs to their name.
 * @property {("loading"|"failed"|"succeeded")} status - The status of data fetching.
 * @property {() => Promise<void>} fetchData - A function that fetches the data and populates the fields.
 *
 * @returns {ResourceDataReturn}
 */
export function useResourceData() {
  const [status, setStatus] = useState("loading"); //loading, failed, succeeded
  const [resources, setResources] = useState([]);
  const [tags, setTags] = useState(null); // null until loaded
  const [idToTagMap, setIdToTagMap] = useState(null); // null until loaded

  async function fetchData() {
    setStatus("loading");

    try {
      const [resourcesData, tagsData] = await Promise.all([getResources(), getTags()]);

      // Make an object that maps tag IDs to their names
      const tagMap = {};
      tagsData.forEach((tag) => {
        tagMap[String(tag.id)] = tag.tag;
      });

      setResources(resourcesData);
      setTags(tagsData);
      setIdToTagMap(tagMap);
      setStatus("succeeded");
    } catch (error) {
      console.error("Failed to fetch resources or tags:", error);
      setStatus("failed");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    resources,
    tags,
    idToTagMap,
    status,
    fetchData
  };
}
