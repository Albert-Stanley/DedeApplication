import * as SecureStore from "expo-secure-store"; // Para mobile (Expo)
import { Platform } from "react-native"; // Para detectar a plataforma

// Função para salvar o token
export const saveToken = async (token: string) => {
  try {
    if (Platform.OS === "web") {
      localStorage.setItem("authToken", token); // Para Web
    } else {
      await SecureStore.setItemAsync("authToken", token); // Para Mobile (Expo)
    }
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
  }
};

// Função para recuperar o token
export const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem("authToken"); // Para Web
    } else {
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
      localStorage.removeItem("authToken"); // Para Web
    } else {
      await SecureStore.deleteItemAsync("authToken"); // Para Mobile (Expo)
    }
  } catch (error) {
    console.error("Erro ao remover o token:", error);
  }
};
