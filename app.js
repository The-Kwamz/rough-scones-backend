// app.js
import express from "express";
import authRoutes from "./src/routes/auth.js";
import orderRoutes from "./src/routes/orders.js";
import protectedRoutes from "./src/routes/protected.js";

const app = express();
app.use(express.json());

// ROUTE REGISTRATION
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/protected", protectedRoutes);

export default app;
