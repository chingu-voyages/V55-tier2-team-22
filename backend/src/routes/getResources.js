import express from "express";
import { db } from "#src/database/db";
import { doc, getDoc } from "firebase/firestore";

const router = express.Router();

router.get("/", async (req, res) => {
  const snap = await getDoc(doc(db, "data/resources"));

  if (snap.exists()) {
    const dbValue = snap.data()["value"];
    const data = JSON.parse(dbValue);

    return res.json(data);
  }

  res.status(503).json({
    error:
      "Data for this request is not available yet. Please try again shortly.",
  });
});

export default router;
