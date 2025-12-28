import express from "express";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protected.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

export default app;
