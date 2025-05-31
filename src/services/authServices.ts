// services/authServices.ts

import axios from "axios";
import api from "./api"; // Instância do axios configurada com baseURL e opções globais
import { saveToken, getToken, removeToken } from "./tokenStorageService";
import { Platform } from "react-native";
import type { RegisterUserData } from "@/features/auth/store/types";

// Interface do usuário retornado pela API
export interface User {
  id: string;
  CRMorEmail: string; // Identificador usado para login
  name: string;
  // O token é gerenciado separadamente via cookie (web) ou SecureStore (mobile)
}

// Interface base para respostas de autenticação
interface AuthResponseBase {
  success: boolean;
  message: string;
}

// Resposta esperada no login
export interface LoginResponse extends AuthResponseBase {
  user?: User;
  token?: string; // Retornado no mobile para salvar localmente
}

// Resposta da verificação de sessão/autenticação
export interface VerifyUserResponse extends AuthResponseBase {
  user?: User;
}

// Resposta do cadastro de usuário
export interface RegisterResponse extends AuthResponseBase {
  data?: {
    Name: string;
    CPF: string;
    CNPJ?: string;
    DataNascimento: string;
    CRM?: string;
    Email: string;
    HospitalName: string;
    UF: string;
  };
}

// Resposta genérica da API
export interface GenericResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

// Tratamento padronizado de erros da API
const handleError = (
  error: any,
  defaultMessage: string = "Erro de comunicação com a API"
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || defaultMessage;
  }
  return error?.message || defaultMessage;
};

// Realiza o login (POST /users/login)
export const login = async (
  CRMorEmail: string,
  Password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/users/login", {
      CRMorEmail,
      Password,
    });

    // No mobile, salva o token retornado
    if (response.data.success && response.data.token && Platform.OS !== "web") {
      await saveToken(response.data.token);
    }

    if (response.data.success && response.data.user) {
      return {
        success: true,
        message: response.data.message || "Login bem-sucedido.",
        user: response.data.user,
        token: response.data.token,
      };
    }

    return {
      success: false,
      message:
        response.data.message || "Credenciais inválidas ou erro no login.",
    };
  } catch (error: any) {
    const errorMessage = handleError(error, "Erro ao tentar fazer login.");
    console.error("Erro no login:", errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Verifica o usuário autenticado (GET /auth/me)
// No mobile, adiciona o token manualmente no header.
// Na web, o cookie HttpOnly é enviado automaticamente.
export const verifyCurrentUser = async (): Promise<VerifyUserResponse> => {
  try {
    let tokenForMobile: string | null = null;
    const headers: Record<string, string> = {};

    if (Platform.OS !== "web") {
      tokenForMobile = await getToken();
      if (!tokenForMobile) {
        return {
          success: false,
          message: "Token de autenticação ausente (mobile).",
        };
      }
      headers["Authorization"] = `Bearer ${tokenForMobile}`;
    }

    const response = await api.get<VerifyUserResponse>("/auth/me", { headers });

    if (response.data.success && response.data.user) {
      return {
        success: true,
        message: "Usuário verificado com sucesso.",
        user: response.data.user,
      };
    }

    return {
      success: false,
      message: response.data.message || "Falha ao verificar usuário.",
    };
  } catch (error: any) {
    const errorMessage = handleError(
      error,
      "Erro ao verificar o usuário atual."
    );
    console.error("Erro ao verificar usuário:", errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Recupera o token armazenado localmente (somente no mobile)
export const fetchStoredToken = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    console.info(
      "Web: fetchStoredToken não aplicável (token via cookie HttpOnly)."
    );
    return null;
  }
  try {
    return await getToken();
  } catch {
    return null;
  }
};

// Efetua logout do usuário (POST /users/logout)
// No mobile, remove o token salvo. Na web, o backend deve limpar o cookie.
export const logout = async (): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      await api.post("/users/logout"); // Limpa o cookie de sessão
    }
    await removeToken(); // Remove token local no mobile
  } catch (error: any) {
    console.error(
      "Erro durante o processo de logout:",
      handleError(error, "Erro ao fazer logout.")
    );
    if (Platform.OS !== "web") {
      await removeToken();
    }
  }
};

// Cadastra um novo usuário (POST /users/register)
export const registerUser = async (
  userData: Omit<RegisterUserData, "confirmPassword">
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      "/users/register",
      userData
    );

    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message || "Erro ao cadastrar usuário.",
      };
    }

    return response.data;
  } catch (error: any) {
    const errorMessage = handleError(error, "Erro no cadastro.");
    console.error("Erro no cadastro:", errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Envia e-mail com código de verificação (POST /users/send-verification-email)
export const sendVerificationEmail = async (
  Email: string
): Promise<GenericResponse> => {
  try {
    const response = await api.post<GenericResponse>(
      "/users/send-verification-email",
      { Email }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage = handleError(
      error,
      "Erro ao enviar e-mail de verificação."
    );
    console.error("Erro ao enviar e-mail de verificação:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

// Valida o código de verificação recebido por e-mail (POST /users/verify-email-code)
export const verifyEmailCode = async (
  code: string,
  email: string
): Promise<GenericResponse> => {
  try {
    const response = await api.post<GenericResponse>(
      "/users/verify-email-code",
      { code, email }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage = handleError(
      error,
      "Erro ao validar código de verificação."
    );
    console.error("Erro ao validar código de verificação:", errorMessage);
    return { success: false, message: errorMessage };
  }
};
