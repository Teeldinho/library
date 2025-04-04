"use client";

import { useTranslations } from "next-intl";
import { Autocomplete } from "@/components/ui/auto-complete/auto-complete";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import styles from "@/features/job-search/ui/job-search-form.module.css";
import { VStack, Label } from "@/components/ui";
import { LocationRTO } from "@/features/job-search/models/mappers";
import { Suspense } from "react";
import { FetchResult } from "@/lib/api-helpers";
import { hasMinChars, MIN_AUTOCOMPLETE_CHARS } from "@/lib/validators";

type LocationSearchProps = {
  suggestionsPromise: Promise<FetchResult<LocationRTO[]>>;
};

export function LocationSearch({ suggestionsPromise }: LocationSearchProps) {
  const { location, setLocation } = useStoreSearchParams();
  const t = useTranslations("HomePage");
  const showHelpText = !hasMinChars(location);

  return (
    <VStack space="xs" className={styles.locationField}>
      <Label htmlFor="location" className={styles.label}>
        {t("locationLabel")}
      </Label>
      <Suspense fallback={<div>Loading Location Input...</div>}>
        <Autocomplete
          suggestionsPromise={suggestionsPromise}
          onInputChange={setLocation}
          placeholder={t("locationPlaceholder")}
          listId="location-datalist"
          inputValue={location || ""}
        />
      </Suspense>
      {showHelpText && (
        <Label variant="muted" size="sm">
          {t("locationInputHelp", { minChars: MIN_AUTOCOMPLETE_CHARS })}
        </Label>
      )}
    </VStack>
  );
}
