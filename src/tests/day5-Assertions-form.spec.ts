import { test, expect } from '@playwright/test';

test.describe('Formy Web Form - Verify input values', () => {
  test('Input fields should contain correct values before submit', async ({ page }) => {
    await page.goto('https://formy-project.herokuapp.com/form');

    const firstName = 'Tham';
    const lastName = 'Nguyen';
    const jobTitle = 'Automation Engineer';

    const firstNameInput = page.locator('#first-name');
    const lastNameInput = page.locator('#last-name');
    const jobTitleInput = page.locator('#job-title');

    await firstNameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await jobTitleInput.fill(jobTitle);

    const collegeRadio = page.locator('#radio-button-2');
    const maleCheckbox = page.locator('#checkbox-1');
    await collegeRadio.check();
    await maleCheckbox.check();

    await expect(firstNameInput).toHaveValue(firstName);
    await expect(lastNameInput).toHaveValue(lastName);
    await expect(jobTitleInput).toHaveValue(jobTitle);

    await expect(collegeRadio).toBeChecked();
    await expect(maleCheckbox).toBeChecked();

    await page.locator('.btn.btn-lg.btn-primary').click();

    const successMessage = page.locator('.alert.alert-success');

    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(
      'The form was successfully submitted!'
    );
  });
});