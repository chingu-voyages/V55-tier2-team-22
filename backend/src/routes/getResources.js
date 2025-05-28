import express from "express";
import { getCachedData } from "../../cache/resourceCache.js";

const router = express.Router();

router.get("/", (req, res) => {
  const cached = getCachedData();
  if (cached) {
    return res.json(cached);
  }

  res
    .status(503)
    .json({ error: "No cached data available. Please try again shortly." });
});

export default router;
