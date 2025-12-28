import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/dashboard", authenticate, (req, res) => {
  res.json({
    message: `Welcome ${req.user.email}, you are authenticated!`,
    user: req.user
  });
});

export default router;