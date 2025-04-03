"use client";

import { parseAsJson, useQueryState } from "nuqs";
import { JobSearchParamsSchema } from "@/stores/nuqs/search-params";

export function useStoreSearchParams() {
  const [params, setParams] = useQueryState(
    "filters",
    parseAsJson(JobSearchParamsSchema.parse).withOptions({ throttleMs: 500 }).withDefault({
      tab: "location",
      distance: "15",
      keywords: "",
      location: "",
    })
  );

  const resetStore = () => setParams(JobSearchParamsSchema.parse({}));
  const setTab = (tab: "location" | "industry") => setParams((prev) => ({ ...prev, tab }));
  const setDistance = (distance: "5" | "10" | "15" | "20" | "30" | "50") => setParams((prev) => ({ ...prev, distance }));
  const setKeywords = (keywords: string) => setParams((prev) => ({ ...prev, keywords }));
  const setLocation = (location: string) => setParams((prev) => ({ ...prev, location }));

  return {
    ...params,
    setTab,
    setDistance,
    setKeywords,
    setLocation,
    resetStore,
  };
}
