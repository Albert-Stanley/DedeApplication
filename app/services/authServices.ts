import api from "./api";

interface AuthResponse {
  success: any;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Login do usuário
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

// Cadastro de novo usuário
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};
