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
    } else {
      // Em plataformas nativas, usamos SecureStore.
      await SecureStore.setItemAsync("authToken", token);
    }
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
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
      console.info(
        "Web environment: HttpOnly cookie removal must be handled by a backend logout endpoint."
      );
      return;
    } else {
      await SecureStore.deleteItemAsync("authToken");
    }
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
