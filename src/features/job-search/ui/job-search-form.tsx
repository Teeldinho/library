import { VStack, HStack, Label, Input, Button, AutocompleteSelect, Select } from "@/components/ui";
import styles from "@/features/job-search/ui/job-search-form.module.css";
import { DISTANCE_OPTIONS, LOCATION_OPTIONS } from "@/features/job-search/helpers/dummy-data";

export function JobSearchForm() {
  return (
    <VStack space="lg" className={styles.formContainer}>
      <VStack space="xs">
        <Label htmlFor="keywords" className={styles.label}>
          Keywords / Job Title / Job Ref
        </Label>
        <Input id="keywords" placeholder="e.g. Sales Executive" className={styles.input} />
      </VStack>

      <HStack space="md" className={styles.locationRow}>
        <VStack space="xs" className={styles.locationField}>
          <Label htmlFor="location" className={styles.label}>
            Location
          </Label>
          <AutocompleteSelect id="location" inputSize="md" options={LOCATION_OPTIONS} placeholder="Locations" />
        </VStack>

        <VStack space="xs" className={styles.distanceField}>
          <Label htmlFor="distance" className={styles.label}>
            Distance
          </Label>

          <Select variant="default" options={DISTANCE_OPTIONS} placeholder="Select a distance" />
        </VStack>
      </HStack>

      <HStack className={styles.buttonContainer}>
        <Button variant="success" className={styles.searchButton}>
          Find jobs now
        </Button>
      </HStack>
    </VStack>
  );
}
