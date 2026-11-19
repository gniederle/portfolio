import type { InitialScreenCopy } from '../../i18n/messages';
import styles from './InitialScreen.module.css';

interface InitialScreenProps {
  copy: InitialScreenCopy;
}

export function InitialScreen({ copy }: InitialScreenProps) {
  return (
    <main className={styles.screen}>
      <section className={styles.card} aria-labelledby="portfolio-title">
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 id="portfolio-title" className={styles.title}>
          {copy.title}
        </h1>
        <p className={styles.status}>{copy.status}</p>
      </section>
    </main>
  );
}
