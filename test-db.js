import { db } from "./src/db.js";

try {
  const [rows] = await db.query("SELECT 1 + 1 AS result");
  console.log("DB OK:", rows);
} catch (err) {
  console.error("DB FAIL:", err.code, err.message);
}
