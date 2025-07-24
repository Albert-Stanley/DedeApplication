export const QUERY_KEYS = {
  DOCTOR: "doctor",
  STATS: "stats",
  PATIENTS: "patients",
  RECENT: "recent",
  DASHBOARD: "dashboard",
  ACCESS_KEY: "accessKey",
  SEARCH: "search",
} as const;

export const ROUTES = {
  DOCTOR_HOME: "/doctor",
  DOCTOR_PROFILE: "/doctor/Profile",
  CREATE_ACCESS_KEY: "/doctor/CreateAccessKey",
  PATIENT_FORM: "/medical-form/Step1",
} as const;

export const STATS_CONFIG = {
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
  STALE_TIME: 2 * 60 * 1000, // 2 minutes
} as const;

export const UI_CONFIG = {
  RECENT_PATIENTS_LIMIT: 5,
  SEARCH_DEBOUNCE_MS: 300,
} as const;
