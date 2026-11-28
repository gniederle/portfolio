import { useEffect, useRef, useState } from 'react';
import type { InstitutionalMessages } from '../../../i18n/messages';
import { institutionalSectionOrder } from '../../../navigation/sections';
import type { Language, PortfolioMode } from '../../../types/portfolio';
import styles from './PortfolioHeader.module.css';

interface PortfolioHeaderProps {
  language: Language;
  messages: InstitutionalMessages;
  onLanguageChange: (language: Language) => void;
  onModeChange: (mode: PortfolioMode) => void;
}

export function PortfolioHeader({ language, messages, onLanguageChange, onModeChange }: PortfolioHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(() => window.matchMedia('(max-width: 64rem)').matches);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 64rem)');
    const updateLayout = () => setIsCompact(mediaQuery.matches);
    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);
    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const closeAfterNavigation = () => setIsOpen(false);
  const navigationExpanded = !isCompact || isOpen;

  return (
    <header className={styles.header} data-testid="institutional-header" ref={headerRef}>
      <div className={styles.topBar}>
        <button
          ref={toggleRef}
          className={styles.menuToggle}
          type="button"
          data-testid="institutional-menu-toggle"
          aria-label={isOpen ? messages.closeNavigation : messages.openNavigation}
          aria-expanded={navigationExpanded}
          aria-controls="institutional-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={`${styles.menuIcon} ${isOpen ? styles.menuIconOpen : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="institutional-navigation"
        className={`${styles.menuPanel} ${navigationExpanded ? styles.menuPanelOpen : ''}`}
        aria-label={messages.navigationLabel}
        aria-hidden={!navigationExpanded}
        inert={!navigationExpanded}
      >
        <ul className={styles.navigationList}>
          {institutionalSectionOrder.map((section) => (
            <li key={section}>
              <a href={`#${section}`} onClick={closeAfterNavigation}>{messages.sectionLabels[section]}</a>
            </li>
          ))}
        </ul>
        <div className={styles.menuActions}>
          <button className={styles.gameModeButton} type="button" onClick={() => onModeChange('game')}>
            {messages.gameMode}
          </button>
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
        </div>
      </nav>
    </header>
  );
}
