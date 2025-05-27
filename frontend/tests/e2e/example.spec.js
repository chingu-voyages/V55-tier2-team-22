import { test, expect } from '@playwright/test';

test('Example test: Body is present', async ({ page }) => {
  await expect(page.locator('body')).toBeEnabled();
});