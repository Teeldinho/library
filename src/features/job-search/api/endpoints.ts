import { API_CONFIG } from "@/features/job-search/api/api-config";

export const jobSearchEndpoints = {
  locations: (query: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}?q=${encodeURIComponent(query)}`,
} as const;
