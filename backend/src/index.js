import express from "express";
import getResources from "./routes/getResources.js";

const app = express();

// Once a request comes from the frontend through /api/resources, it'll be forwarded to "getResources" to handle
app.use("/api/data", getResources);

app.listen("7000", () => {
  console.log("app is running on port 7000");
});
