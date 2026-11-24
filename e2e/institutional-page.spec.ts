import { expect, test } from '@playwright/test';

test('institutional page supports navigation, language, keyboard, and responsive viewports', async ({ page }, testInfo) => {
  const browserErrors: string[] = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Modo institucional' }).click();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page).toHaveTitle(/Guilherme Niederle/);
  await expect(page.getByRole('heading', { level: 1, name: 'Guilherme Niederle' })).toBeVisible();

  const institutionalHeader = page.getByTestId('institutional-header');
  const menuToggle = page.getByTestId('institutional-menu-toggle');
  const navigation = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(institutionalHeader).toHaveCSS('position', 'sticky');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Pular para o conteúdo principal' });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  await expect(menuToggle).toBeVisible();
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(navigation).toBeHidden();

  const mainTopWhenClosed = await page.locator('#main-content').evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  await menuToggle.click();
  await expect(page.getByRole('button', { name: 'Fechar navegação' })).toHaveAttribute('aria-expanded', 'true');
  await expect(navigation).toBeVisible();
  expect(await page.locator('#main-content').evaluate((element) => element.getBoundingClientRect().top + window.scrollY)).toBe(mainTopWhenClosed);
  for (const label of [
    'Apresentação',
    'Trajetória profissional',
    'Competências técnicas',
    'Formação acadêmica',
    'Contato',
  ]) {
    await expect(navigation.getByRole('link', { name: label })).toBeVisible();
  }
  await expect(navigation.getByRole('link', { name: 'Trabalhos e contribuições' })).toHaveCount(0);
  await expect(institutionalHeader.getByRole('button', { name: 'Modo jogo' })).toBeVisible();
  await expect(page.locator('#contributions')).toHaveCount(0);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('smooth');

  await page.screenshot({ path: testInfo.outputPath('institutional-desktop.png'), fullPage: true });

  await menuToggle.click();
  await menuToggle.focus();
  await page.keyboard.press('Enter');
  await expect(navigation).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(navigation).toBeHidden();
  await expect(menuToggle).toBeFocused();

  await menuToggle.click();
  await page.mouse.click(20, 200);
  await expect(navigation).toBeHidden();

  for (const [label, id] of [
    ['Apresentação', 'presentation'],
    ['Trajetória profissional', 'career'],
    ['Competências técnicas', 'skills'],
    ['Formação acadêmica', 'education'],
    ['Contato', 'contact'],
  ]) {
    await menuToggle.click();
    await expect(navigation).toBeVisible();
    await navigation.getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(navigation).toBeHidden();
  }
  await expect.poll(() => institutionalHeader.evaluate((element) => element.getBoundingClientRect().top)).toBe(0);

  await menuToggle.click();
  await page.getByRole('button', { name: 'Inglês' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(/Software engineer/);
  await expect(page.getByRole('heading', { level: 1, name: 'Guilherme Niederle' })).toBeVisible();
  await expect(page.getByText('choose one of the available channels.')).toBeVisible();
  const englishNavigation = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(englishNavigation).toBeVisible();
  await expect(englishNavigation.getByRole('link', { name: 'Career' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Get in touch' })).toBeVisible();

  const whatsapp = page.getByRole('link', { name: /Phone \+55 49 99810-5000/ });
  await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/5549998105000');
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  for (const contactLink of await page.locator('footer#contact address a').all()) {
    await expect(contactLink).toHaveAttribute('target', '_blank');
    await expect(contactLink).toHaveAttribute('rel', 'noopener noreferrer');
  }

  await page.getByRole('button', { name: 'Portuguese' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await menuToggle.click();

  for (const viewport of [
    { width: 2560, height: 1440 },
    { width: 1366, height: 768 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 844, height: 390 },
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    await page.setViewportSize(viewport);
    await expect(page.getByRole('heading', { level: 1, name: 'Guilherme Niederle' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Abrir navegação' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeHidden();
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(hasHorizontalOverflow, `unexpected horizontal overflow at ${viewport.width}px`).toBe(false);
    await expect(institutionalHeader).toHaveCSS('position', 'sticky');
    if (viewport.width === 390) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await page.screenshot({ path: testInfo.outputPath('institutional-mobile.png') });
    }
  }

  await page.getByRole('button', { name: 'Abrir navegação' }).click();
  await page.getByRole('button', { name: 'Modo jogo' }).click();
  await expect(page.getByTestId('game-header')).toBeVisible();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');

  expect(browserErrors).toEqual([]);
});
