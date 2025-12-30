import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/dashboard", authMiddleware, (req, res) =>
  res.json({ message: `Welcome ${req.user.email}`, user: req.user })
);

router.get("/admin-stats", authMiddleware, authorizeRoles("admin"), (req, res) =>
  res.json({ message: "Admin stats accessed!", admin: req.user.email })
);

export default router;
