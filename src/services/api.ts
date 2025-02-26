import axios from "axios";
import { getToken } from "./storageService"; // Para pegar o token do armazenamento

// Instância do axios com cabeçalhos padrão
const api = axios.create({
  baseURL: process.env.EXPO_API_BASE_URL, // Utilizando a variável de ambiente
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para adicionar o token nas requisições
api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Pega o token do armazenamento
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Adiciona no cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
