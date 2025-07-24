// src/features/auth/store/authStore.ts
import { create } from "zustand";
import { Platform } from "react-native";
import {
  login as loginService,
  logout as logoutService,
  verifyCurrentUser,
  registerUser as registerUserService,
  sendVerificationEmail as sendVerificationEmailService,
  verifyEmailCode as verifyEmailCodeService,
  fetchStoredToken,
} from "@/services/authServices";
import type {
  AuthStore,
  AuthStoreState,
  RegisterUserData,
  User,
} from "./types";   

const initialState: AuthStoreState = {
  user: null,
  token: null,
  isLoading: true,  
  isAuthLoading: false,   
  pendingEmail: null, // Email pendente de verificação
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  // Inicializa a autenticação ao abrir o app
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const userResponse = await verifyCurrentUser();

      if (userResponse.success && userResponse.user) {
        set({
          user: userResponse.user as User,
          token: Platform.OS !== "web" ? await fetchStoredToken() : null, // Recupera o token no mobile
          isLoading: false,
        });
      } else {
        // Se a verificação falhar, limpa o estado local
        set({ user: null, token: null, isLoading: false });

        // Para mobile, chama logoutService para limpar o SecureStore
        if (Platform.OS !== "web") {
          await logoutService();
        }
      }
    } catch (error) {
      console.error("Erro ao inicializar autenticação:", error);
      set({ user: null, token: null, isLoading: false });
    }
  },

  // Realiza login com CRM ou Email e senha
  login: async (CRMorEmail, Password) => {
    set({ isAuthLoading: true });
    try {
      const response = await loginService(CRMorEmail, Password);
      if (response.success && response.user) {
        set({
          user: response.user as User,
          token: response.token || null, // Armazena token (importante para mobile)
          isAuthLoading: false,
        });
        return true;
      }
      set({ isAuthLoading: false });
      return false;
    } catch (error: any) {
      console.error("Erro no login (store):", error);
      set({ isAuthLoading: false });
      return false;
    }
  },

  // Realiza logout e limpa completamente o estado da store
  logout: async () => {
    set({ isAuthLoading: true });
    try {
      await logoutService(); // Remove dados da sessão no backend e no storage local
    } catch (error) {
      console.error("Erro ao fazer logout do serviço (store):", error);
    } finally {
      // Independentemente do resultado, garante que o estado local será limpo
      set({
        ...initialState,
        isLoading: false,
        isAuthLoading: false,
        token: null,
        user: null,
        pendingEmail: null,
      });
    }
  },

  // Realiza o registro de um novo usuário
  register: async (userData: RegisterUserData) => {
    set({ isAuthLoading: true });
    try {
      const response = await registerUserService(userData);
      if (response.success && response.data) {
        // Since we don't have email in the new signup, we don't need to handle email verification
        set({ isAuthLoading: false });
        return true;
      }

      set({ isAuthLoading: false });
      return false;
    } catch (error: any) {
      console.error("Erro no registro (store):", error);
      set({ isAuthLoading: false });
      return false;
    }
  },

  // Reenvia o e-mail de verificação
  sendVerificationEmailAction: async (email: string) => {
    set({ isAuthLoading: true });
    try {
      const response = await sendVerificationEmailService(email);
      set({ isAuthLoading: false });
      return response.success;
    } catch (error) {
      console.error("Erro ao enviar email de verificação (store):", error);
      set({ isAuthLoading: false });
      return false;
    }
  },

  // Verifica o código enviado ao email
  handleEmailVerification: async (code: string) => {
    const currentPendingEmail = get().pendingEmail;
    if (!currentPendingEmail) {
      console.error("Nenhum e-mail pendente para verificação.");
      return false;
    }

    set({ isAuthLoading: true });
    try {
      const verificationResponse = await verifyEmailCodeService(
        code,
        currentPendingEmail
      );
      if (verificationResponse.success) {
        set({ pendingEmail: null, isAuthLoading: false });
        return true;
      }

      set({ isAuthLoading: false });
      return false;
    } catch (error: any) {
      console.error("Erro ao verificar o código de e-mail (store):", error);
      set({ isAuthLoading: false });
      return false;
    }
  },

  // Define o e-mail pendente de verificação manualmente
  setPendingEmail: (email: string | null) => {
    set({ pendingEmail: email });
  },

  // Limpa erros de autenticação (placeholder)
  clearAuthError: () => {
    // Exemplo: set({ authError: null });
  },
}));
