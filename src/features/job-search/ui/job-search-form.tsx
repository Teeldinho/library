import { Suspense } from "react";
import { VStack } from "@/components/ui";
import styles from "@/features/job-search/ui/job-search-form.module.css";
import { KeywordsField } from "@/features/job-search/ui/keywords-field";
import { LocationSearch } from "@/features/job-search/ui/location-search";
import { DistanceSelect } from "@/features/job-search/ui/distance-select";
import { SearchButton } from "@/features/job-search/ui/search-button";
import { fetchLocations } from "@/features/job-search/api/queries";
import { searchParamsCache } from "@/stores/nuqs/search-params";

export async function JobSearchForm() {
  const { location } = searchParamsCache.all();

  // Server-side data fetching:
  // Here we start the fetching process from the server side,
  // Then we pass the promise to the client side,
  // Then, using the use(promise) hook, we get the data and pass it to the LocationSearch component.
  const locationsPromise = fetchLocations(location); // Initial empty query

  return (
    <VStack space="lg" className={styles.formContainer}>
      <KeywordsField />

      <div className={styles.locationRow}>
        <Suspense fallback={<div>Loading Location Input...</div>}>
          <LocationSearch suggestionsPromise={locationsPromise} />
        </Suspense>
        <DistanceSelect />
      </div>

      <SearchButton />
    </VStack>
  );
}
