"use client";

import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs/tabs";
import { JobListingLinks } from "./job-listing-links";
import styles from "./job-location-tabs.module.css";
import { INDUSTRY_LINKS, LOCATION_LINKS } from "@/features/job-search/helpers/dummy-data";
import { Container } from "@/components/ui";
import { useStoreSearchParams } from "@/stores/nuqs/use-store-search-params";
import { useTranslations } from "next-intl";

export function LocationTabs() {
  const { tab, setTab } = useStoreSearchParams();
  const t = useTranslations("HomePage");
  return (
    <TabsRoot value={tab} defaultValue={tab} className={styles.tabsContainer} onValueChange={(tab) => setTab(tab as "location" | "industry")}>
      <Container>
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="location" className={styles.tabsTrigger}>
            {t("jobsByLocation")}
          </TabsTrigger>
          <TabsTrigger value="industry" className={styles.tabsTrigger}>
            {t("jobsByIndustry")}
          </TabsTrigger>
        </TabsList>
      </Container>

      <TabsContent value="location" className={styles.tabsContent}>
        <Container>
          <JobListingLinks links={LOCATION_LINKS} />
        </Container>
      </TabsContent>

      <TabsContent value="industry" className={styles.tabsContent}>
        <Container>
          <JobListingLinks links={INDUSTRY_LINKS} />
        </Container>
      </TabsContent>
    </TabsRoot>
  );
}
