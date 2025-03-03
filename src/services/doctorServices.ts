import api from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";

// 🔹 Tipos utilizados para o médico
export type CreateAccessKeyRequest = {
  name: string;
  email: string;
  doctorId: string;
};

export type AccessKeyResponse = {
  accessKey: string;
};

// 🔹 Função para criar a chave de acesso
const createAccessKey = async (data: CreateAccessKeyRequest) => {
  const response = await api.post<AccessKeyResponse>(
    "/register-secretary",
    data
  );
  return response.data;
};

// 🔹 Hook para criação da chave de acesso
export const useCreateAccessKey = () => {
  return useMutation({
    mutationFn: createAccessKey,
  });
};

// 🔹 Função para buscar a chave de acesso gerada
const fetchAccessKey = async (doctorId: string) => {
  const response = await api.get<AccessKeyResponse>(`/access-key/${doctorId}`);
  return response.data;
};

// 🔹 Hook para obter a chave de acesso do médico
export const useFetchAccessKey = (doctorId: string) => {
  return useQuery({
    queryKey: ["accessKey", doctorId],
    queryFn: () => fetchAccessKey(doctorId),
    enabled: !!doctorId, // Só busca se tiver um doctorId
  });
};
