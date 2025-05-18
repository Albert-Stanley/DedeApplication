// src/features/auth/store/types.ts
import { User as ServiceUser } from "@/services/authServices";
// Exportando o tipo User para ser usado pela store e componentes
export type User = ServiceUser;

// Dados necessários para o registro de um novo usuário
export interface RegisterUserData {
  Name: string;
  CPF: string;
  CNPJ: string;
  DataNascimento: string;
  CRM: string;
  HospitalName: string;
  UF: string;
  Email: string;
  Password: string;
}

// Define a forma do estado de autenticação
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  pendingEmail: string | null;
}

// Define as ações que podem ser executadas na store de autenticação
export interface AuthActions {
  initializeAuth: () => Promise<void>;
  login: (CRMorEmail: string, Password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: RegisterUserData) => Promise<boolean>;
  sendVerificationEmailAction: (
    email: string
  ) => Promise<{ success: boolean; message: string }>;
  verifyEmailCodeAction: (
    code: string
  ) => Promise<{ success: boolean; message: string }>;
  handleEmailVerification: (code: string) => Promise<boolean>;
  setPendingEmail: (email: string | null) => void;
}

// Combina o estado e as ações para a interface completa da store
export type AuthStore = AuthState & AuthActions;
