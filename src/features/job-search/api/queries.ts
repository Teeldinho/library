import { LocationsApiResponseSchema } from "@/features/job-search/models/schemas";
import { jobSearchEndpoints } from "./endpoints";
import { jobSearchKeys } from "./keys";
import { mapLocationDtoToRto } from "../models/mappers";

export async function fetchLocations(query: string) {
  if (!query || query.length < 2) return [];

  const response = await fetch(jobSearchEndpoints.locations(query), {
    next: { tags: jobSearchKeys.locations(query) },
    cache: "force-cache",
  });

  if (!response.ok) throw new Error("Failed to fetch locations");
  const data = await response.json();

  const parsedData = LocationsApiResponseSchema.safeParse(data);

  if (!parsedData.success) throw new Error("Failed to parse locations");

  const locations = parsedData.data.map(mapLocationDtoToRto);

  //   console.log("\n\nLocations = ", locations);

  return locations;
}
