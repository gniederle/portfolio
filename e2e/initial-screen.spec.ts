import { expect, test } from '@playwright/test';

test('shows the initial screen without browser errors on desktop and mobile', async ({ page }) => {
  const browserErrors: string[] = [];
  page.on('pageerror', (error) => browserErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Guilherme Niederle' })).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('heading', { name: 'Guilherme Niederle' })).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
  expect(browserErrors).toEqual([]);
});
