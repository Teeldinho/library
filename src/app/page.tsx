import styles from "@/app/page.module.css";
import { Button } from "@/components/ui/button/button";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.buttonGroup}>
        <Button variant="primary" size="lg">
          Big Primary
        </Button>
        <Button variant="secondary" size="md">
          Secondary Button
        </Button>
        <Button variant="success" size="sm">
          Success Button
        </Button>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.listItem}>
          <span className="text-muted">List Item 1</span>
        </div>
        <div className={styles.listItem}>List Item 2</div>
        <div className={styles.listItem}>List Item 3</div>
      </div>
    </main>
  );
}
