import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:3000/api",
  withCredentials: true
});

export const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:3000/api").replace("/api", "");

export default instance;
