import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { CLIENT_ORIGINS } from "./config.js";
import authRoutes from "./routes/auth.routes.js";
import noticeRoutes from "./routes/notices.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin(origin, callback) {
    if (!origin || CLIENT_ORIGINS.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} no permitido por CORS`));
  },
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "sinergia-canetana-api" });
});

app.use("/api", authRoutes);
app.use("/api", noticeRoutes);

export default app;
