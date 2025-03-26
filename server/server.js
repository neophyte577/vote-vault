import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fileService from "./routes/fileService.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8008;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, './dist')));

app.use(express.json());

app.use("/download", fileService);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
