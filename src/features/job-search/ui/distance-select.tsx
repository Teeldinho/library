"use client";

import { Select, Label, VStack } from "@/components/ui";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import { DISTANCE_OPTIONS } from "@/features/job-search/helpers/dummy-data";
import styles from "@/features/job-search/ui/job-search-form.module.css";
import { useTranslations } from "next-intl";

export function DistanceSelect() {
  const { distance, setDistance } = useStoreSearchParams();
  const t = useTranslations("HomePage");

  return (
    <VStack space="xs" className={styles.distanceField}>
      <Label htmlFor="distance" className={styles.label}>
        {t("distanceLabel")}
      </Label>
      <Select
        variant="default"
        options={DISTANCE_OPTIONS}
        placeholder={t("distancePlaceholder")}
        value={distance}
        onChange={(e) => setDistance(e.target.value as "5" | "10" | "15" | "20" | "30" | "50")}
      />
    </VStack>
  );
}
