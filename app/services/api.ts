import axios from "axios";

// Criação de uma instância do Axios com a URL da API vindo do arquivo .env
const api = axios.create({
  baseURL: process.env.EXPO_API_BASE_URL, // Utilizando a variável de ambiente
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
