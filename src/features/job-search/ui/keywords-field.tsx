"use client";

import { Input, Label, VStack } from "@/components/ui";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import { useTranslations } from "next-intl";
import styles from "@/features/job-search/ui/job-search-form.module.css";

export function KeywordsField() {
  const { keywords, setKeywords } = useStoreSearchParams();
  const t = useTranslations("HomePage");

  return (
    <VStack space="xs">
      <Label htmlFor="keywords" className={styles.label}>
        {t("jobLabel")}
      </Label>
      <Input
        id="keywords"
        placeholder={t("jobPlaceholder")}
        className={styles.input}
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
    </VStack>
  );
}
