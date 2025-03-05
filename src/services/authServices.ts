import api from "./api"; // Instância do axios
import { saveToken, getToken, removeToken } from "./tokenStorageService"; // Serviços para guardar e remover o token

// Interface do usuário
export interface User {
  id: string;
  CRMorEmail: string;
  name: string;
  token: string;
}

// Interface da resposta do login
interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Função para lidar com erros de requisição
const handleError = (error: any) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Erro ao conectar com a API"
  );
};

// Função de Login (POST)
export const login = async (
  CRMorEmail: string,
  Password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/users/login", {
      CRMorEmail,
      Password,
    });

    // Verificando se a resposta foi bem-sucedida e se contém o usuário e o token
    if (!response.data.success || !response.data.token || !response.data.user) {
      return {
        success: false,
        message: response.data.message || "Erro ao autenticar usuário.",
      };
    }

    // Salva o token no armazenamento adequado
    await saveToken(response.data.token);

    return response.data;
  } catch (error) {
    console.error("Erro no login:", handleError(error));
    return {
      success: false,
      message: handleError(error),
    };
  }
};

// Função para verificar se o usuário existe (GET)
export const verifyUser = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await api.get<User[]>("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Considerando que o usuário é único por token, podemos usar o primeiro
    const user = response.data.find((user) => user.token === token);

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado.",
      };
    }

    return {
      success: true,
      message: "Usuário encontrado",
      user,
    };
  } catch (error) {
    console.error("Erro ao verificar usuário:", handleError(error));
    return {
      success: false,
      message: handleError(error),
    };
  }
};

// Função para pegar o token armazenado (web ou mobile)
export const fetchToken = async (): Promise<string | null> => {
  try {
    return await getToken();
  } catch {
    return null;
  }
};

// Função para remover o token (logout)
export const logout = async () => {
  await removeToken();
};

// Função de Cadastro de Usuário (POST)
export const registerUser = async (
  Name: string,
  CPF: string,
  CNPJ: string,
  DataNascimento: string,
  CRM: string,
  HospitalName: string,
  UF: string,
  Email: string,
  Password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/users/register", {
      Name,
      CRM,
      CPF,
      CNPJ,
      DataNascimento,
      HospitalName,
      UF,
      Email,
      Password,
    });

    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message || "Erro ao cadastrar usuário.",
      };
    }

    return response.data;
  } catch (error) {
    console.error("Erro no cadastro:", handleError(error));
    return {
      success: false,
      message: handleError(error),
    };
  }
};
