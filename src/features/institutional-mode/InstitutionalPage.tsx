import type { InstitutionalMessages } from '../../i18n/messages';
import type { Language, PortfolioContent } from '../../types/portfolio';
import { ContactFooter } from './components/ContactFooter';
import { PortfolioHeader } from './components/PortfolioHeader';
import { PortfolioSections } from './components/PortfolioSections';
import { PresentationSection } from './components/PresentationSection';
import styles from './InstitutionalPage.module.css';

interface InstitutionalPageProps {
  content: PortfolioContent;
  language: Language;
  messages: InstitutionalMessages;
  onLanguageChange: (language: Language) => void;
}

export function InstitutionalPage({ content, language, messages, onLanguageChange }: InstitutionalPageProps) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">{messages.skipLink}</a>
      <PortfolioHeader
        language={language}
        messages={messages}
        onLanguageChange={onLanguageChange}
      />
      <main className={styles.main} id="main-content" tabIndex={-1}>
        <PresentationSection content={content} language={language} messages={messages} />
        <PortfolioSections content={content} language={language} messages={messages} />
      </main>
      <div className={styles.footerWrap}>
        <ContactFooter content={content} messages={messages} />
      </div>
    </div>
  );
}
