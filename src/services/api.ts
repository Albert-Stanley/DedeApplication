import axios from "axios";
// import { getToken } from "./tokenStorageService";
import { Platform } from "react-native";

const baseURL = process.env.EXPO_API_BASE_URL;
// Instância do axios
const api = axios.create({
  baseURL, // Define a URL base das requisições / variável de ambiente
  timeout: 10000, // Tempo limite de 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Configuração crucial para cookies HTTPOnly em ambiente web
if (Platform.OS === "web") {
  api.defaults.withCredentials = true;
}

// Exemplo de como um interceptor poderia ser se você usasse a store aqui (requer cuidado para evitar dependência cíclica):
// import { useAuthStore } from "@/features/auth/store/authStore"; // Cuidado com importações diretas da store em services de baixo nível

// api.interceptors.request.use(
//   async (config) => {
//     if (Platform.OS !== 'web') {
//       // Para mobile, tentamos pegar o token da store
//       // É melhor pegar o token da store no momento da chamada da API no service específico,
//       // em vez de diretamente no interceptor para evitar complexidade.
//       const token = useAuthStore.getState().token; // Acesso síncrono ao estado
//       if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;

/**
 * Observações:
 * - Backend deve aceitar credenciais e configurar CORS corretamente.
 * - Cookies seguros (Secure) exigem HTTPS.
 */
