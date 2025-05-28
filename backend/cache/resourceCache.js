import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 3000, // 50 minutes
  checkperiod: 60,
  deleteOnExpire: false,
});

const cacheKey = `proxy:${req.originalUrl}`; // Unique cache key per request

// Preload cache on server start
export const preloadCahe = async () => {
  try {
    const response = await axios.get(
      "https://seshatbe.up.railway.app/resources"
    );
    cache.set(cacheKey, response.data);
    console.log("Preloaded cache");
  } catch (error) {
    console.log("error preloading cache", error.message);
  }
};

cache.on("expired", async (key, oldValue) => {
  try {
    const response = await axios.get(
      "https://seshatbe.up.railway.app/resources"
    );
    cache.set(key, response.data);
    console.log("Refreshed cache for:", key);
  } catch (err) {
    console.error("Refresh failed. Re-using old cache for", key);
    cache.set(key, oldValue); // re-cache old data
  }
});

//This is a helper function that you’ll call from your route file. It checks the cache and returns the stored data (even if expired).

export const getCachedData = () => cache.get(cacheKey);
