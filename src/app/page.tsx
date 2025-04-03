import { Button, HStack, VStack, Card, Center, Icon, Container, Input, AutocompleteSelect, Label } from "@/components/ui";
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs/tabs";
import styles from "./page.module.css";

export default function Home() {
  return (
    <VStack space="xl" className={styles.main}>
      <TabsRoot defaultValue="jobs">
        <TabsList>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <VStack space="md">
            <h2>Job Listings</h2>
            <HStack space="sm">
              <VStack space="xs">
                <Label htmlFor="search">Search Jobs:</Label>
                <Input id="search" inputSize="sm" placeholder="Search jobs..." />
              </VStack>

              <AutocompleteSelect
                options={[
                  { value: "full-time", label: "Full Time Employment" },
                  { value: "contract", label: "Contract Position" },
                ]}
                variant="primary"
                inputSize="md"
                placeholder="Select job type"
              />
            </HStack>
          </VStack>
        </TabsContent>

        <TabsContent value="companies">
          <h2>Company Directory</h2>
          {/* Content */}
        </TabsContent>
      </TabsRoot>

      <Center>
        <Button variant="primary" size="lg">
          Post Job
        </Button>

        <Card variant={"default"}>
          <HStack>
            <span className="text-muted-dark">Recent Searches</span>
            <span>Recent Searches</span>
          </HStack>
        </Card>
      </Center>

      <Container>
        <Center>
          <Button>Content</Button>
        </Center>
      </Container>
      <Container align="left">
        <Center>
          <Button>Content</Button>
        </Center>
      </Container>
      <Container align="right">
        <Center>
          <Button>Content</Button>
        </Center>
      </Container>
    </VStack>
  );
}
