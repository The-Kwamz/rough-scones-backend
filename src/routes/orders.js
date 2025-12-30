import { Router } from "express";
import { getOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getOrders);

export default router;
