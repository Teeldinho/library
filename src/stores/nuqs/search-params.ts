import { createSearchParamsCache, parseAsString, parseAsStringEnum } from "nuqs/server";

export const searchParamsObject = {
  keywords: parseAsString.withDefault("").withOptions({
    throttleMs: 300,
    shallow: true,
  }),
  location: parseAsString.withDefault("").withOptions({
    throttleMs: 750,
    shallow: false,
  }),
  distance: parseAsStringEnum(["5", "10", "15", "20", "30", "50"]).withDefault("15").withOptions({
    throttleMs: 300,
    shallow: true,
  }),
  tab: parseAsStringEnum(["location", "industry"]).withDefault("location").withOptions({
    throttleMs: 300,
    shallow: true,
  }),
};

// Server-side cache configuration
export const searchParamsCache = createSearchParamsCache(searchParamsObject);
