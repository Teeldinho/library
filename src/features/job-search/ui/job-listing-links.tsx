import styles from "./job-listing-links.module.css";

interface JobListingLinksProps {
  links: string[];
}

export function JobListingLinks({ links }: JobListingLinksProps) {
  return (
    <div className={styles.linksContainer}>
      {links.map((link, index) => (
        <div key={index} className={styles.linkItem}>
          <a href="#" className={styles.link}>
            {link}
          </a>
        </div>
      ))}
    </div>
  );
}
