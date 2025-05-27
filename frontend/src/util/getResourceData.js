// Vite has native support for importing and parsing JSONs from local files.
import resources from "@/assets/data/resources.json";
import tags from "@/assets/data/tags.json";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

/*
 The idea here behind these two functions (getResources and getTags) is to encapsulate 
 the resource fetching code.
 
 Any code that needs resource data should call these functions instead of calling fetch(). 
 That way, the code doesn't have to care where the resource data is coming from, just that it gets the data. 
 
 This is useful for because we can easily change how and where we're getting the resource data without 
 having to reprogram other parts of the app. To put it specifically, even though the proxy server is not finished 
 and usable yet, we can fake/mock its functionality, and work on other features as if it is finished.

 Simply put:
 Since the proxy server is not finished, these functions return data stored in local files.
 After the proxy server is finished, we can update these functions to fetch from the proxy server instead.
*/

/**
 * @returns {Resource[]}
 */
export async function getResources() {
  // Sleep for a few milliseconds to simulate server response time
  await sleep(1000);
  return resources;
}

/**
 * @returns {Tag[]}
 */
export async function getTags() {
  // Sleep for a few milliseconds to simulate server response time
  await sleep(1000);
  return tags;
}
