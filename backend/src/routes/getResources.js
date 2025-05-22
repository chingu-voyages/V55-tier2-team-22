import express from "express";
import axios from "axios";
import NodeCache from "node-cache";

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3000 }); //this keeps the cache data for 50 mins

router.get("/", async (req, res) => {
  const cacheKey = `proxy:${req.originalUrl}`;

  // Check if we already have cached data
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log("Returning cached data");
    return res.json(cached);
  }

  try {
    const response = await axios.get(
      "https://seshatbe.up.railway.app/resources"
    );
    cache.set(cacheKey, response.data);
    console.log("Fetched from API and cached it");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from chigu server:", error.message);
    res.status(500).json({ error: "Failed to fetch from upstream server" });
  }
});
export default router;
