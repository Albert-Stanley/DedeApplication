// Doctor Dashboard Statistics
export interface DoctorStats {
  totalPatients: number;
  totalForms: number;
  pendingForms: number;
  completedForms: number;
}

// Patient Entity
export interface Patient {
  id: string;
  name: string;
  email: string;
  cpf: string;
  dateOfBirth: string;
  lastFormUpdate: string;
  formStatus: FormStatus;
}

// Form Status Types
export type FormStatus = "pending" | "completed" | "in_progress";

// Access Key Management
export interface CreateAccessKeyRequest {
  name: string;
  email: string;
  doctorId: string;
}

export interface AccessKeyResponse {
  accessKey: string;
}

// Dashboard Data Aggregation
export interface DashboardData {
  stats: DoctorStats;
  recentPatients: Patient[];
}

// Search and Filtering
export interface PatientSearchParams {
  query: string;
  limit?: number;
  offset?: number;
}

export interface PatientFilter {
  status?: FormStatus;
  dateFrom?: string;
  dateTo?: string;
}

// API Response Wrappers
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface SearchState extends LoadingState {
  query: string;
  results: Patient[];
  isOpen: boolean;
}

// Component Props Types
export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: any; // LucideIcon type
  bgColor: string;
  iconBgColor: string;
  textColor: string;
  valueColor: string;
  isLoading?: boolean;
}
