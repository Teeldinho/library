import { LocationsApiResponseSchema } from "@/features/job-search/models/schemas";
import { jobSearchEndpoints } from "@/features/job-search/api/endpoints";
import { jobSearchKeys } from "@/features/job-search/api/keys";
import { LocationRTO, mapLocationDtoToRto } from "@/features/job-search/models/mappers";
import { FetchResult, handleError, handleSuccess } from "@/lib/api-helpers";
import { hasMinChars } from "@/lib/validators";

/**
 * Fetches locations from the API
 * @param query - The query to search for
 * @returns A FetchResult containing an array of LocationRTO objects
 */
export async function fetchLocations(query: string): Promise<FetchResult<LocationRTO[]>> {
  try {
    if (!hasMinChars(query)) return handleSuccess([]);

    const response = await fetch(jobSearchEndpoints.locations(query), {
      next: { tags: jobSearchKeys.locations(query) },
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      return handleError(errorBody?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const parsedData = LocationsApiResponseSchema.safeParse(data);

    if (!parsedData.success) {
      return handleError("Invalid location data format");
    }

    const locations = parsedData.data.map(mapLocationDtoToRto);
    return handleSuccess(locations);
  } catch (error) {
    return handleError(error instanceof Error ? error.message : "Unknown network error");
  }
}
