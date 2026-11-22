import { test, expect } from '@playwright/test';

test('guest can add an Audi TT to Garage', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Guest log in' }).click();
  await expect(page).toHaveURL(/\/panel\/garage\/?$/);

  await page.getByRole('button', { name: 'Add car' }).click();

  const addCarDialog = page.getByRole('dialog');
  await addCarDialog.getByRole('combobox', { name: 'Brand' }).selectOption({ label: 'Audi' });
  await addCarDialog.getByRole('combobox', { name: 'Model' }).selectOption({ label: 'TT' });
  await addCarDialog.getByRole('spinbutton', { name: 'Mileage' }).fill('12000');
  await addCarDialog.getByRole('button', { name: 'Add', exact: true }).click();

  await expect(page).toHaveURL(/\/panel\/garage\/?$/);
  await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
  await expect(page.getByText('Audi TT', { exact: true })).toBeVisible();
});
