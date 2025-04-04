export const API_CONFIG = {
  BASE_URL: process.env.PUBLIC_API_BASE_URL as string,
  ENDPOINTS: {
    LOCATIONS: "/locations",
    JOBS: "/jobs", // this is not to be used for now
  },
} as const;
