import type { SearchParams } from "nuqs/server";
import CvLibraryLogo from "../../../public/library-logo.svg";
import styles from "@/app/[locale]/page.module.css";
import { VStack, Center, Container } from "@/components/ui";
import { JobSearchForm, LocationTabs } from "@/features/job-search/ui";
import Image from "next/image";
import { searchParamsCache } from "@/stores/nuqs/search-params";
import LanguageSwitcher from "@/features/languages/ui/language-switcher";

type Props = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ locale: string }>;
};

export default async function Home({ searchParams, params }: Props) {
  const { locale } = await params;
  await searchParamsCache.parse(searchParams);

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
