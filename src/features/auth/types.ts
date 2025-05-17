// Tipagem para a autenticação
import type { User } from "../../services/authServices";

export interface Login {
  CRMorEmail: string;
  Password: string;
}

export interface Register {
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

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (CRMorEmail: string, Password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  handleRegister: (userData: {
    Name: string;
    CPF: string;
    CNPJ: string;
    DataNascimento: string;
    CRM: string;
    HospitalName: string;
    UF: string;
    Email: string;
    Password: string;
  }) => Promise<boolean>;
  sendVerificationEmail: (
    email: string
  ) => Promise<{ success: boolean; message: string }>;
  verifyEmailCode: (
    code: string
  ) => Promise<{ success: boolean; message: string }>;
  handleEmailVerification: (code: string) => Promise<boolean>;
  pendingEmail: string | null;
  setPendingEmail: (email: string | null) => void;
}
