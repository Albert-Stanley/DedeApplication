// features/auth/store/types.ts
import type { User as ServiceUser } from "@/services/authServices"; // Importa User de authServices

// Interface para o usuário na store (pode ser a mesma do service ou adaptada)
export interface User extends ServiceUser {}

// Interface para os dados de registro
export interface RegisterUserData {
  CRM: string;
  RG: string;
  CPF: string;
  DataNascimento: string;
  Password: string;
}

// Interface para o estado e ações da store de autenticação
export interface AuthStoreState {
  user: User | null;
  token: string | null; // Para mobile, o token é guardado aqui. Para web, é mais um indicador.
  isLoading: boolean; // Loading geral da autenticação
  isAuthLoading: boolean; // Loading específico para operações de autenticação (login, register, etc.)
  pendingEmail: string | null; // Email aguardando verificação
}

export interface AuthStoreActions {
  initializeAuth: () => Promise<void>;
  login: (CRMorEmail: string, Password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: RegisterUserData) => Promise<boolean>;
  sendVerificationEmailAction: (email: string) => Promise<boolean>; // Retorna boolean para sucesso/falha
  handleEmailVerification: (code: string) => Promise<boolean>;
  setPendingEmail: (email: string | null) => void;
  // Adicionando ação para limpar erros ou mensagens, se necessário
  clearAuthError: () => void; // Exemplo
  // Se houver um campo de erro no estado:
  // authError: string | null;
  // setAuthError: (error: string | null) => void;
}

export type AuthStore = AuthStoreState & AuthStoreActions;
