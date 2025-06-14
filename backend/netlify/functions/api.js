import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import getResources from "#src/routes/getResources";
import getTags from "#src/routes/getTags";

const app = express();
app.use(cors());
app.use("/api/resources", getResources);
app.use("/api/tags", getTags);

export const handler = serverless(app);
