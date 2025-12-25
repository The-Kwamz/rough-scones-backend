import mysql from "mysql2/promise";
import fs from "fs";
import { config } from "./config.js";

export const db = await mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT,
  ssl: {
    ca: fs.readFileSync("./server-ca.pem"),
  },
});