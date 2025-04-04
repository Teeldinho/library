"use client";

import { Suspense, use } from "react";
import { Autocomplete } from "@/components/ui/auto-complete/auto-complete";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import { useTranslations } from "next-intl";
import styles from "./job-search-form.module.css";
import { VStack, Label } from "@/components/ui";
import { LocationRTO } from "../models/mappers";

type LocationSearchProps = {
  suggestionsPromise: Promise<LocationRTO[]>;
};

export function LocationSearch({ suggestionsPromise }: LocationSearchProps) {
  const { location, setLocation } = useStoreSearchParams();
  const t = useTranslations("HomePage");

  const locationsResults = use(suggestionsPromise);

  console.log("\n\nLocations results from Client = ", locationsResults);

  return (
    <VStack space="xs" className={styles.locationField}>
      <Label htmlFor="location" className={styles.label}>
        {t("locationLabel")}
      </Label>
      <Suspense fallback={<div className={styles.loading}>{t("loadingLocations")}</div>}>
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
