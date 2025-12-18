import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({
  path: "./env",
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

await dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error", error);
  });
