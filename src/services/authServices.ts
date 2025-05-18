// services/authServices.ts
import axios from "axios";
import api from "./api"; // Instância do axios configurada
import { saveToken, getToken, removeToken } from "./tokenStorageService";
import { Platform } from "react-native";
import type { RegisterUserData } from "@/features/auth/store/types";

// Interface do usuário
export interface User {
  id: string;
  CRMorEmail: string; // Supondo que o backend retorne isso
  name: string;
  // O token não precisa estar na interface User se ele é gerenciado separadamente
  // ou se o backend não o retorna explicitamente em todos os endpoints de usuário.
  // Se o endpoint /auth/me retorna o token, pode mantê-lo.
  // token?: string; // Removido pois o token JWT em si é gerenciado pelo cookie (web) ou SecureStore (mobile)
}

// Interface da resposta do login
// O backend, no login para web, pode não retornar o token no corpo,
// mas sim apenas no cookie HttpOnly. No entanto, para mobile, ele deve retornar o token.
// A store ainda pode querer armazenar o token para mobile.
interface AuthResponseBase {
  success: boolean;
  message: string;
}

export interface LoginResponse extends AuthResponseBase {
  user?: User;
  token?: string; // O token pode ser retornado para mobile, ou para popular a store
}

export interface VerifyUserResponse extends AuthResponseBase {
  user?: User;
}

// Para respostas do cadastro que incluem `data`
export interface RegisterResponse extends AuthResponseBase {
  data?: {
    // Supondo que 'data' seja o objeto do usuário recém-criado antes da verificação
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

// Interface para respostas genéricas de sucesso/erro
export interface GenericResponse {
  success: boolean;
  message: string;
  [key: string]: any; // Para campos adicionais
}

// Função para lidar com erros de requisição
const handleError = (
  error: any,
  defaultMessage: string = "Erro de comunicação com a API"
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || defaultMessage;
  }
  return error?.message || defaultMessage;
};

// Função de Login (POST)
export const login = async (
  CRMorEmail: string,
  Password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/users/login", {
      CRMorEmail,
      Password,
    });

    // Para web, o backend deve ter setado o cookie HttpOnly.
    // Para mobile, esperamos um token na resposta para salvar no SecureStore.
    if (response.data.success && response.data.token && Platform.OS !== "web") {
      await saveToken(response.data.token); // Salva apenas em mobile
    }

    // Mesmo na web, se o backend retornar dados do usuário e token no corpo, usamos.
    // O importante é que o cookie HttpOnly é o principal para autenticação web.
    if (response.data.success && response.data.user) {
      return {
        success: true,
        message: response.data.message || "Login bem-sucedido.",
        user: response.data.user,
        token: response.data.token, // Pode ser útil para a store, mesmo na web
      };
    } else {
      return {
        success: false,
        message:
          response.data.message || "Credenciais inválidas ou erro no login.",
      };
    }
  } catch (error: any) {
    const errorMessage = handleError(error, "Erro ao tentar fazer login.");
    console.error("Erro no login:", errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Função para verificar o usuário autenticado (GET /auth/me)
// Esta função substitui a anterior que buscava /users e filtrava.
// Na web, o cookie HttpOnly será enviado automaticamente.
// No mobile, o token do SecureStore precisa ser enviado no header.
export const verifyCurrentUser = async (): Promise<VerifyUserResponse> => {
  try {
    let tokenForMobile: string | null = null;
    const headers: Record<string, string> = {};

    if (Platform.OS !== "web") {
      tokenForMobile = await getToken(); // Pega do SecureStore
      if (!tokenForMobile) {
        // Se não há token no mobile, não há como verificar o usuário
        return {
          success: false,
          message:
            "Nenhum token de autenticação encontrado para verificação (mobile).",
        };
      }
      headers["Authorization"] = `Bearer ${tokenForMobile}`;
    }
    // Para web, withCredentials:true no Axios cuida do cookie. Nenhuma ação de header aqui.

    const response = await api.get<VerifyUserResponse>("/auth/me", { headers }); // Endpoint dedicado

    if (response.data.success && response.data.user) {
      return {
        success: true,
        message: "Usuário verificado com sucesso.",
        user: response.data.user,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Falha ao verificar usuário.",
      };
    }
  } catch (error: any) {
    const errorMessage = handleError(
      error,
      "Erro ao verificar o usuário atual."
    );
    // Um erro 401 ou 403 aqui geralmente significa que não há sessão válida.
    console.error("Erro ao verificar usuário:", errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Função para buscar o token (relevante principalmente para mobile no início)
// Na web, isso não "busca" o cookie, apenas verifica se ele existe implicitamente via verifyCurrentUser.
export const fetchStoredToken = async (): Promise<string | null> => {
  // Esta função é primariamente para mobile obter o token do SecureStore.
  // Na web, não há token para buscar do JS.
  if (Platform.OS === "web") {
    console.info(
      "Web: fetchStoredToken não é aplicável para cookies HttpOnly."
    );
    return null;
  }
  try {
    return await getToken(); // getToken já lida com Platform.OS
  } catch {
    return null;
  }
};

// Função de Logout
export const logout = async (): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      // Na web, precisamos chamar um endpoint de logout no backend para limpar o cookie HttpOnly.
      // O backend deve responder invalidando o cookie (e.g., Set-Cookie com Max-Age=0).
      await api.post("/users/logout"); // Endpoint que limpa o cookie no backend
      // O removeToken para web no tokenStorageService é um no-op em termos de limpar o cookie.
    }
    // Para ambas as plataformas, removemos o token do armazenamento local (relevante para mobile)
    // e o estado da store será limpo.
    await removeToken(); // Remove do SecureStore no mobile.
  } catch (error: any) {
    // Mesmo que a chamada de logout da API falhe, tentamos limpar localmente.
    // O estado na store será limpo de qualquer forma.
    console.error(
      "Erro durante o processo de logout:",
      handleError(error, "Erro ao fazer logout.")
    );
    if (Platform.OS !== "web") {
      // Garante que removeToken seja chamado se a API falhar no mobile
      await removeToken();
    }
  }
};

// Função de Cadastro de Usuário (POST)
export const registerUser = async (
  userData: Omit<RegisterUserData, "confirmPassword"> // Assume RegisterUserData do authStore
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
    return response.data; // Contém { success: true, message: "...", data: { ... } }
  } catch (error: any) {
    const errorMessage = handleError(error, "Erro no cadastro.");
    console.error("Erro no cadastro:", errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Função para enviar o email para ser verificado
export const sendVerificationEmail = async (
  Email: string
): Promise<GenericResponse> => {
  try {
    const response = await api.post<GenericResponse>(
      "/users/send-verification-email",
      {
        Email,
      }
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

// Função para validar o código de verificação
export const verifyEmailCode = async (
  code: string,
  email: string
): Promise<GenericResponse> => {
  try {
    // O backend pode precisar do email junto com o código para identificar o usuário
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
