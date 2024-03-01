import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import apiShortenerRoutes from "./routes/apiShortener.routes.js";
import userRoutes from "./routes/user.routes.js";
import apiAnalyticsRoutes from "./routes/apiAnalytics.routes.js";
import { connection } from "./database.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// Configurating middlewares
app.use(cors());
app.use(json());
app.use(cookieParser());
connection();

// Establishing routing

app.use("/api", apiShortenerRoutes);

app.use("/api/analytics", apiAnalyticsRoutes);

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server on port: ", PORT);
});
