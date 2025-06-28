import axios from "axios";

// ✅ Obtiene la URL desde variables de entorno
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("❌ VITE_API_URL no está definida. Verifica tu .env o configuración en Vercel.");
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
