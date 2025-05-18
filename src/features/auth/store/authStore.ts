// src/features/auth/store/authStore.ts
import { create } from "zustand";
import {
  login as loginService,
  logout as logoutService,
  fetchToken,
  verifyUser,
  registerUser,
  sendVerificationEmail as sendVerificationEmailService,
  verifyEmailCode as verifyEmailCodeService,
} from "@/services/authServices";
import type { AuthStore, RegisterUserData, User } from "./types";

// Estado inicial da store
const initialState = {
  user: null,
  token: null,
  isLoading: true,
  pendingEmail: null,
};

// Criação da store Zustand
export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  // Ação para inicializar o estado de autenticação
  // Esta ação deve ser chamada na inicialização do app (ex: no App.tsx)
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const storedToken = await fetchToken();
      if (storedToken) {
        set({ token: storedToken });
        const userResponse = await verifyUser(storedToken);
        if (userResponse.success && userResponse.user) {
          set({ user: userResponse.user as User });
        } else {
          await logoutService(); // Faz logout se não conseguir verificar o usuário
          set({ user: null, token: null });
        }
      }
    } catch (error) {
      console.error("Erro ao inicializar autenticação:", error);
      set({ user: null, token: null });
    } finally {
      set({ isLoading: false });
    }
  },

  // Ação de login
  login: async (CRMorEmail, Password) => {
    set({ isLoading: true });
    try {
      const response = await loginService(CRMorEmail, Password);
      if (response.success && response.token && response.user) {
        set({
          token: response.token,
          user: response.user as User,
          isLoading: false,
        });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      set({ isLoading: false });
      return false;
    }
  },

  // Ação de logout
  logout: async () => {
    set({ isLoading: true });
    try {
      await logoutService();
    } catch (error) {
      console.error("Erro ao fazer logout do serviço:", error);
      // Mesmo com erro no serviço, limpamos o estado local
    } finally {
      set({ token: null, user: null, isLoading: false });
    }
  },

  // Ação de registro de novo usuário
  register: async (userData: RegisterUserData) => {
    set({ isLoading: true });
    try {
      const response = await registerUser(
        userData.Name,
        userData.CPF,
        userData.CNPJ,
        userData.DataNascimento,
        userData.CRM,
        userData.HospitalName,
        userData.UF,
        userData.Email,
        userData.Password
      );

      if (response.success) {
        set({ pendingEmail: userData.Email });
        // A resposta do sendVerificationEmailService não está sendo usada para mudar estado aqui,
        // mas é importante garantir que o email seja enviado.
        await sendVerificationEmailService(userData.Email);
        set({ isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch (error) {
      console.error("Erro no registro:", error);
      set({ isLoading: false });
      return false;
    }
  },

  // Ação para enviar email de verificação (se necessário chamar separadamente)
  sendVerificationEmailAction: async (email: string) => {
    // Poderia adicionar um estado de loading específico para esta ação se desejado
    return await sendVerificationEmailService(email);
  },

  // Ação para verificar código de email (se necessário chamar separadamente)
  verifyEmailCodeAction: async (code: string) => {
    // Poderia adicionar um estado de loading específico para esta ação se desejado
    return await verifyEmailCodeService(code);
  },

  // Ação para lidar com a verificação do código de email
  handleEmailVerification: async (code: string) => {
    set({ isLoading: true });
    try {
      const verificationResponse = await verifyEmailCodeService(code);
      if (verificationResponse.success) {
        set({ pendingEmail: null, isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch (error) {
      console.error("Erro ao verificar o código de e-mail:", error);
      set({ isLoading: false });
      return false;
    }
  },

  // Ação para definir o email pendente (pode ser útil se o fluxo de verificação for complexo)
  setPendingEmail: (email: string | null) => {
    set({ pendingEmail: email });
  },
}));

// Opcional: Chamar initializeAuth uma vez para carregar o token ao iniciar,
// se você não quiser fazer isso explicitamente no seu componente App.
// No entanto, é mais comum e explícito chamar no App.tsx.
// useAuthStore.getState().initializeAuth();
