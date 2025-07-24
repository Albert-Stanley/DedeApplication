// src/features/doctor/hooks/index.ts

export {
  useDoctorStats,
  useRecentPatients,
  useDashboardData,
  useCreateAccessKey,
  useFetchAccessKey,
  useSearchPatients,
} from "../services/doctorService";

// Additional custom hooks can be added here
export { default as useDebounce } from "./useDebounce";
