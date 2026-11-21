import type { InstitutionalMessages } from '../../../i18n/messages';
import { institutionalSectionOrder } from '../../../navigation/sections';
import type { Language } from '../../../types/portfolio';
import styles from './PortfolioHeader.module.css';

interface PortfolioHeaderProps {
  language: Language;
  messages: InstitutionalMessages;
  onLanguageChange: (language: Language) => void;
}

export function PortfolioHeader({ language, messages, onLanguageChange }: PortfolioHeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation} aria-label={messages.navigationLabel}>
        <ul className={styles.navigationList}>
          {institutionalSectionOrder.map((section) => (
            <li key={section}>
              <a href={`#${section}`}>{messages.sectionLabels[section]}</a>
            </li>
          ))}
        </ul>
        <fieldset className={styles.languagePicker}>
          <legend className={styles.visuallyHidden}>{messages.languageLabel}</legend>
          {(['pt', 'en'] as const).map((option) => (
            <button
              className={styles.languageButton}
              type="button"
              key={option}
              aria-label={messages.languageNames[option]}
              aria-pressed={language === option}
              onClick={() => onLanguageChange(option)}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </fieldset>
      </nav>
    </header>
  );
}
