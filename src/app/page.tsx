import styles from "@/app/page.module.css";
import { VStack, Center, Container } from "@/components/ui";
import { JobSearchForm, LocationTabs } from "@/features/job-search/ui";
import cvLibraryLogo from "../../public/library-logo.svg";
import Image from "next/image";

export default function Home() {
  return (
    <VStack space="3xl" className={styles.main}>
      <Container>
        <Center className={styles.logoContainer}>
          <div style={{ position: "relative", width: "350px", height: "133.06px" }}>
            <Image src={cvLibraryLogo} alt="CV Library" fill className={styles.logoImage} />
          </div>
        </Center>
      </Container>

      <Container>
        <JobSearchForm />
      </Container>

      <Center className={styles.tabsContainer}>
        <Container>
          <LocationTabs />
        </Container>
      </Center>
    </VStack>
  );
}
