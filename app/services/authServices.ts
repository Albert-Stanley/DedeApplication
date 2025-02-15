import api from "./api"; // Importando a instância do axios configurada

// Interface de User
interface User {
  id: string;
  CRMorEmail: string;
  name: string;
  Password: string;
}

// Interface para a resposta do Auth
interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

// Função de login (POST) – Envia as credenciais do usuário para o backend
export const login = async (
  CRMorEmail: string,
  Password: string
): Promise<AuthResponse> => {
  try {
    // Envia o request para o backend para verificar as credenciais
    const response = await api.post<AuthResponse>("/users/login", {
      // <= mudar o endpoint se necessáro
      CRMorEmail,
      Password,
    });

    // Retorna a resposta, com sucesso ou erro
    return response.data;
  } catch (error: any) {
    console.error("Erro no login:", error.message);
    return {
      success: false,
      message: error.message || "Erro ao conectar com a API",
    };
  }
};

// Função para verificar se o usuário existe no banco de dados (GET)
export const verifyUser = async (CRMorEmail: string): Promise<AuthResponse> => {
  try {
    // Faz um GET para procurar o usuário no banco de dados
    const response = await api.get<User[]>(`/users`);

    // Encontra o usuário pela correspondência de CRMorEmail
    const user = response.data.find((user) => user.CRMorEmail === CRMorEmail);

    if (!user) {
      return {
        success: false,
        message: "Usuário não encontrado.",
      };
    }

    // Retorna os dados do usuário
    return {
      success: true,
      message: "Usuário encontrado",
      user: {
        id: user.id,
        CRMorEmail: user.CRMorEmail,
        name: user.name,
        Password: "",
      },
    };
  } catch (error: any) {
    console.error("Erro ao verificar usuário:", error.message);
    return {
      success: false,
      message: error.message || "Erro ao conectar com a API",
    };
  }
};
