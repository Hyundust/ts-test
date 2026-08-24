import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';

test.describe('UI Login Suite', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

    test('successful login with standard user', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');

        // Checking redirection to the catalog page
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('login failure for locked out user', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');

        const error = await loginPage.getErrorMessageText();
        expect(error).toContain('Sorry, this user has been locked out.');
    });

    test('login failure for user with invalid password', async () => {
        await loginPage.login('standard_user', 'invalid_password');

        const error = await loginPage.getErrorMessageText();
        expect(error).toContain('Username and password do not match');
    });
});