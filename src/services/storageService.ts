import { MMKV } from "react-native-mmkv";

// Criando a instância do MMKV
const storage = new MMKV();

// Função para salvar o token
export const saveToken = (token: string) => {
  storage.set("authToken", token);
};

// Função para recuperar o token
export const getToken = (): string | null => {
  return storage.getString("authToken") || null;
};

// Função para remover o token (logout)
export const removeToken = () => {
  storage.delete("authToken");
};
