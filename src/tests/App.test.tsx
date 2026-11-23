import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App } from '../app/App';
import { portfolioContent } from '../content/portfolio';
import { InstitutionalPage } from '../features/institutional-mode/InstitutionalPage';
import { institutionalMessages } from '../i18n/messages';
import { institutionalSectionOrder } from '../navigation/sections';

describe('portfolio modes', () => {
  it('starts in game mode with direct access to the six sections and institutional mode', () => {
    const markup = renderToStaticMarkup(<App />);

    expect(markup).toContain('Guilherme, personagem do portfólio');
    expect(markup).toContain('Competências técnicas');
    expect(markup).toContain('Trabalhos e contribuições');
    expect(markup).toContain('Modo institucional');
    expect(markup).toContain('data-testid="game-header"');
  });

  it('uses the same professional records for career and contributions', () => {
    expect(portfolioContent.contributions).toBe(portfolioContent.career);
    expect(institutionalSectionOrder).toHaveLength(5);
    expect(portfolioContent.career).toHaveLength(6);
    expect(portfolioContent.skills).toHaveLength(6);
    expect(portfolioContent.education).toHaveLength(2);
  });

  it('renders the institutional content in English using the same page component', () => {
    const markup = renderToStaticMarkup(
      <InstitutionalPage
        content={portfolioContent}
        language="en"
        messages={institutionalMessages.en}
        onLanguageChange={() => undefined}
        onModeChange={() => undefined}
      />,
    );

    expect(markup).toContain('Technical skills');
    expect(markup).not.toContain('Work and contributions');
    expect(markup).toContain('data-testid="institutional-header"');
    expect(markup).not.toContain('id="contributions"');
    expect(markup).toContain('Software engineer');
    expect(markup).toContain('Get in touch');
    expect(markup).toContain('REST APIs');
  });
});
