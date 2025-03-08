import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  login,
  logout as authLogout,
  fetchToken,
  verifyUser,
  registerUser,
  sendVerificationEmail, // Importando do authService
  verifyEmailCode, // Importando do authService
} from "../services/authServices";
import { User } from "../services/authServices";
import { View, Text } from "react-native"; // Importando View e Text

// Tipagem do contexto de autenticação
interface AuthContextType {
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
}

// Criando o Contexto de Autenticação
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Provedor de Contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await fetchToken();
        if (storedToken) {
          setToken(storedToken);
          const userResponse = await verifyUser(storedToken); // Passando o token aqui
          if (userResponse.success && userResponse.user) {
            setUser(userResponse.user);
          } else {
            await authLogout(); // Logout caso não consiga recuperar o usuário
            setUser(null);
            setToken(null);
          }
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = async (
    CRMorEmail: string,
    Password: string
  ): Promise<boolean> => {
    const response = await login(CRMorEmail, Password);
    if (response.success && response.token && response.user) {
      setToken(response.token);
      setUser(response.user);
      return true;
    }
    return false;
  };

  const handleLogout = async () => {
    await authLogout();
    setToken(null);
    setUser(null);
  };

  const handleRegister = async (userData: {
    Name: string;
    CPF: string;
    CNPJ: string;
    DataNascimento: string;
    CRM: string;
    HospitalName: string;
    UF: string;
    Email: string;
    Password: string;
  }): Promise<boolean> => {
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
      // Retornar true após o cadastro bem-sucedido
      return true;
    } else {
      return false;
    }
  };

  const handleEmailVerification = async (code: string) => {
    try {
      const verificationResponse = await verifyEmailCode(code);

      if (verificationResponse.success) {
        // Código de verificação foi validado com sucesso
        return true;
      } else {
        // Código de verificação falhou
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar o código de e-mail:", error);
      return false;
    }
  };

  // Exibindo mensagem de carregamento enquanto a autenticação é realizada
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-neutral-900">
        <Text className="text-white">Carregando...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: handleLogin,
        logout: handleLogout,
        handleRegister,
        sendVerificationEmail, // Passando a função
        verifyEmailCode, // Passando a função
        handleEmailVerification, // Passando a função
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
