import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { App } from '../app/App';

describe('initial application screen', () => {
  it('renders the portfolio title and startup status', () => {
    const markup = renderToStaticMarkup(<App />);

    expect(markup).toContain('Guilherme Niederle');
    expect(markup).toContain('Estrutura inicial da aplicação em funcionamento.');
  });
});
