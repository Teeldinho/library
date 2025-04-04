import { z } from "zod";
import { createSearchParamsCache, parseAsString, parseAsStringEnum } from "nuqs/server";

export const JobSearchParamsSchema = z.object({
  keywords: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  distance: z.enum(["5", "10", "15", "20", "30", "50"]).default("15"),
  tab: z.enum(["location", "industry"]).default("location"),
});

// Server-side cache configuration
export const searchParamsCache = createSearchParamsCache({
  keywords: parseAsString.withDefault(""),
  location: parseAsString.withDefault(""),
  distance: parseAsStringEnum(["5", "10", "15", "20", "30", "50"]).withDefault("15"),
  tab: parseAsStringEnum(["location", "industry"]).withDefault("location"),
});
