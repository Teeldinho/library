"use client";

import { VStack, Label, Input, Button, AutocompleteSelect, Select } from "@/components/ui";
import styles from "@/features/job-search/ui/job-search-form.module.css";
import { DISTANCE_OPTIONS, LOCATION_OPTIONS } from "@/features/job-search/helpers/dummy-data";
import SearchIcon from "../../../../public/search-icon.svg";
import Image from "next/image";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import { useTranslations } from "next-intl";

export function JobSearchForm() {
  const { keywords, location, distance, setKeywords, setLocation, setDistance } = useStoreSearchParams();

  const t = useTranslations("HomePage");

  return (
    <VStack space="lg" className={styles.formContainer}>
      <VStack space="xs">
        <Label htmlFor="keywords" className={styles.label}>
          {t("jobPlaceholder")}
        </Label>
        <Input
          id="keywords"
          placeholder={t("jobPlaceholder")}
          className={styles.input}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </VStack>

      <div className={styles.locationRow}>
        <VStack space="xs" className={styles.locationField}>
          <Label htmlFor="location" className={styles.label}>
            {t("locationPlaceholder")}
          </Label>
          <AutocompleteSelect
            id="location"
            inputSize="md"
            options={LOCATION_OPTIONS}
            placeholder={t("locationPlaceholder")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </VStack>

        <VStack space="xs" className={styles.distanceField}>
          <Label htmlFor="distance" className={styles.label}>
            {t("distanceLabel")}
          </Label>
          <Select
            variant="default"
            options={DISTANCE_OPTIONS}
            placeholder={t("distanceLabel")}
            value={distance}
            onChange={(e) => setDistance(e.target.value as "5" | "10" | "15" | "20" | "30" | "50")}
          />
        </VStack>
      </div>

      <div className={styles.buttonContainer}>
        <Button variant="success" className={styles.searchButton}>
          {t("searchButton")}
          <div className={styles.searchIconContainer}>
            <Image src={SearchIcon} alt="Search icon" className={styles.searchIcon} />
          </div>
        </Button>
      </div>
    </VStack>
  );
}
