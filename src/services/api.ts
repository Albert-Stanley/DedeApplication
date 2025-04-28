import axios from "axios";
import { getToken } from "./tokenStorageService";
import { Platform } from "react-native";

// Instância do axios
const api = axios.create({
  baseURL: process.env.EXPO_API_BASE_URL, // Define a URL base das requisições / variável de ambiente
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptador para adicionar token
api.interceptors.request.use(
  async (config) => {
    if (Platform.OS !== "web") {
      const token = await getToken();
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

/**
 * Observações:
 * - Backend deve aceitar credenciais e configurar CORS corretamente.
 * - Cookies seguros (Secure) exigem HTTPS.
 */
