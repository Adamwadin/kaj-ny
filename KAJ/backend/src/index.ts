import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/movies", (req, res) => {
  const filePath = path.join(__dirname, "../data/movies.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read the file" });
    }
    res.json(JSON.parse(data));
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
