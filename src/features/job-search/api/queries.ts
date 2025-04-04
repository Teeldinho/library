import { LocationsApiResponseSchema } from "@/features/job-search/models/schemas";
import { jobSearchEndpoints } from "@/features/job-search/api/endpoints";
import { jobSearchKeys } from "@/features/job-search/api/keys";
import { LocationRTO, mapLocationDtoToRto } from "@/features/job-search/models/mappers";
import { FetchResult } from "@/lib/api-helpers";

/**
 * Fetches locations from the API
 * @param query - The query to search for
 * @returns A FetchResult containing an array of LocationRTO objects
 */
export async function fetchLocations(query: string): Promise<FetchResult<LocationRTO[]>> {
  try {
    if (!query || query.length < 2) return { status: "success", data: [] };

    const response = await fetch(jobSearchEndpoints.locations(query), {
      next: { tags: jobSearchKeys.locations(query) },
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      return {
        status: "error",
        message: errorBody?.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    const parsedData = LocationsApiResponseSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        status: "error",
        message: "Invalid location data format",
      };
    }

    const locations = parsedData.data.map(mapLocationDtoToRto);
    return { status: "success", data: locations };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown network error",
    };
  }
}
