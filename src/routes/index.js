import { Router } from "express";
import db from "../db.js";

const router = Router();

// Health Check
router.get("/", (req, res) => {
  res.json({ message: "Rough Scones API OK" });
});

// Database Test
router.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ db: "OK", result: rows[0].result });
  } catch (err) {
    res.status(500).json({ db: "FAIL", error: err.message });
  }
});

export default router;