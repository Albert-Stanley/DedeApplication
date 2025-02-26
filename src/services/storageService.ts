import * as SecureStore from "expo-secure-store"; // Para mobile (Expo)
import { Platform } from "react-native"; // Para detectar a plataforma

// Função para salvar o token de forma segura
export const saveToken = async (token: string) => {
  try {
    if (Platform.OS === "web") {
      // Para Web, usamos cookies com HttpOnly e Secure
      document.cookie = `authToken=${token}; path=/; Secure; HttpOnly; SameSite=Strict`;
    } else {
      // Para Mobile, usamos SecureStore
      await SecureStore.setItemAsync("authToken", token); // Para Mobile (Expo)
    }
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
  }
};

// Função para recuperar o token de forma segura
export const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      // Para Web, buscamos o token nos cookies
      const match = document.cookie.match(/(^| )authToken=([^;]+)/);
      return match ? match[2] : null; // Retorna o valor do cookie ou null se não encontrado
    } else {
      // Para Mobile, usamos SecureStore
      return await SecureStore.getItemAsync("authToken"); // Para Mobile (Expo)
    }
  } catch (error) {
    console.error("Erro ao recuperar o token:", error);
    return null;
  }
};

// Função para remover o token (logout)
export const removeToken = async () => {
  try {
    if (Platform.OS === "web") {
      // Para Web, removemos o cookie
      document.cookie =
        "authToken=; path=/; Secure; HttpOnly; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } else {
      // Para Mobile, usamos SecureStore
      await SecureStore.deleteItemAsync("authToken"); // Para Mobile (Expo)
    }
  } catch (error) {
    console.error("Erro ao remover o token:", error);
  }
};
