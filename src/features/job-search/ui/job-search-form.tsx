import { VStack } from "@/components/ui";
import styles from "./job-search-form.module.css";
import { KeywordsField } from "./keywords-field";
import { LocationSearch } from "./location-search";
import { DistanceSelect } from "./distance-select";
import { SearchButton } from "./search-button";
import { fetchLocations } from "../api/queries";
import { searchParamsCache } from "@/stores/nuqs/search-params";
import { Suspense } from "react";

export async function JobSearchForm() {
  const {
    filters: { location },
  } = searchParamsCache.all();

  console.log("\n\nLocation from Server = ", location);

  // Server-side data fetching
  const locationsPromise = fetchLocations(location || "Qu"); // Initial empty query

  return (
    <VStack space="lg" className={styles.formContainer}>
      <KeywordsField />

      <div className={styles.locationRow}>
        <Suspense fallback={<div>Loading...</div>}>
          <LocationSearch suggestionsPromise={locationsPromise} />
        </Suspense>
        <DistanceSelect />
      </div>

      <SearchButton />
    </VStack>
  );
}
