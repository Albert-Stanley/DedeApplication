export const authLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000"; // Caso a variável de ambiente não esteja definida API_URL, utilize o valor padrão "http://localhost:5000"

    const response = await fetch(`${API_URL}/Auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, Password: password }),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
