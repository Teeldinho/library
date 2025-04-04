export const jobSearchKeys = {
  locations: (query: string) => ["job-search", "locations", query.toLowerCase().trim()],
} as const;
