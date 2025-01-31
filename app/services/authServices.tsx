import axios from "axios";

const API_URL = "https://meu-backend.com/api/auth";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signUp = async (userData: any) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};
