import type { Language, PortfolioMode } from '../../types/portfolio';
import styles from './GameHeader.module.css';

interface GameHeaderProps {
  language: Language;
  languageLabel: string;
  languageNames: Record<Language, string>;
  institutionalModeLabel: string;
  onLanguageChange: (language: Language) => void;
  onModeChange: (mode: PortfolioMode) => void;
}

export function GameHeader({
  language,
  languageLabel,
  languageNames,
  institutionalModeLabel,
  onLanguageChange,
  onModeChange,
}: GameHeaderProps) {
  return (
    <header className={styles.header} data-testid="game-header">
      <button className={styles.modeButton} type="button" onClick={() => onModeChange('institutional')}>
        <span aria-hidden="true">☷</span>
        {institutionalModeLabel}
      </button>
      <fieldset className={styles.languagePicker}>
        <legend>{languageLabel}</legend>
        {(['pt', 'en'] as const).map((option) => (
          <button
            type="button"
            key={option}
            aria-label={languageNames[option]}
            aria-pressed={language === option}
            onClick={() => onLanguageChange(option)}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </fieldset>
    </header>
  );
}
