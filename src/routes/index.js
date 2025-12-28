import { Router } from "express";
import authRoutes from "./auth.js";

const router = Router();

router.get("/", (_, res) => {
  res.json({ message: "API OK" });
});

router.use("/auth", authRoutes);

export default router;
