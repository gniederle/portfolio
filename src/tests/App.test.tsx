import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App } from '../app/App';
import { portfolioContent } from '../content/portfolio';
import { InstitutionalPage } from '../features/institutional-mode/InstitutionalPage';
import { institutionalMessages } from '../i18n/messages';
import { institutionalSectionOrder } from '../navigation/sections';

describe('institutional portfolio', () => {
  it('renders the visible institutional section destinations and approved professional contact details', () => {
    const markup = renderToStaticMarkup(<App />);

    for (const section of institutionalSectionOrder) {
      expect(markup).toContain(`href="#${section}"`);
      expect(markup).toContain(`id="${section}"`);
    }

    expect(markup).not.toContain('id="contributions"');
    expect(markup).toContain('Guilherme Niederle');
    expect(markup).toContain('Engenheiro de software');
    expect(markup).toContain('guiniederle@gmail.com');
    expect(markup).toContain('+55 49 99810-5000');
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
      />,
    );

    expect(markup).toContain('Technical skills');
    expect(markup).not.toContain('Work and contributions');
    expect(markup).not.toContain('id="contributions"');
    expect(markup).toContain('Software engineer');
    expect(markup).toContain('Get in touch');
    expect(markup).toContain('REST APIs');
  });
});
