import api from "./api"; // Instância do axios
import { saveToken, getToken, removeToken } from "./storageService"; // Serviços para guardar e remover o token

// Interface do usuário
interface User {
  id: string;
  CRMorEmail: string;
  name: string;
}

// Interface da resposta do login
interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

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

    if (!response.data.success || !response.data.token) {
      return {
        success: false,
        message: response.data.message || "Erro ao autenticar usuário.",
      };
    }

    // Salva o token no armazenamento adequado
    await saveToken(response.data.token);

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro no login:",
      error?.response?.data?.message || error.message
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Erro ao conectar com a API",
    };
  }
};

// Função para verificar se o usuário existe (GET)
export const verifyUser = async (CRMorEmail: string): Promise<AuthResponse> => {
  try {
    const response = await api.get<User[]>("/users");

    const user = response.data.find((user) => user.CRMorEmail === CRMorEmail);

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
  } catch (error: any) {
    console.error(
      "Erro ao verificar usuário:",
      error?.response?.data?.message || error.message
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Erro ao conectar com a API",
    };
  }
};

// Função para pegar o token armazenado (web ou mobile)
export const fetchToken = async (): Promise<string | null> => {
  return await getToken();
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
  } catch (error: any) {
    console.error(
      "Erro no cadastro:",
      error?.response?.data?.message || error.message
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Erro ao conectar com a API",
    };
  }
};
