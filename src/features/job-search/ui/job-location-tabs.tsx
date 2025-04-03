import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs/tabs";
import { JobListingLinks } from "./job-listing-links";
import styles from "./job-location-tabs.module.css";
import { INDUSTRY_LINKS, LOCATION_LINKS } from "@/features/job-search/helpers/dummy-data";

export function LocationTabs() {
  return (
    <TabsRoot defaultValue="location" className={styles.tabsContainer}>
      <TabsList className={styles.tabsList}>
        <TabsTrigger value="location" className={styles.tabsTrigger}>
          Jobs by Location
        </TabsTrigger>
        <TabsTrigger value="industry" className={styles.tabsTrigger}>
          Jobs by Industry
        </TabsTrigger>
      </TabsList>

      <TabsContent value="location" className={styles.tabsContent}>
        <JobListingLinks links={LOCATION_LINKS} />
      </TabsContent>

      <TabsContent value="industry" className={styles.tabsContent}>
        <JobListingLinks links={INDUSTRY_LINKS} />
      </TabsContent>
    </TabsRoot>
  );
}
