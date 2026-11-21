import type { InstitutionalMessages } from '../../../i18n/messages';
import type { Language, PortfolioContent } from '../../../types/portfolio';
import styles from './PresentationSection.module.css';

interface PresentationSectionProps {
  content: PortfolioContent;
  language: Language;
  messages: InstitutionalMessages;
}

export function PresentationSection({ content, language, messages }: PresentationSectionProps) {
  return (
    <section className={styles.presentation} id="presentation" aria-labelledby="presentation-title">
      <div className={styles.intro}>
        <p className={styles.kicker}>
          <span className={styles.index} aria-hidden="true">01</span>
          {messages.sectionKickers.presentation}
        </p>
        <h1 className={styles.title} id="presentation-title">
          {content.name}<span aria-hidden="true">.</span>
        </h1>
        <p className={styles.role}>{content.role[language]}</p>
        <p className={styles.summary}>{content.presentation.summary[language]}</p>
      </div>

      <aside className={styles.profileFacts} aria-label={messages.focusLabel}>
        <div className={styles.factLine}>
          <span className={styles.factLabel}>{messages.sinceLabel}</span>
          <time className={styles.factValue} dateTime={content.since}>{content.since}</time>
        </div>
        <div className={styles.factLine}>
          <span className={styles.factLabel}>{messages.locationLabel}</span>
          <span className={styles.factValue}>{content.location}</span>
        </div>
        <div className={styles.focusBlock}>
          <span className={styles.factLabel}>{messages.focusLabel}</span>
          <ul className={styles.focusList}>
            {content.presentation.focusAreas.map((area) => (
              <li key={area[language]}>{area[language]}</li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
