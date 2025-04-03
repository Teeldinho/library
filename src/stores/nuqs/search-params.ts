import { createSearchParamsCache, parseAsJson } from "nuqs/server";
import { z } from "zod";

export const JobSearchParamsSchema = z.object({
  keywords: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  distance: z.enum(["5", "10", "15", "20", "30", "50"]).default("10"),
  tab: z.enum(["location", "industry"]).default("location"),
});

// Server-side cache configuration
export const searchParamsCache = createSearchParamsCache({
  filters: parseAsJson(JobSearchParamsSchema.parse).withDefault(JobSearchParamsSchema.parse({})).withOptions({
    shallow: false,
    throttleMs: 1000,
  }),
});
