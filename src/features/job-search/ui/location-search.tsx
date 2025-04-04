"use client";

import { useTranslations } from "next-intl";
import { Autocomplete } from "@/components/ui/auto-complete/auto-complete";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import styles from "@/features/job-search/ui/job-search-form.module.css";
import { VStack, Label } from "@/components/ui";
import { LocationRTO } from "@/features/job-search/models/mappers";
import { Suspense } from "react";

type LocationSearchProps = {
  suggestionsPromise: Promise<LocationRTO[]>;
};

export function LocationSearch({ suggestionsPromise }: LocationSearchProps) {
  const { location, setLocation } = useStoreSearchParams();
  const t = useTranslations("HomePage");

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
    </VStack>
  );
}
