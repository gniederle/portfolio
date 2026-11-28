import { expect, test } from '@playwright/test';

test('landmarks only open on explicit interaction and the game stays responsive', async ({ page, browser }, testInfo) => {
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
  const gameControls = page.getByTestId('game-controls');
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
  await expect(page.locator('[data-landmark-id="presentation"][data-nearby="true"]')).toContainText('Enter ou Interagir para abrir');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('game-desktop.png') });

  await scene.focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  const presentationPanel = page.getByRole('dialog', { name: 'Guilherme Niederle' });
  await page.keyboard.press('Enter');
  await expect(presentationPanel).toBeVisible();
  await expect(presentationPanel).toBeFocused();
  await expect(page.getByRole('dialog')).toHaveCount(1);
  const pausedX = await character.getAttribute('data-x');
  const pausedCamera = await world.evaluate((element) => (element as HTMLElement).style.transform);
  await page.waitForTimeout(180);
  await expect(page.getByRole('dialog')).toHaveCount(1);
  await expect(character).toHaveAttribute('data-x', pausedX ?? '');
  expect(await world.evaluate((element) => (element as HTMLElement).style.transform)).toBe(pausedCamera);
  await page.keyboard.press('Escape');
  await expect(presentationPanel).toHaveCount(0);
  await expect(scene).toBeFocused();

  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(1100);
  await page.keyboard.up('ArrowRight');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(Number(await character.getAttribute('data-x'))).toBeGreaterThan(300);

  const expectedCards = [
    { id: 'career', title: 'Trajetória profissional', content: 'SoftExpert' },
    { id: 'skills', title: 'Competências técnicas', content: 'Backend e frameworks' },
    { id: 'contributions', title: 'Trabalhos e contribuições', content: 'SoftExpert' },
    { id: 'education', title: 'Formação acadêmica', content: 'Unochapecó' },
    { id: 'contact', title: 'Contato', content: 'WhatsApp' },
  ];

  for (const card of expectedCards) {
    await scene.focus();
    await page.keyboard.down('ArrowRight');
    await expect(page.locator(`[data-landmark-id="${card.id}"][data-nearby="true"]`)).toBeVisible({ timeout: 7000 });
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.keyboard.up('ArrowRight');
    await page.keyboard.press('Enter');
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
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('WhatsApp');
  await page.getByRole('button', { name: 'Close panel' }).click();

  await page.getByRole('button', { name: 'Institutional mode' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Guilherme Niederle' })).toBeVisible();
  await expect(page.getByTestId('institutional-header')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByTestId('institutional-menu-toggle').click();
  await page.getByRole('button', { name: 'Game mode' }).click();
  await expect(gameHeader).toBeVisible();

  for (const viewport of [
    { width: 2560, height: 1440 },
    { width: 3440, height: 1440 },
    { width: 1366, height: 768 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 844, height: 390 },
    { width: 390, height: 844 },
    { width: 320, height: 740 },
  ]) {
    const playerXBeforeResize = Number(await character.getAttribute('data-x'));
    await page.setViewportSize(viewport);
    await expect(gameHeader).toBeVisible();
    const bounds = await scene.boundingBox();
    const controlsBounds = await gameControls.boundingBox();
    const renderedScale = Number(await world.getAttribute('data-render-scale'));
    const cameraX = Number(await world.getAttribute('data-camera-x'));
    const presentationLabel = await scene.locator('[data-landmark-id="presentation"] > span:first-of-type').boundingBox();
    expect(bounds?.width).toBe(viewport.width);
    expect(bounds?.height).toBeLessThan(viewport.height);
    expect(controlsBounds?.y).toBeGreaterThanOrEqual((bounds?.y ?? 0) + (bounds?.height ?? 0));
    expect((controlsBounds?.y ?? 0) + (controlsBounds?.height ?? 0)).toBeLessThanOrEqual(viewport.height);
    expect(renderedScale).toBeGreaterThanOrEqual(0.28);
    expect(renderedScale).toBeLessThanOrEqual(0.72);
    expect(presentationLabel?.height).toBeGreaterThanOrEqual(9);
    expect(cameraX).toBeGreaterThanOrEqual(0);
    expect(cameraX).toBeLessThanOrEqual(Math.max(0, 4800 - viewport.width / renderedScale));
    expect(Number(await character.getAttribute('data-x'))).toBe(playerXBeforeResize);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);

    if (viewport.width === 390) {
      await page.reload();
      await expect(gameHeader).toBeVisible();
      await expect.poll(async () => Number(await world.getAttribute('data-render-scale'))).toBeGreaterThan(0);
      await page.screenshot({ path: testInfo.outputPath('game-mobile.png') });
      await scene.focus();
      const cameraAtStart = await world.evaluate((element) => (element as HTMLElement).style.transform);
      const initialX = Number(await character.getAttribute('data-x'));
      await page.keyboard.down('ArrowRight');
      await page.waitForTimeout(1500);
      await page.keyboard.up('ArrowRight');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      expect(Number(await character.getAttribute('data-x'))).toBeGreaterThan(initialX + 400);
      expect(await world.evaluate((element) => (element as HTMLElement).style.transform)).not.toBe(cameraAtStart);
      await page.waitForTimeout(500);
      await page.keyboard.press('Space');
      await expect(character).toHaveAttribute('data-state', 'rising');
      await expect.poll(() => character.getAttribute('data-state'), { timeout: 2000 }).toBe('idle');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect(character).toHaveCSS('animation-name', 'none');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
    if (viewport.width === 3440) {
      await page.screenshot({ path: testInfo.outputPath('game-ultrawide.png') });
    }
  }

  const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const touchPage = await touchContext.newPage();
  captureErrors(touchPage);
  await touchPage.goto('/');
  await touchPage.getByRole('button', { name: 'Pular' }).tap();
  await expect(touchPage.getByRole('dialog')).toHaveCount(0);
  await expect(touchPage.getByTestId('game-interact')).toContainText('Interagir');
  await touchPage.getByTestId('game-interact').tap();
  await expect(touchPage.getByRole('dialog', { name: 'Guilherme Niederle' })).toBeVisible();
  await touchPage.getByRole('button', { name: 'Fechar painel' }).tap();
  const touchCdp = await touchContext.newCDPSession(touchPage);
  const rightButton = touchPage.getByRole('button', { name: 'Mover para a direita' });
  const rightBounds = await rightButton.boundingBox();
  await touchCdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: (rightBounds?.x ?? 0) + (rightBounds?.width ?? 0) / 2, y: (rightBounds?.y ?? 0) + (rightBounds?.height ?? 0) / 2 }],
  });
  await touchPage.waitForTimeout(800);
  await expect(touchPage.getByRole('dialog')).toHaveCount(0);
  expect(Number(await touchPage.getByTestId('platformer-player').getAttribute('data-x'))).toBeGreaterThan(250);
  await touchCdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await touchContext.close();

  const landscapeTouchContext = await browser.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
  const landscapeTouchPage = await landscapeTouchContext.newPage();
  captureErrors(landscapeTouchPage);
  await landscapeTouchPage.goto('/');
  const landscapeControls = landscapeTouchPage.getByTestId('game-controls');
  await expect(landscapeControls.getByRole('button', { name: 'Mover para a esquerda' })).toBeVisible();
  await expect(landscapeControls.getByRole('button', { name: 'Mover para a direita' })).toBeVisible();
  await landscapeControls.getByTestId('game-interact').tap();
  await expect(landscapeTouchPage.getByRole('dialog', { name: 'Guilherme Niederle' })).toBeVisible();
  await landscapeTouchPage.getByRole('button', { name: 'Fechar painel' }).tap();
  const landscapeSceneBounds = await landscapeTouchPage.locator('#game-world').boundingBox();
  const landscapeControlBounds = await landscapeControls.boundingBox();
  expect(landscapeControlBounds?.y).toBeGreaterThanOrEqual((landscapeSceneBounds?.y ?? 0) + (landscapeSceneBounds?.height ?? 0));
  await landscapeTouchPage.screenshot({ path: testInfo.outputPath('game-mobile-landscape.png') });
  await landscapeTouchContext.close();

  expect(browserErrors).toEqual([]);
});
