import axios from "axios";
import { Platform } from "react-native";

const baseURL = process.env.EXPO_API_BASE_URL;
// Instância do axios
const api = axios.create({
  baseURL,
  // timeout: 10000, // Tempo limite de 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Configuração crucial para cookies HTTPOnly em ambiente web
if (Platform.OS === "web") {
  api.defaults.withCredentials = true;
}

// import { useAuthStore } from "@/features/auth/store/authStore"; // Cuidado com importações diretas da store em services de baixo nível

export default api;

/**
 * Observações:
 * - Backend deve aceitar credenciais e configurar CORS corretamente.
 * - Cookies seguros (Secure) exigem HTTPS.
 */
