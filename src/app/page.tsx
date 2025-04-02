import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.buttonGroup}>
        <button type="button" className={styles.button}>
          Primary Button
        </button>
        <button type="button" className={`${styles.button} ${styles.secondary}`}>
          Secondary Button
        </button>
        <button type="button" className={`${styles.button} ${styles.success}`}>
          Success Button
        </button>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.listItem}>List Item 1</div>
        <div className={styles.listItem}>List Item 2</div>
        <div className={styles.listItem}>List Item 3</div>
      </div>
    </main>
  );
}
