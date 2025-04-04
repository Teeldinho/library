"use client";

import { useQueryState } from "nuqs";
import { searchParamsObject } from "@/stores/nuqs/search-params";

export function useStoreSearchParams() {
  // Keywords
  const [keywords, setKeywords] = useQueryState("keywords", searchParamsObject.keywords);

  // Location
  const [location, setLocation] = useQueryState("location", searchParamsObject.location);

  // Distance
  const [distance, setDistance] = useQueryState("distance", searchParamsObject.distance);

  // Tab
  const [tab, setTab] = useQueryState("tab", searchParamsObject.tab);

  return {
    keywords: keywords,
    location: location,
    distance,
    tab,
    setKeywords,
    setLocation,
    setDistance,
    setTab,
  };
}
