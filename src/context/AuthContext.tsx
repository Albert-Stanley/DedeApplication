import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  login,
  logout as authLogout,
  fetchToken,
  verifyUser,
} from "../services/authServices";
import { User } from "../services/authServices";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (CRMorEmail: string, Password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Criando o Contexto de Autenticação
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

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

  // Exibindo mensagem de carregamento enquanto a autenticação é realizada
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-neutral-900 text-white">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
