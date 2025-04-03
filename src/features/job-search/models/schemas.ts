import { z } from "zod";

// API Response Schema
export const LocationApiSchema = z.object({
  label: z.string(),
  displayLocation: z.string(),
  terms: z.array(z.string()),
});
// Type - our DTO
export type LocationApiDTO = z.infer<typeof LocationApiSchema>;

export const LocationsApiResponseSchema = z.array(LocationApiSchema);
export type LocationsApiResponseDTO = z.infer<typeof LocationsApiResponseSchema>;
