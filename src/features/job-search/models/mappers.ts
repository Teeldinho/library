import type { LocationApiDTO } from "@/features/job-search/models/schemas";

export interface LocationRTO {
  label: string;
  value: string;
}

export function mapLocationDtoToRto(dto: LocationApiDTO): LocationRTO {
  const primaryTerm = dto.terms[0];
  return {
    label: dto.label,
    value: primaryTerm,
  };
}
