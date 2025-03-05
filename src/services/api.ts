import axios from "axios";
import { getToken } from "./tokenStorageService"; // Para pegar o token do armazenamento

// Instância do axios com cabeçalhos padrão
const api = axios.create({
  baseURL: process.env.EXPO_API_BASE_URL, // Utilizando a variável de ambiente
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Isso faz o navegador enviar os cookies (como authToken) automaticamente
});

// Interceptador para adicionar o token nas requisições
api.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Pega o token do armazenamento
    if (token) {
      // Se o token estiver presente e for necessário, o axios o envia automaticamente com os cookies
      // config.headers["Authorization"] = `Bearer ${token}`; // Não precisa adicionar o cabeçalho manualmente, pois o cookie será enviado automaticamente
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

// O backend deve estar configurado corretamente para aceitar o cookie de autenticação.
// O servidor backend deve ter CORS configurado para aceitar requisições com credenciais.
// Os cookies no frontend devem ser configurados com o atributo Secure, o que requer HTTPS.
