import { expect, test } from '@playwright/test';

test('jumping near a landmark opens its card and game controls remain responsive', async ({ page, browser }, testInfo) => {
  const browserErrors: string[] = [];
  const captureErrors = (target: typeof page) => {
    target.on('pageerror', (error) => browserErrors.push(error.message));
    target.on('console', (message) => {
      if (message.type() === 'error') browserErrors.push(message.text());
    });
  };
  captureErrors(page);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const gameHeader = page.getByTestId('game-header');
  const scene = page.locator('#game-world');
  await expect(page.getByRole('region', { name: 'Cenário horizontal do portfólio' })).toBeVisible();
  const character = page.getByTestId('platformer-player');
  const world = page.locator('[data-platformer-world]');

  await expect(gameHeader).toBeVisible();
  await expect(gameHeader).toHaveCSS('position', 'fixed');
  await expect(gameHeader.getByRole('button')).toHaveCount(3);
  await expect(gameHeader.getByRole('navigation')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Seções' })).toHaveCount(0);
  await expect(scene.locator('[data-landmark-id]')).toHaveCount(6);
  await expect(scene.getByRole('button')).toHaveCount(0);
  await expect(page.getByRole('img', { name: 'Guilherme, personagem do portfólio' })).toBeVisible();
  await expect(page.locator('[data-landmark-id="presentation"][data-nearby="true"]')).toContainText('Salte até o ícone para abrir');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('game-desktop.png') });

  await scene.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.keyboard.down('Space');
  await page.waitForTimeout(80);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  const presentationPanel = page.getByRole('dialog', { name: 'Guilherme Niederle' });
  await expect(presentationPanel).toBeVisible();
  await expect(presentationPanel).toBeFocused();
  await expect(page.getByRole('dialog')).toHaveCount(1);
  const pausedX = await character.getAttribute('data-x');
  const pausedCamera = await world.evaluate((element) => (element as HTMLElement).style.transform);
  await page.waitForTimeout(180);
  await expect(page.getByRole('dialog')).toHaveCount(1);
  await expect(character).toHaveAttribute('data-x', pausedX ?? '');
  expect(await world.evaluate((element) => (element as HTMLElement).style.transform)).toBe(pausedCamera);
  await page.keyboard.up('Space');
  await page.keyboard.press('Escape');
  await expect(presentationPanel).toHaveCount(0);
  await expect(scene).toBeFocused();

  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(1700);
  await page.keyboard.up('ArrowRight');
  await page.waitForTimeout(450);
  await expect(page.locator('[data-nearby="true"]')).toHaveCount(0);
  await page.keyboard.press('Space');
  await page.waitForTimeout(120);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect.poll(() => character.getAttribute('data-state')).toBe('rising');
  await expect.poll(() => character.getAttribute('data-state'), { timeout: 2000 }).toBe('idle');

  const expectedCards = [
    { id: 'career', title: 'Trajetória profissional', content: 'SoftExpert' },
    { id: 'skills', title: 'Competências técnicas', content: 'Backend e frameworks' },
    { id: 'contributions', title: 'Trabalhos e contribuições', content: 'SoftExpert' },
    { id: 'education', title: 'Formação acadêmica', content: 'Unochapecó' },
    { id: 'contact', title: 'Contato', content: 'WhatsApp' },
  ];

  for (const card of expectedCards) {
    await page.keyboard.down('ArrowRight');
    await expect(page.locator(`[data-landmark-id="${card.id}"][data-nearby="true"]`)).toBeVisible({ timeout: 7000 });
    const landmark = page.locator(`[data-landmark-id="${card.id}"]`);
    const landmarkX = Number(await landmark.getAttribute('data-world-x'));
    await expect.poll(async () => {
      const playerX = Number(await character.getAttribute('data-x'));
      return playerX + 28;
    }).toBeGreaterThanOrEqual(landmarkX - 115);
    await page.keyboard.up('ArrowRight');
    await expect.poll(() => character.getAttribute('data-state')).toBe('idle');
    await expect.poll(async () => {
      const playerX = Number(await character.getAttribute('data-x'));
      return Math.abs(playerX + 28 - landmarkX);
    }).toBeLessThan(78);
    await scene.focus();
    await page.keyboard.down('Space');
    const panel = page.getByRole('dialog', { name: card.title });
    await expect(panel).toBeVisible();
    await expect(panel).toContainText(card.content);
    await expect(page.getByRole('dialog')).toHaveCount(1);
    await page.keyboard.up('Space');
    await page.keyboard.press('Escape');
    await expect(panel).toHaveCount(0);
    await expect(scene).toBeFocused();
  }

  await page.getByRole('button', { name: 'Inglês' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect.poll(() => character.getAttribute('data-state'), { timeout: 2000 }).toBe('idle');
  await expect(page.locator('[data-landmark-id="contact"][data-nearby="true"]')).toBeVisible();
  await scene.focus();
  await page.keyboard.down('Space');
  await expect(page.getByRole('dialog', { name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('WhatsApp');
  await page.keyboard.up('Space');
  await page.getByRole('button', { name: 'Close panel' }).click();

  await page.getByRole('button', { name: 'Institutional mode' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Guilherme Niederle' })).toBeVisible();
  await expect(page.getByTestId('institutional-header')).toBeVisible();
  await page.getByRole('button', { name: 'Game mode' }).click();
  await expect(gameHeader).toBeVisible();

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
    await expect(gameHeader).toBeVisible();
    const bounds = await scene.boundingBox();
    expect(bounds?.width).toBe(viewport.width);
    expect(bounds?.height).toBe(viewport.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);

    if (viewport.width === 390) {
      await page.screenshot({ path: testInfo.outputPath('game-mobile.png') });
      const cameraAtStart = await world.evaluate((element) => (element as HTMLElement).style.transform);
      const initialX = Number(await character.getAttribute('data-x'));
      await scene.focus();
      await page.keyboard.down('ArrowRight');
      await page.waitForTimeout(1500);
      expect(Number(await character.getAttribute('data-x'))).toBeGreaterThan(initialX + 400);
      expect(await world.evaluate((element) => (element as HTMLElement).style.transform)).not.toBe(cameraAtStart);
      await page.keyboard.up('ArrowRight');
      await page.waitForTimeout(500);
      await page.keyboard.press('Space');
      await expect(character).toHaveAttribute('data-state', 'rising');
      await expect.poll(() => character.getAttribute('data-state'), { timeout: 2000 }).toBe('idle');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect(character).toHaveCSS('animation-name', 'none');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
  }

  const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const touchPage = await touchContext.newPage();
  captureErrors(touchPage);
  await touchPage.goto('/');
  await touchPage.getByRole('button', { name: 'Pular' }).tap();
  await expect(touchPage.getByRole('dialog', { name: 'Guilherme Niederle' })).toBeVisible();
  await touchPage.getByRole('button', { name: 'Fechar painel' }).tap();
  await expect(touchPage.getByRole('button', { name: 'Pular' })).toBeFocused();
  await touchContext.close();

  expect(browserErrors).toEqual([]);
});
