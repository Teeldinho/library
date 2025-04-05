"use client";

import { useTranslations } from "next-intl";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import styles from "@/features/job-search/ui/job-search-form.module.css";
import { VStack, Label } from "@/components/ui";
import { LocationRTO } from "@/features/job-search/models/mappers";
import { FetchResult } from "@/lib/api-helpers";
import { hasMinChars, MIN_AUTOCOMPLETE_CHARS } from "@/lib/validators";
import { AutoComplete } from "@/components/ui/auto-complete/auto-complete/auto-complete";

type LocationSearchProps = {
  suggestionsPromise: Promise<FetchResult<LocationRTO[]>>;
};

export function LocationSearch({ suggestionsPromise }: LocationSearchProps) {
  const { location, setLocation } = useStoreSearchParams();
  const t = useTranslations("HomePage");
  const showHelpText = !hasMinChars(location);

  const staticLocations: LocationRTO[] = [
    { value: "london", label: "London, UK" },
    { value: "new-york", label: "New York, USA" },
  ];

  return (
    <VStack space="xs" className={styles.locationField}>
      <Label htmlFor="location" className={styles.label}>
        {t("locationLabel")}
      </Label>

      <AutoComplete<LocationRTO>
        suggestions={suggestionsPromise}
        onSelect={(item) => setLocation(item.value)}
        inputValue={location || ""}
        onInputChange={(value) => setLocation(value)}
        placeholder={t("locationPlaceholder")}
        itemToString={(item) => item.label}
      />

      {/* <AutoComplete<LocationRTO>
        suggestions={staticLocations}
        onSelect={(item) => setLocation(item.value)}
        inputValue={location || ""}
        onInputChange={(value) => setLocation(value)}
        placeholder={t("locationPlaceholder")}
        itemToString={(item) => item.label}
      /> */}

      {showHelpText && (
        <Label variant="muted" size="sm">
          {t("locationInputHelp", { minChars: MIN_AUTOCOMPLETE_CHARS })}
        </Label>
      )}
    </VStack>
  );
}
