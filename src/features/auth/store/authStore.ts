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
} from "./types"; // Importando tipos atualizados

// Estado inicial da store
const initialState: AuthStoreState = {
  user: null,
  token: null, // No web, isso pode não refletir o token do cookie, mas sim se há uma sessão.
  isLoading: true, // Loading inicial da aplicação para verificar auth
  isAuthLoading: false, // Loading para ações específicas como login, registro
  pendingEmail: null,
};

// Criação da store Zustand
export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      // Para web, verifyCurrentUser tentará usar o cookie HttpOnly.
      // Para mobile, verifyCurrentUser tentará usar o token do SecureStore.
      const userResponse = await verifyCurrentUser();

      if (userResponse.success && userResponse.user) {
        set({
          user: userResponse.user as User,
          // Para mobile, podemos querer popular o token aqui se verifyCurrentUser retornasse,
          // mas como verifyCurrentUser pega o token internamente para mobile,
          // e saveToken já o salvou no login, podemos buscar novamente se necessário
          // ou assumir que está ok se user estiver presente.
          // Para consistência, e se o loginService retorna token, podemos setá-lo aqui.
          // Por ora, focamos no usuário. Se o token for necessário na store para mobile,
          // podemos buscar com fetchStoredToken.
          token: Platform.OS !== "web" ? await fetchStoredToken() : null, // Preenche o token para mobile se existir
          isLoading: false,
        });
      } else {
        // Se a verificação falhar, limpamos qualquer estado residual.
        // Não chamamos logoutService aqui para evitar loop se o logout falhar também.
        // Apenas limpamos o estado local.
        set({ user: null, token: null, isLoading: false });
        if (Platform.OS !== "web") {
          await logoutService(); // Tenta limpar o token do SecureStore no mobile se a verificação falhar
        }
      }
    } catch (error) {
      console.error("Erro ao inicializar autenticação:", error);
      set({ user: null, token: null, isLoading: false });
    }
  },

  login: async (CRMorEmail, Password) => {
    set({ isAuthLoading: true });
    try {
      const response = await loginService(CRMorEmail, Password);
      if (response.success && response.user) {
        set({
          user: response.user as User,
          // O token da resposta é crucial para mobile.
          // Para web, o cookie já foi setado pelo backend.
          // Armazenar response.token aqui é útil para mobile e para consistência do estado.
          token: response.token || null,
          isAuthLoading: false,
        });
        return true;
      }
      set({ isAuthLoading: false /* authError: response.message */ }); // Pode setar um erro aqui
      return false;
    } catch (error: any) {
      console.error("Erro no login (store):", error);
      set({ isAuthLoading: false /* authError: error.message */ });
      return false;
    }
  },

  logout: async () => {
    set({ isAuthLoading: true });
    try {
      await logoutService(); // Chama o serviço que lida com API (web) e SecureStore (mobile)
    } catch (error) {
      console.error("Erro ao fazer logout do serviço (store):", error);
      // Mesmo com erro no serviço, limpamos o estado local como fallback.
    } finally {
      // Limpa o estado da store independentemente do sucesso/falha da chamada de serviço
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

  register: async (userData: RegisterUserData) => {
    set({ isAuthLoading: true });
    try {
      const response = await registerUserService(userData);
      if (response.success && response.data) {
        // Usuário registrado com sucesso no backend
        set({ pendingEmail: userData.Email }); // Define o email pendente, mas mantém isAuthLoading: true por enquanto

        // Tenta enviar o email de verificação
        const emailSent = await sendVerificationEmailService(userData.Email);
        if (!emailSent.success) {
          console.warn(
            "Usuário registrado, mas falha ao enviar e-mail de verificação inicialmente:",
            emailSent.message
          );
          // Mesmo que o envio do email falhe, o processo de registro do usuário foi bem-sucedido
          // e o pendingEmail está definido. O usuário será redirecionado para a tela de verificação.
        }

        set({ isAuthLoading: false }); // Define isAuthLoading como false após ambas as operações.
        return true; // Indica sucesso geral do processo de registro inicial
      }
      // Se o registro do usuário no backend falhou
      set({ isAuthLoading: false /* authError: response.message */ });
      return false;
    } catch (error: any) {
      console.error("Erro no registro (store):", error);
      set({ isAuthLoading: false /* authError: error.message */ });
      return false;
    }
  },

  sendVerificationEmailAction: async (email: string) => {
    set({ isAuthLoading: true }); // Pode ter um loading específico se preferir
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

  handleEmailVerification: async (code: string) => {
    const currentPendingEmail = get().pendingEmail;
    if (!currentPendingEmail) {
      console.error("Nenhum e-mail pendente para verificação.");
      // set({ authError: "Nenhum e-mail pendente para verificação." });
      return false;
    }
    set({ isAuthLoading: true });
    try {
      // Passando o email junto com o código para o backend
      const verificationResponse = await verifyEmailCodeService(
        code,
        currentPendingEmail
      );
      if (verificationResponse.success) {
        set({ pendingEmail: null, isAuthLoading: false });
        return true;
      }
      set({
        isAuthLoading: false /* authError: verificationResponse.message */,
      });
      return false;
    } catch (error: any) {
      console.error("Erro ao verificar o código de e-mail (store):", error);
      set({ isAuthLoading: false /* authError: error.message */ });
      return false;
    }
  },

  setPendingEmail: (email: string | null) => {
    set({ pendingEmail: email });
  },

  clearAuthError: () => {
    // set({ authError: null });
  },
}));
