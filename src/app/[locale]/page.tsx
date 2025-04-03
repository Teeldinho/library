import styles from "./page.module.css";
import { VStack, Center, Container } from "@/components/ui";
import { JobSearchForm, LocationTabs } from "@/features/job-search/ui";
import CvLibraryLogo from "../../../public/library-logo.svg";
import Image from "next/image";
import { searchParamsCache } from "@/stores/nuqs/search-params";
import type { SearchParams } from "nuqs/server";
import LanguageSwitcher from "@/features/languages/ui/language-switcher";
import { fetchLocations } from "@/features/job-search/api/queries";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ locale: string }>;
};

export default async function Home({ searchParams, params }: Props) {
  await searchParamsCache.parse(searchParams);
  const { locale } = await params;

  const { filters } = await searchParamsCache.parse(searchParams);

  console.log("\n\nFilters = ", filters);

  const locationsPromise = fetchLocations(filters.location || "");

  return (
    <VStack space="3xl" className={styles.main} align="stretch">
      <div className={styles.top}>
        <VStack space="3xl">
          <Container>
            <Center>
              <VStack space="md">
                <LanguageSwitcher currentLocale={locale} />

                <div className={styles.logoContainer}>
                  <Image src={CvLibraryLogo} alt="CV Library" fill className={styles.logoImage} />
                </div>
              </VStack>
            </Center>
          </Container>

          <Container>
            <Suspense fallback={<div>Loading...</div>}>
              <JobSearchForm initialData={locationsPromise} />
            </Suspense>
          </Container>
        </VStack>
      </div>

      <Center className={styles.tabsContainer}>
        <LocationTabs />
      </Center>
    </VStack>
  );
}
