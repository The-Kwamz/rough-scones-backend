import dotenv from "dotenv";
dotenv.config(); // Load .env here so db.js has access

import mysql from "mysql2/promise";
import fs from "fs";

console.log("Connecting to DB with:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync("./server-ca.pem"),
    rejectUnauthorized: false
  }
});

export const query = (sql, params) => pool.execute(sql, params);