import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    // Selectors
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }
    /**
     * open saucedemo.com website
     */
    public async open(): Promise<void> {
        await this.navigateTo('https://www.saucedemo.com/');
    }

    /**
     * Login into saucedemo.com website
     */
    public async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * getting error message text
     */
    public async getErrorMessageText(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }
}