import styles from "@/app/page.module.css";
import { VStack, Center, Container } from "@/components/ui";
import { JobSearchForm, LocationTabs } from "@/features/job-search/ui";
import CvLibraryLogo from "../../public/library-logo.svg";
import Image from "next/image";
import { searchParamsCache } from "@/stores/nuqs/search-params";
import type { SearchParams } from "nuqs/server";

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  await searchParamsCache.parse(searchParams);

  return (
    <VStack space="3xl" className={styles.main}>
      <div className={styles.top}>
        <VStack space="3xl">
          <Container>
            <Center>
              <div className={styles.logoContainer}>
                <Image src={CvLibraryLogo} alt="CV Library" fill className={styles.logoImage} />
              </div>
            </Center>
          </Container>

          <Container>
            <JobSearchForm />
          </Container>
        </VStack>
      </div>

      <Center className={styles.tabsContainer}>
        <LocationTabs />
      </Center>
    </VStack>
  );
}
