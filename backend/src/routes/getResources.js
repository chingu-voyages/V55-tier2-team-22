import express from "express";
import axios from "axios";
import NodeCache from "node-cache";

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3000 }); // Data stays cached for 50 mins

router.get("/", async (req, res) => {
  const cacheKey = `proxy:${req.originalUrl}`; // Unique cache key per request

  // Step 1: Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log("Returning cached data", cacheKey);
    return res.json(cached);
  }

  try {
    // Step 2: If not cached, fetch data from the slow external server
    const response = await axios.get(
      "https://seshatbe.up.railway.app/resources"
    );

    // Step 3: Store response data in cache
    cache.set(cacheKey, response.data);
    console.log("Fetched from API and cached it");

    // Step 4: Return data to frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch from external server" });
  }
});

export default router;
