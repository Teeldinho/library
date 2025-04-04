"use client";

import { parseAsString, parseAsJson, useQueryState, parseAsStringEnum } from "nuqs";
import { JobSearchParamsSchema } from "@/stores/nuqs/search-params";

export function useStoreSearchParams() {
  // Keywords
  const [keywords, setKeywords] = useQueryState(
    "keywords",
    parseAsString
      .withOptions({
        throttleMs: 300,
        shallow: false,
      })
      .withDefault("")
  );

  // Location
  const [location, setLocation] = useQueryState(
    "location",
    parseAsString
      .withOptions({
        throttleMs: 300,
        shallow: false,
      })
      .withDefault("")
  );

  // Distance
  const [distance, setDistance] = useQueryState(
    "distance",
    parseAsStringEnum(["5", "10", "15", "20", "30", "50"]).withOptions({ throttleMs: 300 }).withDefault("15")
  );

  // Tab
  const [tab, setTab] = useQueryState("tab", parseAsStringEnum(["location", "industry"]).withOptions({ throttleMs: 300 }).withDefault("location"));

  return {
    keywords: keywords || "",
    location: location || "",
    distance,
    tab,
    setKeywords,
    setLocation,
    setDistance,
    setTab,
  };
}
