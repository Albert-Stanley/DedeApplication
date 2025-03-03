import api from "./api";

// Função para validar a chave de acesso da secretária
export const validateAccessKey = async (
  chave: string
): Promise<{ isValid: boolean }> => {
  try {
    const response = await api.post<{ isValid: boolean }>(
      "/validate-access-key",
      { chave }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao validar a chave:",
      error?.response?.data?.message || error.message
    );
    throw new Error("Erro ao conectar com a API");
  }
};

//Para testes

// secretaryServices.ts
// import api from "./api";

// // Função para validar a chave de acesso da secretária
// export const validateAccessKey = async (
//   chave: string
// ): Promise<{ isValid: boolean }> => {
//   try {
//     // Enviando a chave para o endpoint de teste do JSONPlaceholder
//     const response = await api.post<{ isValid: boolean }>(
//       "https://jsonplaceholder.typicode.com/posts", // Endpoint de teste
//       { chave } // Envia a chave no corpo da requisição
//     );

//     // Para verificar no console se a chave foi enviada com sucesso
//     console.log("Chave enviada para o JSONPlaceholder:", response.data);

//     // Considerando que a requisição foi bem-sucedida
//     return { isValid: true }; // Retorna isValid como true para continuar o fluxo
//   } catch (error: any) {
//     // Em caso de erro, exibe a mensagem no console
//     console.error(
//       "Erro ao validar a chave:",
//       error?.response?.data?.message || error.message
//     );
//     throw new Error("Erro ao conectar com a API");
//   }
// };
