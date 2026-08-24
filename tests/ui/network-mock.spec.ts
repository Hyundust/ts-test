import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';

test.describe('Network Mocking & Error Simulation', () => {

    test(' Simulate a 500 error on the backend when loading images', async ({ page }) => {
        // Intercept all requests for images and return status 500
        await page.route('**/*.jpg', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'text/plain',
                body: 'Internal Server Error',
            });
        });

        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        // The UI should still load and be available for actions
        await expect(page).toHaveURL(/.*inventory.html/);
        const firstProductTitle = page.locator('.inventory_item_name').first();
        await expect(firstProductTitle).toBeVisible();
    });

    test('Blocking analytics or third-party scripts to speed up tests', async ({ page }) => {
        // Abort unnecessary media resources or heavy fonts
        await page.route('**/*.{png,woff,woff2}', (route) => route.abort());

        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/.*inventory.html/);
    });

});