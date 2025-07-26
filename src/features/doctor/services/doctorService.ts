import api from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  DoctorStats,
  Patient,
  CreateAccessKeyRequest,
  AccessKeyResponse,
  DashboardData,
} from "../types";

const fetchDoctorStats = async (): Promise<DoctorStats> => {
  const response = await api.get<DoctorStats>("/doctor/stats");
  return response.data;
};

const fetchRecentPatients = async (limit: number = 5): Promise<Patient[]> => {
  const response = await api.get<Patient[]>(
    `/doctor/patients/recent?limit=${limit}`
  );
  return response.data;
};

const fetchDashboardData = async (): Promise<DashboardData> => {
  const [stats, recentPatients] = await Promise.all([
    fetchDoctorStats(),
    fetchRecentPatients(),
  ]);

  return {
    stats,
    recentPatients,
  };
};

const createAccessKey = async (
  data: CreateAccessKeyRequest
): Promise<AccessKeyResponse> => {
  const response = await api.post<AccessKeyResponse>(
    "/register-secretary",
    data
  );
  return response.data;
};

const fetchAccessKey = async (doctorId: string): Promise<AccessKeyResponse> => {
  const response = await api.get<AccessKeyResponse>(`/access-key/${doctorId}`);
  return response.data;
};

const searchPatients = async (query: string): Promise<Patient[]> => {
  const response = await api.get<Patient[]>(
    `/doctor/patients/search?q=${encodeURIComponent(query)}`
  );
  return response.data;
};

const fetchAllPatients = async (): Promise<Patient[]> => {
  const response = await api.get<Patient[]>("/doctor/patients");
  return response.data;
};

// Custom Hooks
export const useDoctorStats = () => {
  return useQuery({
    queryKey: ["doctor", "stats"],
    queryFn: fetchDoctorStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRecentPatients = (limit?: number) => {
  return useQuery({
    queryKey: ["doctor", "patients", "recent", limit],
    queryFn: () => fetchRecentPatients(limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["doctor", "dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateAccessKey = () => {
  return useMutation({
    mutationFn: createAccessKey,
  });
};

export const useFetchAccessKey = (doctorId: string) => {
  return useQuery({
    queryKey: ["accessKey", doctorId],
    queryFn: () => fetchAccessKey(doctorId),
    enabled: !!doctorId,
  });
};

export const useSearchPatients = () => {
  return useMutation({
    mutationFn: searchPatients,
  });
};

export const useAllPatients = () => {
  return useQuery({
    queryKey: ["doctor", "patients", "all"],
    queryFn: fetchAllPatients,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
