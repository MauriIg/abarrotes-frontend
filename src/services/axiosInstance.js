// src/services/axiosInstance.js
import axios from 'axios'; // Importa la librería Axios para realizar peticiones HTTP

// Obtiene la URL base de la API desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("❌ VITE_API_URL no está definida. Verifica tu .env y configuración en Vercel.");
}

// Crea una instancia personalizada de Axios con la URL base y los headers por defecto
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token en todas las solicitudes antes de enviarlas
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
