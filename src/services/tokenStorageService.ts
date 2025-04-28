// Adaptar o front aqui ao backend

import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Salvar token
export const saveToken = async (token: string) => {
  try {
    if (Platform.OS === "web") {
      console.warn(
        "Tokens em HttpOnly devem ser definidos pelo backend via Set-Cookie."
      );
    } else {
      await SecureStore.setItemAsync("authToken", token);
    }
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
    throw new Error("Erro ao salvar o token de autenticação");
  }
};

// Obter token
export const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      console.warn("Tokens HttpOnly não podem ser acessados via JavaScript.");
      return null;
    } else {
      return await SecureStore.getItemAsync("authToken");
    }
  } catch (error) {
    console.error("Erro ao recuperar o token:", error);
    return null;
  }
};

// Remover token
export const removeToken = async () => {
  try {
    if (Platform.OS === "web") {
      console.warn("Cookies HttpOnly devem ser removidos pelo backend.");
      // Chamar um endpoint de logout no backend que retorne um Set-Cookie com data expirada.
    } else {
      await SecureStore.deleteItemAsync("authToken");
    }
  } catch (error) {
    console.error("Erro ao remover o token:", error);
  }
};
