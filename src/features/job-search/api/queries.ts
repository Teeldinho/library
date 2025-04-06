import { LocationsApiResponseSchema } from "@/features/job-search/models/schemas";
import { jobSearchEndpoints } from "@/features/job-search/api/endpoints";
import { jobSearchKeys } from "@/features/job-search/api/keys";
import { LocationRTO, mapLocationDtoToRto } from "@/features/job-search/models/mappers";
import { FetchResult, handleError, handleSuccess } from "@/lib/api-helpers";
import { hasMinChars } from "@/lib/validators";
import { MOCK_LOCATIONS } from "@/features/job-search/helpers/dummy-data";

/**
 * Helper function to handle mock data fallback with validation
 */
async function getMockLocations(): Promise<FetchResult<LocationRTO[]>> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const parsedMock = LocationsApiResponseSchema.safeParse(MOCK_LOCATIONS);
  return parsedMock.success ? handleSuccess(parsedMock.data.map(mapLocationDtoToRto)) : handleError("Invalid mock data format");
}

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
      // Handle 403 specifically first
      if (response.status === 403) {
        return getMockLocations();
      }

      const errorBody = await response.json().catch(() => null);
      return handleError(errorBody?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const parsedData = LocationsApiResponseSchema.safeParse(data);

    return parsedData.success ? handleSuccess(parsedData.data.map(mapLocationDtoToRto)) : handleError("Invalid location data format");
  } catch (error) {
    // Fallback to mock data on any network/parsing errors
    return getMockLocations();
  }
}
