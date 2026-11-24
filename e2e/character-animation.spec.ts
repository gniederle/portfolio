import { expect, test } from '@playwright/test';
import { WORLD } from '../src/features/game-mode/platformerSimulation';
import { getViewportPresentation } from '../src/features/game-mode/viewportPresentation';

test.use({ video: 'on' });

test('approved character states stay aligned and responsive across target viewports', async ({ page }, testInfo) => {
  const browserErrors: string[] = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto('/');
  const scene = page.locator('#game-world');
  const player = page.getByTestId('platformer-player');
  const sprite = player.locator('[aria-hidden="true"]');
  const world = page.locator('[data-platformer-world]');
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet-portrait', width: 768, height: 1024 },
    { name: 'mobile-portrait', width: 390, height: 844 },
    { name: 'mobile-landscape', width: 844, height: 390 },
    { name: 'ultrawide', width: 3440, height: 1440 },
  ];

  for (let index = 0; index < viewports.length; index += 1) {
    const viewport = viewports[index];
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    await expect(scene).toBeVisible();
    await expect(player).toHaveAttribute('data-state', 'idle');
    const sceneBounds = await scene.boundingBox();
    const expectedScale = getViewportPresentation(viewport.width, sceneBounds?.height ?? viewport.height, WORLD).scale;
    await expect.poll(async () => Number(await world.getAttribute('data-render-scale'))).toBeCloseTo(expectedScale, 4);
    const scale = Number(await world.getAttribute('data-render-scale'));
    const bounds = await player.boundingBox();
    expect(bounds?.height).toBeCloseTo(140 * scale, 0);
    await page.screenshot({ path: testInfo.outputPath(`character-${viewport.name}-idle.png`) });

    if (index === 0) {
      await scene.focus();
      await page.keyboard.down('ArrowLeft');
      await expect.poll(() => player.getAttribute('data-state')).toBe('walking');
      expect(await sprite.evaluate((element) => getComputedStyle(element).animationName)).not.toBe('none');
      await expect(player).toHaveCSS('--player-facing', '-1');
      await page.screenshot({ path: testInfo.outputPath('character-walking.png') });
      await page.keyboard.up('ArrowLeft');
      await expect.poll(() => player.getAttribute('data-state')).toBe('idle');

      await page.keyboard.press('Space');
      await expect.poll(() => player.getAttribute('data-state')).toBe('rising');
      const risingFrame = await sprite.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          atlasRowOffset: Number.parseFloat(style.backgroundPositionY),
          visualAnchorOffset: new DOMMatrixReadOnly(style.transform).m42,
        };
      });
      expect(risingFrame.atlasRowOffset).toBeCloseTo(-153.52, 1);
      expect(risingFrame.visualAnchorOffset).toBeCloseTo(23, 1);
      await page.screenshot({ path: testInfo.outputPath('character-rising.png') });
      await expect.poll(() => player.getAttribute('data-state'), { timeout: 2000, intervals: [10, 16, 20] }).toBe('falling');
      await expect.poll(() => player.getAttribute('data-state'), { timeout: 2000, intervals: [10, 16, 20] }).toBe('landing');
      expect(await sprite.evaluate((element) => getComputedStyle(element).animationName)).not.toBe('none');
      await page.screenshot({ path: testInfo.outputPath('character-landing.png') });
      await expect.poll(() => player.getAttribute('data-state'), { timeout: 2000 }).toBe('idle');
      expect(Number(await world.getAttribute('data-camera-x'))).toBeGreaterThanOrEqual(0);
    }
  }

  expect(browserErrors).toEqual([]);
});
