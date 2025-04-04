"use client";

import { Button } from "@/components/ui";
import SearchIcon from "../../../../public/search-icon.svg";
import Image from "next/image";
import styles from "./job-search-form.module.css";
import { useTranslations } from "next-intl";

export function SearchButton() {
  const t = useTranslations("HomePage");

  return (
    <div className={styles.buttonContainer}>
      <Button variant="success" className={styles.searchButton}>
        {t("searchButton")}
        <div className={styles.searchIconContainer}>
          <Image src={SearchIcon} alt="Search icon" className={styles.searchIcon} />
        </div>
      </Button>
    </div>
  );
}
