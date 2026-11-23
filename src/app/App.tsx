import { useEffect, useState } from 'react';
import { portfolioContent } from '../content/portfolio';
import { GameMode } from '../features/game-mode/GameMode';
import { InstitutionalPage } from '../features/institutional-mode/InstitutionalPage';
import { gameMessages } from '../features/game-mode/gameMessages';
import { institutionalMessages } from '../i18n/messages';
import type { Language, PortfolioMode } from '../types/portfolio';

export function App() {
  const [language, setLanguage] = useState<Language>('pt');
  const [mode, setMode] = useState<PortfolioMode>('game');
  const messages = institutionalMessages[language];

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = messages.pageTitle;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = messages.metaDescription;
  }, [language, messages]);

  if (mode === 'institutional') {
    return (
      <InstitutionalPage
        content={portfolioContent}
        language={language}
        messages={messages}
        onLanguageChange={setLanguage}
        onModeChange={setMode}
      />
    );
  }

  return (
    <GameMode
      content={portfolioContent}
      language={language}
      messages={gameMessages[language]}
      sectionLabels={messages.sectionLabels}
      languageNames={messages.languageNames}
      modeLabels={{ game: messages.gameMode, institutional: messages.institutionalMode }}
      onLanguageChange={setLanguage}
      onModeChange={setMode}
    />
  );
}
