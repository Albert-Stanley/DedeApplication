import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

interface WebRemoveTokenResult {
  success: boolean;
  message: string;
}

export const saveToken = async (token: string): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      // Na web, o token é (ou deveria ser) gerenciado por um cookie HttpOnly definido pelo backend.
      console.info(
        "Web environment: Token should be managed via HttpOnly cookies set by the backend."
      );
      // Nenhuma ação de salvamento de token é necessária aqui para web se o backend definir o cookie.
    } else {
      // Em plataformas nativas, usamos SecureStore.
      await SecureStore.setItemAsync("authToken", token);
    }
  } catch (error) {
    console.error("Error saving token:", error);
    // Não relancar o erro para não quebrar o fluxo de login, apenas logue.
    // A lógica de sucesso/falha do login é tratada no authService/authStore.
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      // Na web, o token HttpOnly não é acessível via JavaScript.
      // A autenticação é mantida pelo navegador enviando o cookie automaticamente.
      // As chamadas para endpoints protegidos dependerão desse cookie.
      // Retornar null indica que o token não é gerenciado diretamente pelo JS do frontend.
      console.info(
        "Web environment: HttpOnly token is not directly accessible via JavaScript."
      );
      return null;
    } else {
      return await SecureStore.getItemAsync("authToken");
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Para a web, esta função não remove o cookie diretamente.
// Ela sinaliza que uma chamada de logout ao backend é necessária.
// Para mobile, remove do SecureStore.
export const removeToken = async (): Promise<void | WebRemoveTokenResult> => {
  try {
    if (Platform.OS === "web") {
      // Na web, o cookie HttpOnly deve ser removido pelo backend através de um endpoint de logout.
      // Esta função no frontend não pode remover o cookie diretamente.
      // A chamada ao endpoint de logout do backend deve ser feita no authServices.logout.
      console.info(
        "Web environment: HttpOnly cookie removal must be handled by a backend logout endpoint."
      );

      // Por enquanto, manter void, e o authService.logout fará a chamada API.
      return; // Ou poderia retornar um objeto indicando que uma ação de backend é necessária.
    } else {
      await SecureStore.deleteItemAsync("authToken");
    }
  } catch (error) {
    console.error("Error removing token:", error);
    // Não relançar erro aqui, apenas logue.
  }
};
