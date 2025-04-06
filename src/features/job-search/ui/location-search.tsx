"use client";

import { useTranslations } from "next-intl";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import styles from "@/features/job-search/ui/job-search-form.module.css";
import { VStack, Label, HStack } from "@/components/ui";
import { LocationRTO } from "@/features/job-search/models/mappers";
import { FetchResult } from "@/lib/api-helpers";
import { hasMinChars, MIN_AUTOCOMPLETE_CHARS } from "@/lib/validators";
import { AutoComplete } from "@/components/ui/auto-complete/auto-complete";

type LocationSearchProps = {
  suggestionsPromise: Promise<FetchResult<LocationRTO[]>>;
};

export function LocationSearch({ suggestionsPromise }: LocationSearchProps) {
  const { location, setLocation } = useStoreSearchParams();
  const t = useTranslations("HomePage");
  const showHelpText = !hasMinChars(location);

  const staticLocations: LocationRTO[] = [
    { value: "London", label: "London, UK" },
    { value: "New-York", label: "New York, USA" },
  ];

  return (
    <VStack space="xs" className={styles.locationField}>
      <Label htmlFor="location" className={styles.label}>
        {t("locationLabel")}
      </Label>

      <AutoComplete<LocationRTO>
        // suggestions={staticLocations}
        suggestions={suggestionsPromise}
        // onSelect={(item) => setLocation(item.value)}
        onSelect={(item) => setLocation(item.label)}
        inputValue={location || ""}
        onInputChange={(value) => setLocation(value)}
        placeholder={t("locationPlaceholder")}
        itemToString={(item) => item.label}
        renderItem={({ item }) => (
          <HStack space="sm" align="center" className={"w-full"}>
            <Label variant="default" weight="medium">
              {item.label}
            </Label>
            <Label variant="muted" size="sm" weight="normal">
              {item.value}
            </Label>
          </HStack>
        )}
      />

      {showHelpText && (
        <Label variant="muted" size="sm">
          {t("locationInputHelp", { minChars: MIN_AUTOCOMPLETE_CHARS })}
        </Label>
      )}
    </VStack>
  );
}
