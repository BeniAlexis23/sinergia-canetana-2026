import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sinergia_canetana";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "local_campaign_secret";
export const CLIENT_ORIGINS = (process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
