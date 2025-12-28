import dotenv from "dotenv";
dotenv.config();
console.log("JWT SECRET LOADED:", process.env.JWT_SECRET);

import app from "./app.js";
import { query } from "./db.js";

const PORT = process.env.PORT || 4000;

console.log(">>> ENV DEBUG:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  port: process.env.DB_PORT
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await query("SELECT 1");
    console.log("MySQL connected successfully!");
  } catch (err) {
    console.error("DB error:", err);
  }
});