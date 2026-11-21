import { useEffect, useState } from 'react';
import { portfolioContent } from '../content/portfolio';
import { InstitutionalPage } from '../features/institutional-mode/InstitutionalPage';
import { institutionalMessages } from '../i18n/messages';
import type { Language } from '../types/portfolio';

export function App() {
  const [language, setLanguage] = useState<Language>('pt');
  const messages = institutionalMessages[language];

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = messages.pageTitle;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = messages.metaDescription;
  }, [language, messages]);

  return (
    <InstitutionalPage
      content={portfolioContent}
      language={language}
      messages={messages}
      onLanguageChange={setLanguage}
    />
  );
}
